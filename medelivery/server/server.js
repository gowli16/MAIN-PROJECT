const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ================================
// TEST DATABASE CONNECTION
// ================================

app.get("/", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json(result.rows[0]);

    } catch (err) {

        console.error("Error in /:", err);

        res.status(500).json({
            message: "Database error"
        });

    }

});


// ================================
// GET ALL USERS
// ================================

app.get("/users", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM users"
        );

        res.json(result.rows);

    } catch (err) {

        console.error("Error in /users:", err);

        res.status(500).json({
            message: "Database error"
        });

    }

});


// ================================
// LOGIN
// ================================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;


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


        if (result.rows.length > 0) {

            return res.json(result.rows[0]);

        }


        return res.status(401).json({
            message: "Invalid username or password"
        });

    } catch (err) {

        console.error("Error in /login:", err);

        return res.status(500).json({
            message: "Database error"
        });

    }

});


// ================================
// GET MEDICINES
// ================================

app.get("/medicines", async (req, res) => {

    try {

        const search = (req.query.search || "").trim();

        const pattern = `${search}%`;


        const result = await pool.query(

            `
            SELECT
                medicines.*,
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
            `,

            [pattern]

        );


        res.json(result.rows);

    } catch (err) {

        console.error("Error in /medicines:", err);

        res.status(500).json({
            message: "Database error"
        });

    }

});


// ================================
// PLACE ORDER
// ================================

app.post("/orders", async (req, res) => {

    const client = await pool.connect();

    try {

        const {
            user_id,
            customer_name,
            customer_phone,
            total,
            items
        } = req.body;


        // Check if cart is empty

        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Cart is empty"
            });

        }


        // Start transaction

        await client.query("BEGIN");


        // ================================
        // CHECK STOCK
        // ================================

        for (const item of items) {

            const result = await client.query(

                `
                SELECT stock
                FROM medicines
                WHERE id = $1
                FOR UPDATE
                `,

                [item.id]

            );


            // Check whether medicine exists

            if (result.rows.length === 0) {

                throw new Error(
                    `Medicine with ID ${item.id} not found`
                );

            }


            const stock = result.rows[0].stock;


            // Check whether enough stock exists

            if (stock < item.quantity) {

                throw new Error(
                    `Not enough stock for medicine ID ${item.id}`
                );

            }

        }


        // ================================
        // CREATE ORDER
        // ================================

        const orderResult = await client.query(

            `
            INSERT INTO orders
            (
                user_id,
                customer_name,
                customer_phone,
                total
            )

            VALUES ($1, $2, $3, $4)

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


        // ================================
        // ADD ORDER ITEMS
        // ================================

        for (const item of items) {

            await client.query(

                `
                INSERT INTO order_items
                (
                    order_id,
                    medicine_id,
                    quantity
                )

                VALUES ($1, $2, $3)
                `,

                [
                    order.id,
                    item.id,
                    item.quantity
                ]

            );


            // ================================
            // REDUCE STOCK
            // ================================

            const stockUpdate = await client.query(

                `
                UPDATE medicines

                SET stock = stock - $1

                WHERE id = $2

                RETURNING id, medicine, stock
                `,

                [
                    item.quantity,
                    item.id
                ]

            );


            // Show the updated stock in terminal

            console.log(
                "STOCK UPDATE:",
                stockUpdate.rows
            );


            // Make sure the stock was actually updated

            if (stockUpdate.rows.length === 0) {

                throw new Error(
                    `Stock update failed for medicine ID ${item.id}`
                );

            }

        }


        // ================================
        // COMPLETE TRANSACTION
        // ================================

        await client.query("COMMIT");


        // ================================
        // SEND RESPONSE
        // ================================

        res.status(201).json({

            message: "Order placed successfully",

            order: order

        });


    } catch (err) {

        // Undo all database changes if
        // something goes wrong

        await client.query("ROLLBACK");


        console.error(
            "Error in /orders:",
            err
        );


        res.status(500).json({

            message:
                err.message ||
                "Failed to place order"

        });

    } finally {

        // Release database connection

        client.release();

    }

});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});