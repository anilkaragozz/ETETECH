
# EteTech Admin Panel 

An admin dashboard application built with React, Node.js (Express), and MongoDB.  
It provides secure authentication, company and product management, and a responsive UI.


## Features

- 🔐 **JWT Authentication**: Login, register and logout functionality with protected routes.
- 🧩 **Feature-Based Architecture**: Modular frontend and backend folder structure.
- 🏢 **Company Management**:
  - Add, edit, delete companies
  - Country-based distribution
  - Website and legal number tracking
- 📦 **Product Management**:
  - Add, edit, delete products
  - Product-company relation (1:n)
- 📊 **Dashboard Overview**:
  - Total company count
  - Last added companies
  - Companies grouped by country
- 🧠 Form validation React Hook Form
- ⚡ Responsive UI built with Ant Design & TailwindCSS
- 🔄 API data fetching using TanStack Query
- 🧠 Global state managed via Zustand
- 💾 MongoDB as database, integrated via Mongoose

  
## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/) (with Vite)
- [Ant Design](https://ant.design/) for components
- [Tailwind CSS](https://tailwindcss.com/) for utility styling
- [React Hook Form](https://react-hook-form.com/) for form validations
- [TanStack Query](https://tanstack.com/query/latest) for data synchronization
- [Zustand](https://github.com/pmndrs/zustand) for global auth state
- [React Router DOM](https://reactrouter.com/) for client-side routing

### Backend
- [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for secure token-based authentication
- Modular feature-based architecture

## Project Structure

```bash
ETETECH/
├── backend/            # Express + Mongo backend
│   └── features/       # auth, company, product APIs
├── frontend/           # Vite + React app
│   └── features/       # feature-based React modules

```
## 🧪 How to Run Locally

`PS:NodeJs must be installed on your local machine for project work https://nodejs.org/en/download/package-manager`

1- Clone the Repository
```bash 
git clone https://github.com/anilkaragozz/ETETECH.git
cd ETETECH
```
2- Start Backend 

```bash 
cd backend
npm install
# create .env file and add PORT + MongoDB URI + JWT_SECRET #
npm run dev
```
The backend server will run on http://localhost:5000

3- Start Frontend

```bash 
cd ../frontend
npm install
npm run dev
```
The frontend will run on http://localhost:5173 


Created with ❤️ by Anıl Karagöz