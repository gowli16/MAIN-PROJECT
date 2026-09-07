const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json({
            message: "Server and database are working",
            time: result.rows[0].now
        });

    } catch (error) {

        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

//from this part we get the users like the registered ones from the DB

app.get("/users", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT * FROM users"
        );

        res.json(result.rows);

    } catch (error) {

        console.error("Error getting users:", error);

        res.status(500).json({
            message: "Failed to get users"
        });
    }
});


// this part authenticates the login and checks if the user exists and shi

app.post("/login", async (req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE username = $1
            AND password = $2
            `,
            [username, password]
        );

        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// this part gets the medicines from the db and sends em to the frontend

app.get("/medicines", async (req, res) => {
    try {

        const search = req.query.search || "";

        const searchPattern = "%" + search + "%";

        const result = await pool.query(
            `
            SELECT
                medicines.id,
                medicines.medicine,
                medicines.brand,
                medicines.category,
                medicines.price,
                medicines.stock,
                medicines.pharmacy_id,
                medicines.image,

                pharmacies.name AS pharmacy,
                pharmacies.address,
                pharmacies.phone,
                pharmacies.distance,
                pharmacies.timing,
                pharmacies.delivery

            FROM medicines

            JOIN pharmacies
            ON medicines.pharmacy_id = pharmacies.id

            WHERE
                LOWER(medicines.medicine) LIKE LOWER($1)
                OR LOWER(medicines.brand) LIKE LOWER($1)
                OR LOWER(medicines.category) LIKE LOWER($1)

            ORDER BY medicines.id
            `,
            [searchPattern]
        );

        res.json(result.rows);

    } catch (error) {

        console.error("Error getting medicines:", error);

        res.status(500).json({
            message: "Failed to get medicines"
        });
    }
});

// this is for getting medicines of a specific pharmacy  

app.get("/pharmacy/:pharmacy_id/medicines", async (req, res) => {

    try {

        const pharmacy_id = req.params.pharmacy_id;


        const result = await pool.query(
            `
            SELECT
                id,
                medicine,
                brand,
                category,
                price,
                stock,
                pharmacy_id,
                image

            FROM medicines

            WHERE pharmacy_id = $1

            ORDER BY id
            `,
            [pharmacy_id]
        );


        res.json(result.rows);


    } catch (error) {

        console.error(
            "Error getting pharmacy medicines:",
            error
        );


        res.status(500).json({
            message: "Failed to get pharmacy medicines"
        });

    }

});

// here we select all of the pharmacies that i have in my db

app.get("/pharmacies", async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT *
            FROM pharmacies
            ORDER BY id
            `
        );

        res.json(result.rows);

    } catch (error) {

        console.error("Error getting pharmacies:", error);

        res.status(500).json({
            message: "Failed to get pharmacies"
        });
    }
});


// here we check the order and cart details

app.post("/orders", async (req, res) => {

    const client = await pool.connect();

    try {

        const user_id = req.body.user_id;
        const customer_name = req.body.customer_name;
        const customer_phone = req.body.customer_phone;
        const total = req.body.total;
        const items = req.body.items;


        // checks if the current cart is empty or not

        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Cart is empty"
            });
        }


        // this part marks the start of the transaction  

        await client.query("BEGIN");

        // this part checks the stock if its available or not 

        for (let i = 0; i < items.length; i++) {

            const item = items[i];

            const result = await client.query(
                `
                SELECT stock
                FROM medicines
                WHERE id = $1
                FOR UPDATE
                `,
                [item.id]
            );


            // if there is no medicine available an exception is thrown 

            if (result.rows.length === 0) {

                throw new Error(
                    "Medicine with ID " +
                    item.id +
                    " not found"
                );
            }


            const stock = result.rows[0].stock;


            // the stock is low and we should re stock

            if (stock < item.quantity) {

                throw new Error(
                    "Not enough stock for medicine ID " +
                    item.id
                );
            }
        }


        // creates an order from the user's side.

        const orderResult = await client.query(
            `
            INSERT INTO orders
            (
                user_id,
                customer_name,
                customer_phone,
                total
            )

            VALUES
            ($1, $2, $3, $4)

            RETURNING *
            `,
            [
                user_id,
                customer_name,
                customer_phone,
                total
            ]
        );


        const order = orderResult.rows[0];


        // we add the items to the order and reduce the stock of the medicines

        for (let i = 0; i < items.length; i++) {

            const item = items[i];


            await client.query(
                `
                INSERT INTO order_items
                (
                    order_id,
                    medicine_id,
                    quantity
                )

                VALUES
                ($1, $2, $3)
                `,
                [
                    order.id,
                    item.id,
                    item.quantity
                ]
            );


            // this part specifically reduces the desired stock

            await client.query(
                `
                UPDATE medicines

                SET stock = stock - $1

                WHERE id = $2
                `,
                [
                    item.quantity,
                    item.id
                ]
            );
        }


        // sends a success message to the frontend if the order is placed successfully

        await client.query("COMMIT");


        res.status(201).json({
            message: "Order placed successfully",
            order: order
        });


    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Error placing order:",
            error
        );

        res.status(500).json({
            message:
                error.message ||
                "Failed to place order"
        });

    } finally {

        client.release();
    }
});

// for the pharmacies to upload their medicines in bulk

app.post("/upload-medicines", async (req, res) => {

    const client = await pool.connect();

    try {

        const medicines = req.body.medicines;
        const pharmacy_id = req.body.pharmacy_id;


        // checks if the pharmacy id is present or not

        if (!pharmacy_id) {

            return res.status(400).json({
                message: "Pharmacy ID is required"
            });
        }


        // checks if the medicines are present or not 

        if (!medicines || medicines.length === 0) {

            return res.status(400).json({
                message: "No medicines found"
            });
        }


        // Start transaction

        await client.query("BEGIN");


        // pharmacy people add medicines in bulk and this part of the code inserts them into the DB

        for (let i = 0; i < medicines.length; i++) {

            const medicine = medicines[i];

            await client.query(
                `
                INSERT INTO medicines
                (
                    medicine,
                    brand,
                    category,
                    price,
                    stock,
                    pharmacy_id,
                    image
                )

                VALUES
                ($1, $2, $3, $4, $5, $6, $7)
                `,
                [
                    medicine.medicine,
                    medicine.brand,
                    medicine.category,
                    medicine.price,
                    medicine.stock,
                    pharmacy_id,
                    medicine.image
                ]
            );
        }

        await client.query("COMMIT");


        res.status(201).json({
            message: "Medicines uploaded successfully",
            count: medicines.length
        });


    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Error uploading medicines:",
            error
        );

        res.status(500).json({
            message: "Failed to upload medicines"
        });

    } finally {

        client.release();
    }
});
// starts the main server

// Get medicines belonging to a specific pharmacy by pharmacy ID
app.get("/pharmacy/:id/medicines", async (req, res) => {
    const pharmacyId = req.params.id;

    try {
        const result = await pool.query(
            `SELECT
                id,
                medicine,
                brand,
                category,
                price,
                stock,
                image
             FROM medicines
             WHERE pharmacy_id = $1
             ORDER BY id`,
            [pharmacyId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error getting pharmacy medicines:", error);

        res.status(500).json({
            message: "Error getting medicines"
        });
    }
});

app.listen(PORT, () => {

    console.log(
        "Server running on port " + PORT
    );

});