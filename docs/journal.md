# CHRONOFITR-API

## Journal de suivi des réalisations, 1ère entrée le 23/04/2021

### Le 07/08 (11h - 13h15)

Fait un peu de JSDoc dans trainingServices => ok
Créer la logique de lecture d'un chrono  dans le composant TimeDisplay => ok
  * Le chrono se met en route et s'arrête avec l'action prévue => ok
  * Si le chrono n'est pas en pause et qu'il reste au moins un exercice, passe à la suite =>

Lire le training =>
Pouvoir modifier le nombre de reps et le poids d'un exercice =>
Faire une modale pour valider la fin du training =>
Enregistrer le résultat =>
Faire un beau chrono round qui tourne avec le temps =>
Afficher les résultats à un training (créer une vue "Résultats" avec un select contenant les trainings)=>

### Le 06/08 (09h30 - 13h15 / 14h15 - 16h / 19h - 20h15)

Créer la vue ReadTraining (suite) :
* TrainingDétails => ok
* ExoDetails => ok
* ExoPlayingDetails => ok
* ReadControl => ok
* ReadTime => ok

Créer readTrainingReducer => ok
 
Connecter les components au store :
* ReadTrainingView => ok
* TrainingDétails => ok
* ExoDetails => ok
* ExoPlayingDetails => ok
* TimeDisplay => ok

Afficher le localTraining => ok

Une bonne chose de faite, pour la suite je projette de :
* créer les actions maker pour avancer et reculer d'un exercice => ok
  * On peut afficher l'exo suivant ou précédent avec le contrôle prévu => ok
  * Pas d'erreur en début et fin de liste => ok
  * Corriger la fonction getTimeline() => ok

### Le 05/08 (11h - 13h30 / 14h30 - 17h / 18h - 20h30)

Relier au state la modification de l'ordre des exercices dans un autre round => Problème "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node." ? => ok après une bonne nuit de sommeil (merci les issues github)

Tests avant étape suivante et lister les issues à solutionner => ok
* Gérer le contenu des input à l'ajout d'un exoForm (mettre des valeurs si pas déjà rempli) => ok en fait ne pas mettre 'null' en valeur pas défaut d'un input contrôlé.
* La suppression d'un exercice dans une liste le supprime dans tous les Rounds => ok géré
* Gérer le bug avec le temps total du training => ok, 
* Prévoir de pouvoir déplier et plier un Round => ok
* Round plié si plus de deux exos => ok
* L'ajout d'un exo dans un round déplie le round => ok
* Ne pas pouvoir déplier un exo si round plié (ne pas afficher le caret) => ok
* Ne pas plier le round si un seul exercice => ok
* Ne pas pouvoir faire de D&D si exo déplié (si un exoForm affiché) => ok mais apparait en début de liste car n'est plus pris en compte pour le tri...

Testé sur portable aussi, semble fonctionner plutôt bien, je passe donc à la suite et c'est cool !
Créer le "ReadTrainingView" - wireframe => ok

Séparer le trainingReducer en "allTrainingReducer", "localTrainingReducer", "apiTrainingReducer" =>
* Renommer correctement les props dans le reducer actuel => ok
* Déplacer isToRender dans appReducer => ok
* Créer apiTrainingReducer => ok
* Renommer trainingReducer en localTrainingReducer => ok

Ajouter un bouton dans trainingManager puis afficher la ReadTrainingView => ok

Créer et afficher avec props en dur :
* TrainingDétails => en cours...

### Le 04/08 (12h - 13h30 / 14h30 -)

Ajouter des infos sur le currentTraining dans le TrainingManager(durée totale, type (for time, EMOM...)) => ok
Voir pour que "save" modifie le training sélectionné après confirmation si pas de nom saisi => ok
Créer une modale de confirmation pour "save" et "delete" des trainings => ok, rounds => ok et exercices => ok
Relier au state la modification de l'ordre des exercices dans un même round => ok
Relier au state la modification de l'ordre des exercices dans un autre round => Problème "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node." ?

### Le 03/08 (17h30 - 21h)

