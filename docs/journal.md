# CHRONOFITR-API

## Journal de suivi des réalisations, 1ère entrée le 23/04/2021

#### Version suivante en 11/2021 si TVB

Faire un composant pour pouvoir modifier le nombre de reps et le poids des exercices avant enregistrement => 
Enregistrer le résultat en local =>
Afficher les résultats à un training (créer une vue "Résultats" avec un select contenant les noms de trainings pour trier les résultats)=>
Faire le module auth dans l'API =>
Faire le login dans l'app react =>
Faire la logique "Coaching" =>
Enregistrer les résultats aux trainings des coachs en BDD =>

### Le 18/08 (16h30 - 20h15)

Intégrer la 'GirlsView' maquettes => ok
Afficher les girls, la version pour GirlsView => ok
Faire un premier fichier de girls utilisable pour mise en BDD, un for time :
* Afficher et lire dans 'ReadTraining' => ok
* Gérer la navigation et la cohérence des actions =>
Faire 2 ou 3 FT de plus =>
* Lire les trainings dans l'app react =>
Faire un AMRAP =>
* Lire le training dans l'app react =>
Faire 2 ou 3 AMRAP de plus =>
* Lire les trainings dans l'app react =>
Faire des EMOM =>
Faire les max reps =>

Tests de l'app (2 jours)=>

Deploy (1 jour)=>

_*FIN de la V1.0 espérée autour du 20/08*_

### Le 17/08 (9h15 - 10h00)

Intégrer la 'GirlsView' maquettes => débuté ok

### Le 16/08 (7h50 - 9h50 / 17h45 - 18h45)

Remettre en place la vue benchmark training, renommée "Girls" :
* Afficher les wod de l'API => ok
* Supprimer le D&D => ok
* Remettre action shrunk round => ok
Faire une interface sympa qui correspond aux wod girls:
  * Faire wireframe pour:
    * Page de sélection du WOD => ok
    * Page de lecture du WOD si pas la même que les customs? => non faite, directe la lecture du WOD

### Le 15/08 (9h - 10h / 17h - 19h30)

Retravailler la modal de fin => ok
Gérer redirection à l'affichage de readtraining sans training => ok
Gérer l'affichage conditionnel dans ExoPlaying => ok 
Séparer les 5 sec du début du training => ok

Benchmarks trainings:
* Scrapper les Girls => ok

### Le 14/08 (9h30 - 10h / 16h15 - 19h30)

Faire une belle transition entre ExoDetails et ExoPlaying => ok (à peu près, ça dépend des goûts...)
Faire un son fin de timecap et fin de training => ok
Afficher une modal de validation de fin de training en fin de countdown global ou fin de timeline :
* Couvre le tiers bas de l'écran => ok
* On voit suffisamment la page en transparence => ok
* Bouton OK pour retour à /custom_training => ok
* Rappel du temps total passé => ok
* Rappel du timecap si besoin => ok

### Le 13/08 (9h15 - 10h)

Faire une belle transition entre ExoDetails et ExoPlaying => 1er tests mais pas satisfait.

### Le 12/08 (8h30 - 10h / 17h - 18h30)

CSS et animation de ReadTrainingView :
  * Chrono => ok
  * Countdown => ok
  * GlobalChrono => ok
  * GlobalCountdown => ok

### le 11/08 (10h-30 - 13h / 14h)

