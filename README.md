# Odin Members Only

Simple members-only app made for The Odin Project to practice implementing authentication with Node/Express (using JSON Web Tokens)

If you want to build this project for yourself, you'll need to clone this repo and install dependencies with `pnpm i` inside both the `client` and `server` folders. Once you've done that, run `pnpm run dev` in both to boot up the client and server instances.

You'll also have to connect a PostgreSQL database with the following schema for the app to work (the pool is under `/server/db/pool.ts`). The database name doesn't matter as long as it matches the pool.

```sql
CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    isadmin boolean DEFAULT false
);

CREATE TABLE public.messages (
    authorid integer NOT NULL,
    posted timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    message text,
    authorname character varying(255)
);
```
