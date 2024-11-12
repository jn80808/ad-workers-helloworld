export async function handleJsonDisplay(data) {
    return new Response(JSON.stringify(data, null, 2), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export async function getJsonData(env) {
    try {
        // Fetch all greetings and their associated countries
        const results = await env.DB.prepare(`
            SELECT 
                g.greeting_text,
                g.id as greeting_id,
                c.country_name,
                c.country_order
            FROM greetings g
            LEFT JOIN countries c ON g.id = c.greeting_id
            ORDER BY g.id, c.country_order
        `).all();

        // Transform the flat results into nested structure
        const greetings = {};
        results.results.forEach(row => {
            if (!greetings[row.greeting_text]) {
                greetings[row.greeting_text] = [];
            }
            if (row.country_name) {
                greetings[row.greeting_text].push({
                    country: row.country_order,
                    name: row.country_name
                });
            }
        });

        return {
            greetings,
            metadata: {
                version: "1.0",
                lastUpdated: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
} 