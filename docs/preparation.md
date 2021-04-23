# Chronofit-react

## Besoins

Une application accessible sur le web, qui doit permettre de créer et lire des entrainements sportifs.
Les entrainements sont, pour la première version, une liste d'exercices à réaliser.
Chaque exercice a :
* Un nom,
* Une description, 
* Une durée,
* Un nombre de répétition (facultatif),
* Une charge (facultative),

Les entrainements enregistrés dans l'API sont considérés 'benchmark' dans le sens ou ils peuvent être comparés, en terme de durée globale, de nombre de répétitions et / ou de charge.

Certains exercices de base dit 'benchmark' également sont comparés en terme de nombre de répétitions et charge moyenne sur une période donnée.

## User Cases

Les différents utilisateurs :
* L'utilisateur non identifié, (accès en lecture API)
* L'utilisateur identifié, a un compte, (droit sup + écriture en localStorage),
* Le coach (droits sup + CRUD API sur ses entrainements).
* L'admin (droits sup + CRUD API sur tous les entrainements)

| En tant que ... | Je veux ... | Afin de ...|
| :---| :---| :---|
| V1 - Utilisateur non identifié | Avoir accès à des entrainements benchmark | Pouvoir tester l'application |
| V1 - Utilisateur non identifié | Pouvoir créer un compte | Avoir accès aux autres fonctionnalités |
| V1 - Utilisateur identifié | Pouvoir créer des entrainements | Avoir des entrainements personnalisés |
| V1 - Utilisateur identifié | Enregistrer une trame d'entrainement en local | Pouvoir refaire un entrainement que j'ai créé |
| V2 - Utilisateur identifié | Enregistrer mes performances lors d'un entrainement benchmark | Pouvoir juger de ma progression |
| V2 - Utilisateur identifié | Avoir une vue graphique de l'évolution de mes performances sur les entrainement benchmark et exercices benchmarks | Pouvoir juger de ma progression |
| V2 - Coach | Pouvoir créer un entrainement benchMark (ou non) | Proposer un suivi personnalisé |
| V2 - Coach | Pouvoir assigner un entrainement à un utilisateur | Proposer un suivi personnalisé |

## MCD

A ce stade, les différentes entités identifiées :
* Entrainement,
* Entrainements faits ?
* Exercice,
* Exercices faits ?
* Categorie,
* Coach,
* Rôle,

Les rôles :
* public : utilisateur non-identifié,
* authenticated : utilisateur connecté, peut CRUD des exercices et entrainements en local,
* coach : 'authenticated' + peut CRUD ses entrainements et exercices dans l'API et les lier à un user.
* admin : 'coach' + peut CRUD tous les entrainements et exercices,

Le _authenticated_ peut lire mais pas écrire dans la base de données.
L'_admin_ quand à lui est un coach sans restriction sur l'auteur.


VOIR AUSSI : Une table exercices 'benchmark' et une liste des exos non-benchmark ?

![mocodo de chronofit-react](./mocodo/chronofitR.svg)

## FAQ
### Comment créer ou modifier un entrainement ?
L'utilisateur a accès à une vue permettant de :
* Créer un entrainement vide (ou modifier une entrainement existant et l'enregistrer sous un autre nom),
* Créer un exercice à partir de la liste des exos 'benchmark' ou un nouvel exercice en précisant ses paramétres (durée, nb de reps, charge, description + nom pour les exos non-benchmark),
* Ajouter cet exercice et les suivants dans la liste d'exo du training,
* Enregistrer l'entrainement (en local ou DB selon les droits),

### Comment suivre un entrainement ?
Depuis la vue qui permet de créer, modifier ou charger un entrainement, la time-line est remplie avec les exercices sélectionnés.
On valide, ce qui affiche la vue permettant de suivre l'enchainement des exercices prévus.

### Comment enregistrer ses performances ?
Selon le type d'exercice, le nombre de reps effectué et la charge ont pu être modifiés.
Ces informations ainsi que le temps total de l'entrainement peuvent être enregistrés à la fin de l'entrainement (donné soit par la fin du dernier exercice chronométré, soit par le fait de quitter la vue d'entrainement par la croix).
On crée alors un enregitrement 'training_done' qui contient :
* Le nom du sportif,
* Une référence au training d'origine, 
* Une liste d'exercice (contient les infos décrites ci-dessus) au format json.

### Comment comparer les perfs aux entrainements faits ? Comment visualiser les améliorations ?
Une vue personnalisée affiche les statistiques (à définir plus finement avec de la data), qui contiendrait entre autre :
* Le temps total passé en entrainement pour plusieurs durées type (aujourd'hui, semaine, mois, année...) ?
* Le nombre de répétitions pour les entrainements benchmark, avec indication du poids moyen ?
* Les maxs aux exos benchmarks prévus ?
* Un graph sur différentes durées affichant l'historique pour un exo benchmark, les maxs ?

## Stack technique

Front : _React_ + _Redux_

Communique avec une API REST :

_Node + Express + Sequelize + postgreSQL_

Développement en local puis hébergement de l'API chez AWS, du Front chez _Quillers.fr_, voir DNS Gandi pour chronofit-react.ikodi.eu

