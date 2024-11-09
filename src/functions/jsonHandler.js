export async function handleJsonDisplay(data) {
    return new Response(JSON.stringify(data, null, 2), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function getJsonData() {
    return {
        "greetings": {
            "Hello World!": [
                { "country": 1, "name": "USA" },
                { "country": 2, "name": "Philippines" },
                { "country": 3, "name": "UK" }
            ],
            "¡Hola Mundo!": [
                { "country": 1, "name": "Spain" },
                { "country": 2, "name": "Mexico" },
                { "country": 3, "name": "Argentina" }
            ],
            "Bonjour le Monde!": [
                { "country": 1, "name": "France" },
                { "country": 2, "name": "Canada" },
                { "country": 3, "name": "Belgium" }
            ],
            "Hallo Welt!": [
                { "country": 1, "name": "Germany" },
                { "country": 2, "name": "Austria" },
                { "country": 3, "name": "Switzerland" }
            ],
            "你好，世界！": [
                { "country": 1, "name": "China" },
                { "country": 2, "name": "Taiwan" },
                { "country": 3, "name": "Singapore" }
            ],
            "こんにちは世界！": [
                { "country": 1, "name": "Japan" }
            ]
        },
        "metadata": {
            "version": "1.0",
            "lastUpdated": new Date().toISOString()
        }
    };
} 