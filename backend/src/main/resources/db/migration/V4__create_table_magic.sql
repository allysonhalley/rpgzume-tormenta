-- Criação da tabela magic com relacionamento 1x1 com card
CREATE TABLE IF NOT EXISTS magic (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, -- ID único para feature
    card_id TEXT NOT NULL, -- Relacionamento 1x1 com card
    type TEXT,
    school TEXT,
    level TEXT,
    components TEXT,
    cast_time TEXT,
    range TEXT,
    target_area TEXT,
    duration TEXT,
    saving_throw TEXT,
    spell_resistance TEXT,
    effect TEXT,

    CONSTRAINT fk_card FOREIGN KEY (card_id) REFERENCES card(id)
);
