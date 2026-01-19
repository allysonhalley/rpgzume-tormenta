CREATE TABLE IF NOT EXISTS public.class_abilities (
    id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    card_id text NOT NULL,
    abilities text,
    CONSTRAINT fk_class_abilities_card FOREIGN KEY (card_id) REFERENCES public.card (id)
);
