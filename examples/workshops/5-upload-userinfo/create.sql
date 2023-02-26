CREATE DATABASE upload_userinfo;

-- public.files definition
-- Drop table
-- DROP TABLE public.files;
CREATE TABLE public.files (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    filename varchar NOT NULL,
    mimetype varchar NOT NULL,
    destination varchar NOT NULL,
    CONSTRAINT files_pk PRIMARY KEY (id)
);

-- public.userinfos definition
-- Drop table
-- DROP TABLE public.userinfos;
CREATE TABLE public.userinfos (
    id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
    first_name varchar NULL,
    last_name varchar NULL,
    display_id int4 NULL,
    CONSTRAINT userinfos_pk PRIMARY KEY (id),
    CONSTRAINT userinfos_display_fk FOREIGN KEY (display_id) REFERENCES public.files(id)
);
