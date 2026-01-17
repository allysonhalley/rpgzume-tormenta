CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS card (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type TEXT,
    name TEXT NOT NULL,
    resume TEXT NOT NULL,
    description TEXT,
    book TEXT,
    page INT
);
