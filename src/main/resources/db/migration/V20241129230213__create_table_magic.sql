-- Criação da tabela feature com relacionamento 1x1 com card
CREATE TABLE IF NOT EXISTS magic (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, -- ID único para feature
    card_id TEXT NOT NULL, -- Relacionamento 1x1 com card
    type VARCHAR(255),
    school VARCHAR(255),
    level VARCHAR(255),
    components VARCHAR(255),
    cast_time VARCHAR(255),
    range VARCHAR(255),
    target_area VARCHAR(255),
    duration VARCHAR(255),
    saving_throw VARCHAR(255),
    spell_resistance VARCHAR(255),
    effect TEXT,

    CONSTRAINT fk_card FOREIGN KEY (card_id) REFERENCES card(id)
);