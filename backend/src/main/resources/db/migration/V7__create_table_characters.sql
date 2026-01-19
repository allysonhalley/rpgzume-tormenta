
CREATE TABLE public.characters (
    id TEXT DEFAULT gen_random_uuid()::text NOT NULL,
    user_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    race_card_id TEXT NOT NULL,
    class_card_id TEXT NOT NULL,
    CONSTRAINT characters_pkey PRIMARY KEY (id),
    CONSTRAINT fk_characters_user FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT fk_characters_race FOREIGN KEY (race_card_id) REFERENCES public.card(id),
    CONSTRAINT fk_characters_class FOREIGN KEY (class_card_id) REFERENCES public.card(id)
);

CREATE TABLE public.character_features (
    character_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    CONSTRAINT fk_cf_character FOREIGN KEY (character_id) REFERENCES public.characters(id),
    CONSTRAINT fk_cf_card FOREIGN KEY (card_id) REFERENCES public.card(id)
);

CREATE TABLE public.character_magics (
    character_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    CONSTRAINT fk_cm_character FOREIGN KEY (character_id) REFERENCES public.characters(id),
    CONSTRAINT fk_cm_card FOREIGN KEY (card_id) REFERENCES public.card(id)
);
