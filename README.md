# Billed — Projet OpenClassrooms 9

Application de gestion des notes de frais (espace employé et espace RH). Mission : **corriger les bugs d'une application existante et la couvrir de tests** unitaires et d'intégration avec Jest.

## Corrections apportées

- **Tri des notes de frais** : la liste est désormais triée par date, de la plus récente à la plus ancienne.
- **Contrôle du justificatif** : seuls les fichiers `jpg`, `jpeg` et `png` sont acceptés ; sinon une alerte s'affiche et le champ est réinitialisé.
- **Connexion administrateur** : le parcours de connexion RH fonctionne et redirige vers le tableau de bord.
- **Tableau de bord RH** : l'ouverture et l'édition des tickets fonctionnent correctement d'une liste à l'autre.

## Tests

11 fichiers de tests dans `Billed-app-FR-Front/src/__tests__`, écrits au format *Given / When / Then* :

- **Unitaires** : vues (Login, Bills, NewBill, Dashboard, pages d'erreur et de chargement), filtres par statut, gestion des fichiers.
- **Intégration** : récupération des notes via l'API mockée (`GET`), soumission d'une nouvelle note, gestion des erreurs 404 et 500.

```bash
cd Billed-app-FR-Front
npm install
npm test          # lance Jest avec le rapport de couverture
```

Le rapport de couverture est généré dans `coverage/lcov-report/index.html`.

## Lancer l'application

Prérequis : Node.js 16 ou 18.

```bash
# API
cd Billed-app-FR-Back
npm install
npm run run:dev   # http://localhost:5678

# Front (dans un autre terminal)
cd Billed-app-FR-Front
npm install
npm install -g live-server
live-server       # http://127.0.0.1:8080
```

## Stack

JavaScript (ES modules), jQuery, Jest, Testing Library, Express + SQLite (API fournie)

## Ce que j'ai travaillé

- Lire et déboguer un code que je n'ai pas écrit (Chrome DevTools, points d'arrêt)
- Écrire des tests unitaires et d'intégration avec mocks de l'API et du `localStorage`
- Raisonner en scénarios utilisateur (*Given / When / Then*)
