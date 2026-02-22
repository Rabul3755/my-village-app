# MyVillage - Full Stack Application

## 📁 Folder Structure

```mermaid
flowchart TD
    Root[MyVillage]
    Root --> Frontend
    Root --> Backend
    Frontend --> Components
    Frontend --> Pages
    Backend --> Controllers
    Backend --> Routes
    Backend --> Models
```


## 📌 Project Architecture

```mermaid
flowchart LR
    User[User / Admin] --> Frontend[React Frontend]
    Frontend --> Backend[Node.js + Express API]
    Backend --> DB[(MongoDB Database)]
    Backend --> Cloud[Cloudinary Storage]
    Backend --> Auth[JWT Authentication]
```




# 🏘️ MyVillage - Full Stack Civic Issue Management System

## 📌 System Architecture

```mermaid
flowchart LR

    %% Users
    U[Citizen / Admin] --> FE[React Frontend]

    %% Frontend
    FE -->|API Requests| BE[Node.js + Express Backend]

    %% Authentication
    BE -->|Generate & Verify| JWT[JWT Authentication]

    %% Database
    BE --> DB[(MongoDB Database)]

    %% File Storage
    BE --> CL[Cloudinary Image Storage]

    %% Admin Flow
    FE -->|Admin Dashboard| BE

    %% Issue Flow
    U -->|Create Issue| FE
    FE -->|POST /issues| BE
    BE -->|Store Data| DB
    BE -->|Upload Images| CL

```


## 🗂 Database Schema

```mermaid
erDiagram

    USER {
        string _id
        string name
        string email
        string password
        string role
    }

    ISSUE {
        string _id
        string title
        string description
        string category
        string status
        string userId
    }

    LEADER {
        string _id
        string name
        string department
    }

    USER ||--o{ ISSUE : creates
    LEADER ||--o{ ISSUE : manages

```