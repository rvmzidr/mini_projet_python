# 🎓 Student Management System

Un système complet de gestion des étudiants intégrant des technologies modernes, conçu pour les établissements éducatifs. Le projet est divisé en plusieurs microservices avec des interfaces dédiées pour les étudiants et les administrateurs.

---

## 🧩 Architecture des Composants

### 🔙 Backend

- **Spring Boot Microservice** : Gestion des étudiants, cours, départements et favoris.
- **FastAPI Backend** : Génération de recommandations de livres et résumés AI.
- **MongoDB** : Stockage des profils étudiants, cours, départements, et favoris.
- **PostgreSQL** : Stockage des données de recommandations de livres.
- **Redis** : Cache pour améliorer les performances.

### 🎨 Frontend

- **Next.js (React)** : Portail étudiant avec :
  - Inscription et authentification
  - Inscription aux cours
  - Gestion du profil
  - Système de favoris
- **Angular** : Tableau de bord administrateur avec :
  - Gestion des étudiants, cours et départements
  - Statistiques détaillées

---

## 🚀 Fonctionnalités Clés

- 🔐 Authentification sécurisée pour les étudiants
- 📚 Système d'inscription aux cours
- 🏛 Organisation par départements
- 📌 Système de favoris (cours, ressources, livres)
- 📖 Recommandation de livres avec filtres (catégorie, prix)
- 🤖 Résumés de livres générés par IA (via API Groq LLM)
- 📊 Tableau de bord admin avec statistiques clés
- 📱 Interfaces réactives adaptées à tous les appareils

---

## 🛠️ Stack Technique

| Catégorie      | Technologie                                |
|----------------|---------------------------------------------|
| **Frontend**   | Next.js (React), Angular, Tailwind CSS, TS |
| **Backend**    | Spring Boot, FastAPI                        |
| **Base de données** | MongoDB, PostgreSQL                   |
| **Cache**      | Redis                                       |
| **IA**         | [Groq LLM API](https://groq.com/) pour résumés |
| **Outils**     | Docker, Docker Compose                      |

---

## 📦 Installation et Lancement

### Prérequis
- Node.js (v18+)
- Docker & Docker Compose
- Java 17+
- Python 3.10+
- MongoDB et PostgreSQL installés ou via Docker
- API Key pour Groq (variable `GROQ_API_KEY`)

### Clonage du projet

```bash
git clone https://github.com/ton-compte/student-management-system.git
cd student-management-system
