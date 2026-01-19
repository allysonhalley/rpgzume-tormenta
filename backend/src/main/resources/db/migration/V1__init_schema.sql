-- Users Table
CREATE TABLE public.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    auth_provider VARCHAR(255),
    google_id VARCHAR(255)
);

-- Player Class Table (Concrete Table for PlayerClass entity)
CREATE TABLE public.player_class (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    resume TEXT,
    description TEXT,
    book TEXT,
    page INTEGER,
    type TEXT,
    trait_class TEXT
);

-- Racial Traits Table (Concrete Table for RacialTraits entity)
CREATE TABLE public.racial_traits (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    resume TEXT,
    description TEXT,
    book TEXT,
    page INTEGER,
    type TEXT,
    traits TEXT
);

-- Feature Table (Concrete Table for Feature entity)
CREATE TABLE public.feature (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    resume TEXT,
    description TEXT,
    book TEXT,
    page INTEGER,
    type TEXT,
    prerequisites TEXT,
    benefit TEXT,
    normal TEXT,
    feature_type TEXT,
    special TEXT
);

-- Magic Table (Concrete Table for Magic entity)
CREATE TABLE public.magic (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    resume TEXT,
    description TEXT,
    book TEXT,
    page INTEGER,
    type TEXT,
    magic_type TEXT,
    level TEXT,
    components TEXT,
    cast_time TEXT,
    range TEXT,
    target_area TEXT,
    duration TEXT,
    saving_throw TEXT,
    spell_resistance TEXT,
    school TEXT,
    effect TEXT
);

-- Class Abilities Table
-- Linked to player_class instead of generic card
CREATE TABLE public.class_abilities (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    player_class_id TEXT NOT NULL,
    name TEXT,
    resume TEXT,
    description TEXT,
    book TEXT,
    page INTEGER,
    type TEXT,
    CONSTRAINT fk_class_abilities_player_class FOREIGN KEY (player_class_id) REFERENCES public.player_class(id)
);

-- Characters Table
CREATE TABLE public.characters (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    race_card_id TEXT NOT NULL,
    principal_class_id TEXT NOT NULL,
    CONSTRAINT fk_characters_user FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT fk_characters_race FOREIGN KEY (race_card_id) REFERENCES public.racial_traits(id),
    CONSTRAINT fk_characters_principal_class FOREIGN KEY (principal_class_id) REFERENCES public.player_class(id)
);

-- Character Join Tables

-- Additional Classes (Multiclassing)
CREATE TABLE public.character_additional_classes (
    character_id TEXT NOT NULL,
    player_class_id TEXT NOT NULL,
    CONSTRAINT fk_cac_character FOREIGN KEY (character_id) REFERENCES public.characters(id),
    CONSTRAINT fk_cac_player_class FOREIGN KEY (player_class_id) REFERENCES public.player_class(id)
);

-- Character Features
CREATE TABLE public.character_features (
    character_id TEXT NOT NULL,
    feature_id TEXT NOT NULL,
    CONSTRAINT fk_cf_character FOREIGN KEY (character_id) REFERENCES public.characters(id),
    CONSTRAINT fk_cf_feature FOREIGN KEY (feature_id) REFERENCES public.feature(id)
);

-- Character Magics
CREATE TABLE public.character_magics (
    character_id TEXT NOT NULL,
    magic_id TEXT NOT NULL,
    CONSTRAINT fk_cm_character FOREIGN KEY (character_id) REFERENCES public.characters(id),
    CONSTRAINT fk_cm_magic FOREIGN KEY (magic_id) REFERENCES public.magic(id)
);
