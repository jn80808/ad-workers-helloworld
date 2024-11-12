DROP TABLE IF EXISTS greetings;
DROP TABLE IF EXISTS countries;

CREATE TABLE greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    greeting_text TEXT NOT NULL,
    language_name TEXT NOT NULL
);

CREATE TABLE countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    greeting_id INTEGER,
    country_order INTEGER,
    country_name TEXT NOT NULL,
    FOREIGN KEY (greeting_id) REFERENCES greetings(id)
);

-- Insert initial data
INSERT INTO greetings (greeting_text, language_name) VALUES
    ('Hello World!', 'English'),
    ('¡Hola Mundo!', 'Spanish'),
    ('Bonjour le Monde!', 'French'),
    ('Hallo Welt!', 'German'),
    ('你好，世界！', 'Chinese'),
    ('こんにちは世界！', 'Japanese');

-- Insert countries
INSERT INTO countries (greeting_id, country_order, country_name) VALUES
    (1, 1, 'USA'), (1, 2, 'Philippines'), (1, 3, 'UK'),
    (2, 1, 'Spain'), (2, 2, 'Mexico'), (2, 3, 'Argentina'),
    (3, 1, 'France'), (3, 2, 'Canada'), (3, 3, 'Belgium'),
    (4, 1, 'Germany'), (4, 2, 'Austria'), (4, 3, 'Switzerland'),
    (5, 1, 'China'), (5, 2, 'Taiwan'), (5, 3, 'Singapore'),
    (6, 1, 'Japan');