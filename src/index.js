/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const path = url.pathname;

		const contentTypes = {
			'html': 'text/html',
			'css': 'text/css',
			'js': 'application/javascript',
			'json': 'application/json'
		};

		const staticContent = {
			'/': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World - Cloudflare</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 id="greeting">Hello World!</h1>
        <button onclick="changeMessage()">Click me!</button>
        <h5>Countries Where This Greeting Is Used:</h5>
    </div>
    <script src="script.js"></script>
</body>
</html>`,

			'/styles.css': `body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    text-align: center;
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #f6821f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #e67e22;
}

#data-container {
    margin-top: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
}

#data-container ul {
    list-style-type: none;
    padding: 0;
}

#data-container li {
    padding: 8px;
    margin: 5px 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 3px;
}

.countries-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
}

.countries-list li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}`,

			'/script.js': `let greetingData = {};

fetch('greetings.json')
    .then(response => response.json())
    .then(data => {
        greetingData = data;
    })
    .catch(error => console.error('Error loading GreatingJSON:', error));

function changeMessage() {
    const greetings = Object.keys(greetingData);
    const greeting = document.getElementById('greeting');
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    greeting.textContent = randomGreeting;

    if (greetingData[randomGreeting]) {
        displayCountries(greetingData[randomGreeting]);
    } else {
        console.warn('No country data found for:', randomGreeting);
    }
}

function displayCountries(countries) {
    if (!Array.isArray(countries)) {
        console.error('Expected array of countries, got:', countries);
        return;
    }
    
    const countriesList = document.getElementById('countries-list') || createCountriesList();
    countriesList.innerHTML = '';
    
    countries.forEach(country => {
        const li = document.createElement('li');
        li.textContent = country.name;
        countriesList.appendChild(li);
    });
}

function createCountriesList() {
    const ul = document.createElement('ul');
    ul.id = 'countries-list';
    ul.classList.add('countries-list');

    const container = document.querySelector('.container');
    container.appendChild(ul);

    return ul;
}`,

			'/greetings.json': JSON.stringify({
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
			})
		};

		const ext = path === '/' ? 'html' : path.split('.').pop();
		const content = staticContent[path];
		const contentType = contentTypes[ext];

		if (content) {
			return new Response(content, {
				headers: {
					'Content-Type': contentType,
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		return new Response('Not Found', { status: 404 });
	},
};
