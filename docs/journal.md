# CHRONOFITR-API

## Journal de suivi des réalisations, 1ère entrée le 23/04/2021

### Le 23/04/2021.

Après les étapes préliminaires (besoins, user cases, MCD).
Mise en place de l'app express, tests et création des routes :
GET : /
GET : /categories
GET : /category/:id

Jusqu'ici tout va bien, j'ai des warnings de sequelize en console dont je ne comprend pas l'origine (enfin j'ai trouvé l'origine dans le fichier node_modules/lib/models.js, mais pourquoi ?), cependant il ne semble pas y avoir d'impact sur les requêtes, tout fonctionne, donc à voir dans le futur.