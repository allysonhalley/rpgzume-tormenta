CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS card (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    resume VARCHAR(255) NOT NULL,
    description TEXT,
    book VARCHAR(255),
    page INT
);