Mettre en place le drag and drop des exercices => ok (avec sortablejs)
Mettre en place le drag and drop des Rounds => ok
Pouvoir déplacer un exercice entre des rounds => ok
Relier au state la modification de l'ordre des rounds => Pour l'instant c'est la galère, la modification de l'ordre des rounds est bien prise en compte, le state est modifié, l'info parvient au container et au composant, il y a un nouveau render mais il ne provoque pas la remise à 0 de l'ordre de la liste modifiée lors du D&D...
  => Solutionné en triant la liste de rounds mise à jour selon un attribut 'data-id' correspondant au nouvel index dans la liste, cool !

### Le 02/08 (17h30 - 20h45)

Faire un container pour Round => ok 
Faire un container pour ExoInList => ok mais maintenant je dois magouiller pour avoir un render, pas terrible...
Affichage du composant ExoForm à l'ajout d'un exercice à la place d'un ExoInList actuellement => ok
Ajouter l'itération d'un exercice côté API (ExoOption) => ok
Ajouter l'itération d'un exercice côté React + controllé Redux => ok
Test de création d'un training type => ok

Vider l'exoForm après validation (que le nom et description)=> ok
Gérer la durée d'un round en minutes => ok
Faire affichage conditionnel de la description dans ExoInList => ok

### Le 01/08 (10h30 - 11h et 18h50 - 20h50)

Création du composant ExoForm (React + css + Redux) => ok
L'affichage d'un ExoForm ferme les autres => ok
Le contenu des inputs exoForm est contrôlé séparément du training => ok
La validation d'un ExoForm modifie le localTraining => ok
Les données saisies dans le ExoForm sont sauvegardées en local et réaffichées => ok
Affichage du composant ExoInList après validation du formulaire => ok
L'utilisateur peut supprimer un exercice => ok

### Le 31/07/2021 ( 10 à 11h et 16h30 - 19h30)

Ajout d'un exercice (vide) dans un round => ok 

A partir de là, je souhaite qu'il y ait un composant représentant un exercice 'réduit' et un composant 'formulaire'.
Lors de l'ajout d'un exercice, c'est le composant formulaire qui s'affiche, après remplissage et validation, c'est le composant réduit qui s'affiche dans la liste.
En cliquant sur l'icone approprié dans le composant réduit, l'utilisateur afficherait le composant formulaire, il pourrait alors choisir de modifier les valeurs, supprimer l'exercice ou revenir à l'affichage réduit.

L'utilisateur peut ajouter un exercice au training local en cours => ok
Revoir le composant ExoInList (wireframe)=> ok
Création du composant ExoForm (wireframe) => ok
Revoir le composant ExoInList (React + css + Redux) => ok
Affichage du formulaire d'un exercice avec un bouton dans le composant ExoInList=> ok
Création du composant ExoForm (React + css + Redux) => en cours, pas mal avancé,

### Le 26/07/2021

Modification de l'itération d'un round => ok

### Le 25/07/2021

Aujourd'hui dimanche, je passe un peu plus de temps sur le projet.

Faire un composant dédié à la sélection de trainings locaux et son container. => ok "CustomTrainingManager",

Enregistrer un training en local => ok
Afficher un training en local => ok
Modifier un training en local => (le nom) ok
Supprimer un training en local => ok
Ajouter un round à un training (pas de modif des valeurs) => ok
Faire un menu pour les actions d'un round => ok
Supprimer un round d'un training => ok

Prochains objectifs :
- modif de l'itération d'un round, 
- création d'exercices (CRUD exercices),

### Le 24/07/2021

Pas beaucoup avancé sur le projet, 1h par çi par là. Les travaux de placo dans la maison avancent raisonnablement, eux.

aujourd'hui, séparation des vues custom et benchmark training.
Modification des composants et du scss pour un affichage correct.
Création d'action maker pour la vue "custom trainings", relié au store.

Prochaine étape : CRUD un training en localstorage.

### Le 21/07/2021

20h30 - 22h15
Il me faut ajouter une table "Option" au MCD afin de gérer les options d'un exercie (durée, reps, poids, détails)

Ajout au MCD => ok
Création modèle sequelize => ok
Création association sequelize => ok
Modification du script de création DB => ok
Modification controlleur /training/:id => ok
Affichage des options dans la timeline => ok

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