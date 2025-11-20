# 🌐 Communication P2P et Temps Réel sur le Web (INE3)

Ce dépôt contient les travaux pratiques (TPs) réalisés dans le cadre du module **Communication P2P en temps réel sur le web** (INE3).

L'objectif de ces projets est d'explorer les architectures web modernes, du protocole HTTP standard aux communications temps réel (WebSockets) et Peer-to-Peer (WebRTC), en utilisant des stacks technologiques actuelles (Python Flask, Node.js, MEAN).

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)

## 📂 Structure du Dépôt
```text
.
├── TP1/      # TP1 : Les Servlets HTTP (Implémentation Python Flask)
├── TP2/     # TP2 : Architecture Node.js & MEAN Stack
└── TP3/      # TP3 : Visioconférence P2P (WebRTC)
```

### 🐍 TP1 : Les Servlets HTTP & Architecture MVC
Technologie : Python, Flask, SQLite, Jinja2

Ce TP revisite les concepts fondamentaux des Servlets Java EE mais implémentés avec Python Flask pour une approche plus moderne et légère.

Fonctionnalités :
Gestion des requêtes HTTP (GET/POST).

Architecture MVC (Modèle avec SQLite, Vue avec Jinja2, Contrôleur avec Flask).

Persistance : Stockage des résultats de loterie dans une base de données SQLite.

Sécurité : Utilisation de Décorateurs Python pour gérer les rôles (Auth) et les Blacklists.

Installation et Démarrage :
Bash

cd TP1
pip install flask
python app.py
# Accès : http://localhost:8080


### 🚀 TP2 : Plateforme Node.js & Stack MEAN
Technologie : Node.js, Express, MongoDB (Mongoose), Socket.io, Multer

Une application web complète démontrant l'architecture non-bloquante de Node.js et l'utilisation d'une base de données NoSQL.

Fonctionnalités :
API RESTful : Routage modulaire avec Express.

Base de Données : Connexion MongoDB via Mongoose (Schémas utilisateurs).

Upload de fichiers : Gestion multipart/form-data pour uploader des images de profil.

Temps Réel : Chat intégré utilisant les WebSockets (Socket.io).

Système de Fichiers : Exploration des fichiers serveur (commande exec).

Installation et Démarrage :
Prérequis : MongoDB doit être lancé localement.

Bash

cd TP2
npm install
node server.js
# Accès : http://localhost:8888


### 📹 TP3 : La Plateforme WebRTC
Technologie : WebRTC API, Node.js (Signalisation), Socket.io

Application de visioconférence Peer-to-Peer (P2P) permettant l'échange de flux audio, vidéo et de données textuelles sans passer par le serveur pour le transport média.

Fonctionnalités :
Serveur de Signalisation : Handshake SDP et échange de candidats ICE via Socket.io.

Streaming P2P : Utilisation de RTCPeerConnection pour la vidéo/audio.

Data Channel : Chat textuel sécurisé via RTCDataChannel (SCTP).

Traversée NAT : Configuration STUN (Google STUN servers).

Installation et Démarrage :
Bash

cd TP3
npm install
node server.js
# Ouvrir deux onglets sur : http://localhost:3000
🛠️ Prérequis
Pour faire tourner ces projets, assurez-vous d'avoir installé :

Python 3.x

Node.js & NPM

MongoDB Community Server

📝 Auteur
Réalisé par Aymane dans le cadre de la formation ingénieur à l'INPT.