Faire test async/await pour chrono => ok + tests semblent ok (je met à jour l'article dans le blog)
Voir l'aspect de CMTOptions avec l'input Timecap => ok
Refaire css de round Menu => ok
Ajouter un bouton accès rapide +Exo à Round => ok
Revoir ExoForm un peu plus gros => ok
Faire des beaux chronos round qui tournent avec le temps :
* Refaire un wireframe de ReadTrainingView => ok

### le 10/08 (11h - 14h / 15h - 19h)

Faire du ménage dans le readTraining state, props de chrono, countdown et exoPlaying =>
  * Chrono et Countdown ont chacun leur prop => ok
  * Exoplaying n'a plus de prop currentTime => ok
  * GlobalChrono est clean aussi => ok
Gérer la fin du training => ok
Test d'autres config de timeline :
  * countdown / chrono / countdown / chrono => ok (nice !)
  * countdown x2 / chrono / countdown / chrono x2 =>
    * Fix enchainement de deux chronos => ok, via readTrainingMW, l'affichage tremble un peu...
  * 1 round(countdown / chrono / countdown / chrono) x2 => ok
  * round(countdown x2 / chrono x3 / countdown / chrono) x2 / round(countdown x2 / chrono / countdown / chrono x3) => ok
  
Voir position du titre du training (trop haut, mange la croix) + hauteur fixe du composant => ok
Fix, le bouton exo suivant ou précédent ne doit pas déclencher les chronos par default => ok
Vider l'exo suivant quand on est à la fin + hauteur fixe du composant => ok
Voir affichage n° du round qui reste à 1 => ok (plus complexe qu'il n'y parait)
Faire un bouton reset training => ok
Fix, passer à l'exo suivant depuis un countdown devrait remettre le countdown à zero => ok
Fix, en lecture, passer à l'exo précédent depuis les 5 premières secondes du training ne devrait que remettre au début => ok

Ajouter un timecap, ou GlobalCountdown => ok
* La fin du timecap met fin au training => ok
* Fix, faire en sorte que les valeurs de ExoPlaying et temps passé restent affichées => ok
* Fix, les 5s du début sont jouées deux fois ? => ok

### le 09/08 (14h - 15h30 / 18h - 20h30) fait un article dans le blog sur les chronos avec React+Redux le matin :

* Passer le type au Round, pas au training => ok (ne pas chercher à simplifier au niveau container, passer chaque prop sinon pas de render)
* Revoir ce problème de D&D, un exo ne doit pas pouvoir aller au niveau round => ok (solutionné en précisant la prop 'put' de la prop 'group' lors de la définition de mon Sortable),
* Conditionner l'affichage d'un Chrono ou d'un CountDown à la durée de l'exo => ok
* Faire un temps total passé pour tous les trainings => ok
* Passer à l'exo suivant depuis un Chrono => ok
* Test de diverses configurations de timelines :
  * chrono / countdown / chrono / countdown => ok (les neurones en feu !), 

### Le 08/08 (9h45 - 13h30 / 20h - 21h) (équivalent de 20 jours de travail depuis le début du projet, tenir compte du fait que l'app existait déjà avec PHP et Vanilla js, soit 1 mois en temps normal, estimation d'environ 1 semaine pour la fin des fonctionnalités + 1 semaine de tests et deploy)

Ajouter la vidéo pour éviter la mise en veille du portable => ok (content du rendu)
Ajouter la synthèse vocale du titre du nouvel exo => ok
Mettre des valeurs min aux input type number de ExoForm => ok
Refaire le WOD par defaut et valeurs par défaut => ok 
Ajouter 5s avant le premier exercice de la timeline => ok
Séparer CountDown et GlobalCountdown => ok 
Fixer bug globalTime avec changement d'exo => ok (chaud niveau algorythme)

Gérer l'affichage et la lecture d'un training en prenant en compte les exercices sans durée définie:
* Créer un composant Chrono et GlobalChrono => ok

### Le 07/08 (11h - 13h15 / 14h30 - 16h30 / 18h30 - 21h)

Fait un peu de JSDoc dans trainingServices => ok
Créer la logique de lecture d'un chrono  dans le composant TimeDisplay => ok
  * Le chrono se met en route et s'arrête avec l'action prévue => ok
  * A la fin d'un chrono, si le chrono n'est pas en pause et qu'il reste au moins un exercice, passe à la suite => ok

Lire le training => ok
Gérer le temps total du training => ok
Quitter ReadTrainingView avec la croix vide le ReadTraining state (remet l'initialState) => ok
La fin du training met isCounting en pause => ok
Fixer le bug, perte 0.1sec à chaque changement d'exo => ok
Fixer bug "0" apparait dans ExoDetails quand une prop false ? => ok
Ajouter les sons avant fin d'un chrono => ok

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