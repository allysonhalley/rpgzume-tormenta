CREATE TABLE IF NOT EXISTS public.racial_traits (
    id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    card_id text NOT NULL,
    traits text,
    CONSTRAINT fk_racial_traits_card FOREIGN KEY (card_id) REFERENCES public.card (id)
);
