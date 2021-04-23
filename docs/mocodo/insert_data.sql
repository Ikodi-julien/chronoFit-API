
BEGIN;

INSERT INTO "role" ("name") VALUES 
('public'),
('authenticated'),
('coach'),
('admin');

INSERT INTO "user" ("pseudo", "firstname", "lastname", "password", "email", "role_id") VALUES
('J-P', 'Julien', 'Pellin', '$2b$10$EUaudgeyxHm8Tl0PwEQxi.fGH.8BXR8J3aLyMCZfsDqoIqsdWAeby', 'jupellin39@gmail.com',   1),
('P_J', 'Pierre', 'Japin', '$2b$10$EUaudgeyxHm8Tl0PwEQxi.fGH.8BXR8J3aLyMCZfsDqoIqsdWAeby', 'jupellin39@gmail.com',   2);

INSERT INTO "category" ("name") VALUES
  ('CARDIO'),
  ('FORCE'),
  ('CORE');

INSERT INTO "training" ("name", "author_id", "is_benchmark", "category_id") VALUES 
('Routine fullbody', 1, 'false', 2),
('For time fullbody', 2, 'true', 1),
('Routine jambes', 1, 'false', 2);

INSERT INTO "exercice" ("name", "description", "is_benchmark") VALUES
('Tractions strictes', 'nada', 'true'),
('Pompes standard', 'nada', 'true'),
('Rowing', 'nada', 'true'),
('Air squat', 'non pas de desc', 'true'),
('Fentes alternées', 'pas de description', 'true');

INSERT INTO "training_has_exercice" ("training_id", "exercice_id") VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(3, 4),
(3, 5);

INSERT INTO "user_has_training" ("training_id", "user_id") VALUES
(1, 1),
(2, 2),
(3, 1);

INSERT INTO "training_done" ("training_id", "user_id") VALUES
(1, 1),
(2, 2),
(3, 1);

COMMIT;
