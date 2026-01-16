-- Criação da tabela feature com relacionamento 1x1 com card
CREATE TABLE IF NOT EXISTS feature (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, -- ID único para feature
    card_id TEXT NOT NULL, -- Relacionamento 1x1 com card
    feature_type VARCHAR(255),
    prerequisites VARCHAR(255), -- Pré-requisitos
    benefit TEXT, -- Benefícios
    normal TEXT, -- Descrição normal
    special TEXT, -- Descrição especial

    -- Constraint de chave estrangeira com exclusão em cascata
    CONSTRAINT fk_feature_card FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE CASCADE
);
