# CRM GitHub API Backend

## Overview

This backend service provides user registration, authentication, and management of GitHub projects. Users can register, log in, and maintain a list of their GitHub repositories with details fetched from the GitHub API such as stars, forks, issues, and creation date.

---

## Technology Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token) for authentication
- Axios for external API requests (GitHub)
- TypeScript

---

## Environment Setup

Create a `.env` file in the project root with the following variables:
You have example file inside root dir

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the project

npm install
npm build
npm run start / npm run dev

## Routes

- TEST ROUTE - @GET - /

#### REGISTRATION

- @POST - /api/auth/signup

#### LOGIN

- @POST - /api/auth/signin

#### GETTING POSTS

- @GET - /api/projects

#### CREATING PROJECT

- @POST - /api/projects BODY { repoPath: "facebook/react" }

#### UPDATING POST

- @PATCH - /api/projects/:id

#### DELETING POST

- @DELETE - /api/projects/:id
