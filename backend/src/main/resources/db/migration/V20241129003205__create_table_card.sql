CREATE TABLE IF NOT EXISTS card (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    type VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    resume VARCHAR(255) NOT NULL,
    description TEXT,
    book VARCHAR(255),
    page INT
);
