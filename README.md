# Library Management System API

## Description

This REST API manages a library system where CRUD operations can be performed on books, authors, publishers, and users. It's built with Node.js, Express, and Prisma ORM to interact with a MySQL database.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MySQL (v8.0 or later)
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andreea-son/Library_Management_System_REST_API
   cd Library_Management_System_REST_API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Ensure MySQL is running on your system.
   - Create a database named `node_bookstore`.

4. **Configure environment variables:**
   - Create a `.env` file.
   - Fill in the necessary details like your database URL in the `.env` file.

5. **Run the Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the server:**
   ```bash
   npm start
   ```

### Environment Variables

- `DATABASE_URL`: The full URL to connect to your MySQL database. Format: `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
- `PORT`: The port on which the server will run. Default is `3000`.
- `HOST`: The host on which the server will run. Default is `localhost`
- `NODE_ENV`: The environment in which the server will run. Default is `development`

## API Documentation

After starting the server, access the API documentation at `http://localhost:3000/api-docs` to view the interactive Swagger UI.

## Database Diagram

Below is a conceptual diagram of the database:
![Database Diagram](./Diagrama.png "Database Diagram")

## Author

**Son Andreea Marina**
