BEGIN;

DROP TABLE IF EXISTS "category", "training", "training_has_exercice", "exercice", "user_has_training", "role", "user", "training_done";

CREATE TABLE "category" (
  -- on utilise le nouveau type qui est un standart SQL alors que SERIAL est un pseudo-type de PG
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

CREATE TABLE "training" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "exo_list" json,
  "is_benchmark" boolean DEFAULT false,
  "creator_id" integer NOT NULL,
  "category_id" integer,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

CREATE TABLE "exercice" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "description" TEXT DEFAULT '',
  "is_benchmark" boolean DEFAULT false,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

-- CREATE TABLE "training_has_exercice" (
--   "training_id" integer NOT NULL REFERENCES training("id") ON DELETE CASCADE,
--   "exercice_id" integer NOT NULL REFERENCES exercice("id") ON DELETE CASCADE,
--   "created_at" TIMESTAMP DEFAULT NOW()  -- ici pas d'updated_at car une relation ne se met pas à jour, soit on l'ajoute soit on la supprime
-- );

CREATE TABLE "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" TEXT NOT NULL DEFAULT '',
  "firstname" TEXT NOT NULL DEFAULT '',
  "lastname" TEXT NOT NULL DEFAULT '',
  "password" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "status" TEXT NOT NULL DEFAULT '',
  "role_id" integer,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

-- CREATE TABLE "user_has_training" (
--   "training_id" integer NOT NULL REFERENCES training("id") ON DELETE CASCADE,
--   "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
--   "created_at" TIMESTAMP DEFAULT NOW(),
--   "updated_at" TIMESTAMP
--   -- ici pas d'updated_at car une relation ne se met pas à jour, soit on l'ajoute soit on la supprime
-- );

CREATE TABLE "training_done" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "exo_list" json ,
  "training_origin_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

-- ALTER TABLE "training" ADD FOREIGN KEY ("author_id") REFERENCES "user" ("id");
-- ALTER TABLE "training" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

-- ALTER TABLE "training_has_exercice" ADD FOREIGN KEY ("training_id") REFERENCES "training" ("id");
-- ALTER TABLE "training_has_exercice" ADD FOREIGN KEY ("exercice_id") REFERENCES "exercice" ("id");

-- ALTER TABLE "user_has_training" ADD FOREIGN KEY ("training_id") REFERENCES "training" ("id");
-- ALTER TABLE "user_has_training" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

-- ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES role ("id");

-- ALTER TABLE "training_done" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
-- ALTER TABLE "training_done" ADD FOREIGN KEY ("training_id") REFERENCES "training" ("id");

COMMIT;
