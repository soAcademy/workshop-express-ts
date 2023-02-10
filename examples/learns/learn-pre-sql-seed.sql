-- public.categories definition
-- Drop table
-- DROP TABLE public.categories;
CREATE TABLE public.categories (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    "name" varchar NULL,
    CONSTRAINT categories_pk PRIMARY KEY (id)
);

-- public.dining_tables definition
-- Drop table
-- DROP TABLE public.dining_tables;
CREATE TABLE public.dining_tables (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    seat int4 NULL,
    CONSTRAINT dining_tables_pk PRIMARY KEY (id)
);

-- public.food_menus definition
-- Drop table
-- DROP TABLE public.food_menus;
CREATE TABLE public.food_menus (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    "name" varchar NULL,
    price numeric NULL,
    discount numeric NULL,
    categories_id int4 NOT NULL,
    CONSTRAINT food_menus_pk PRIMARY KEY (id),
    CONSTRAINT food_menus_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id)
);

-- public.orders definition
-- Drop table
-- DROP TABLE public.orders;
CREATE TABLE public.orders (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    price numeric NOT NULL,
    amount int4 NOT NULL DEFAULT 1,
    dining_tables_id int4 NOT NULL,
    food_menus_id int4 NOT NULL,
    created_date timestamp NOT NULL DEFAULT timezone('UTC' :: text, now()),
    CONSTRAINT orders_pk PRIMARY KEY (id),
    CONSTRAINT orders_dining_tables_fk FOREIGN KEY (dining_tables_id) REFERENCES public.dining_tables(id),
    CONSTRAINT orders_food_menus_fk FOREIGN KEY (food_menus_id) REFERENCES public.food_menus(id)
);


-- Seed

INSERT INTO public.categories ("name") VALUES
	 ('ผัด'),
	 ('ทอด'),
	 ('ต้ม'),
	 ('ยำ'),
	 ('นึ่ง');

INSERT INTO public.dining_tables (seat) VALUES
	 (3),
	 (4),
	 (1),
	 (1);

