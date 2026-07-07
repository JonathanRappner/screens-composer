import { serve } from "bun"

serve({
	port: 3000,

	fetch(req) {
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

		return new Response("Hello from Bun!", {
			headers: {
				"Access-Control-Allow-Origin": origin,
			},
		})
	},
})

console.log("Listening on port 3000")