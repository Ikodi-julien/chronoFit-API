# CHRONOFITR-API

## Journal de suivi des réalisations, 1ère entrée le 23/04/2021

### Le 25/04/2021.

J'opte pour l'envoi d'objets JSON en méthode POST, donc je vire multer et met express.json() à la place.
Teste des associations sur tous les modèles => ok grace à des mises au point.

A partir de maintenant, j'ai des fakes data et possibilité de converser avec mon API, je passe à React-redux.

### Le 24/04/2021.

Ajout des routes manquantes pour les catégories.
Création des routes pour les trainings, trainingsDone et users.
Je dois peser le pour et le contre du format d'envoi de données à prévoir (formData ou JSON ?).

J'avais des erreurs d'associations à régler, ça semble ok.
Aussi la table user_has_training semble inutile, je la supprime, ce qui simplifie bien le graph.
Toujours les mêmes warnings en console.

### Le 23/04/2021.

Après les étapes préliminaires (besoins, user cases, MCD).
Mise en place de l'app express, tests et création des routes :
GET : /
GET : /categories
GET : /category/:id

Jusqu'ici tout va bien, j'ai des warnings de sequelize en console dont je ne comprend pas l'origine (enfin j'ai trouvé l'origine dans le fichier node_modules/lib/models.js, mais pourquoi ?), cependant il ne semble pas y avoir d'impact sur les requêtes, tout fonctionne, donc à voir dans le futur.

Next : Poursuivre la mise en place des routes.