# CRM Backend

Ce projet contient la partie backend d'un CRM (Customer Relationship Management). Il a été construit avec Node.js, Express et MongoDB pour gérer les données des utilisateurs et des leads, y compris l'authentification et la gestion des rôles (employeur et manager).

## Fonctionnalités

- **Authentification (JWT)** : Permet à un utilisateur de se connecter et d'obtenir un token JWT pour les futures requêtes authentifiées.
- **Gestion des utilisateurs (Employeurs et Managers)** : L'employeur peut gérer les comptes des managers et les affecter à des leads.
- **Gestion des leads** : Les employeurs peuvent gérer tous les leads (créer, modifier, supprimer) et les assigner à des managers.
- **Statistiques** : Le tableau de bord de l'employeur fournit des statistiques sur les leads.

## Prérequis

- Node.js (version >= 14)
- MongoDB (local ou Atlas)
- Postman ou cURL pour tester les API

## Installation

1. Clone le dépôt du backend :
   ```bash
   git clone https://github.com/ton-username/crm-backend.git
