# CHRONOFITR-API

## Journal de suivi des réalisations, 1ère entrée le 23/04/2021

### Le 21/07/2021

20h30 - 21h30
Il me faut ajouter une table "Option" au MCD afin de gérer les options d'un exercie (durée, reps, poids, détails)

Ajout au MCD =>
Création modèle sequelize =>
Création association sequelize =>
Modification du script de création DB => 

### Le 20/07/2021

J'arrive à travailler de 2 à 4h par jour, à côté c'est les vacances et la fin des travaux dans la maison.

Aujourd'hui, j'ajoute la table 'Round' avec les tables d'association 'Training-has-round' et 'Round-has-training' dans le MCD.

Je change aussi le MCD avec un whimsical car la mise en forme auto de Mocodoonline ne donne pas de resultat satisfaisant. (Me semble bien plus simple et compréhensible sur whimsical).

Modifications dans sequelize => ok
Modification du script de création de la base de données => ok

Affichage de la page "Training" avec le composant "TrainingManager" qui récupère la liste des trainings disponibles en BDD et permet avec un select de récupérer et afficher le training sélectionné dans le composant "Training", y compris les différents "Round" et les "Exercice" dans les rounds. Cool !

### Le 13/07/2021

Le script de création de la base de données semble fonctionner. J'ai fait rapido un scrapper en python pour récupérer les définitions d'exercice d'un site. 
Fait également les user stories plus détaillées et rempli le trello avec.
Prochaine étape la mise à jour des endpoints et tests d'intégration.

### Le 11/07/2021

J'espère être parvenu à une version définitive du MCD.
Je finis et test le script de création de la base avec séquelize.

### Le 10/07/2021

Reprise du projet, entre temps il y a eu le TP DWWM.
Aujourd'hui je reprends le cours du projet, je fais un script de création et seeding de la base d'après celui de concord.

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