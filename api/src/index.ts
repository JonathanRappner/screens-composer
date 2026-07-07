import { serve } from "bun"
import "dotenv/config"
import mariadb from "mariadb"

const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
    connectionLimit: 5
})

serve({
	port: 3000,

	async fetch(req) {
		const origin = req.headers.get("origin") || "*"

		// Handle preflight request
		if (req.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": origin,
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type",
				},
			})
		}

		// get data from db
		let totalScreens: number = 0
		try {
			const conn = await pool.getConnection()
			const rows = await conn.query("SELECT COUNT(*) AS count FROM screens")
			totalScreens = rows[0].count
			conn.end()
		} catch(err) {
			console.error("Error connecting to the database:", err)
		}

		const responseString = `Hello from the API! Total screens: ${totalScreens}`
		console.log(responseString)
		return new Response(responseString, {
			headers: {
				"Access-Control-Allow-Origin": origin,
			},
		})
	},
})

console.log("Listening on port 3000")