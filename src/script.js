let greetingData = {};

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        greetingData = data.greetings;  // This matches our D1 response structure
        console.log('Loaded greeting data:', greetingData);
    })
    .catch(error => console.error('Error loading Greeting data:', error));

function changeMessage() {
    const greetings = Object.keys(greetingData);
    if (greetings.length === 0) {
        console.error('No greetings loaded yet');
        return;
    }
    
    const greeting = document.getElementById('greeting');
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    greeting.textContent = randomGreeting;

    if (greetingData[randomGreeting]) {
        displayCountries(greetingData[randomGreeting]);
    } else {
        console.warn('No country data found for:', randomGreeting);
    }
}
