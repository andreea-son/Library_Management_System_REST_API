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

- `DATABASE_URL`: The full URL to connect to your MySQL database. Format: `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`.
- `PORT`: The port on which the server will run. Default is `3000`.
- `HOST`: The host on which the server will run. Default is `localhost`.
- `NODE_ENV`: The environment in which the server will run. Default is `development`.

## API Documentation

After starting the server, access the API documentation at `http://localhost:3000/api-docs` to view the interactive Swagger UI.

## Database Diagram

Below is a conceptual diagram of the database:
![Database Diagram](./Diagrama.png "Database Diagram")

## Application Flows. Using the REST API for Library Management

### 1. User Registration
   - **Endpoint:** `POST /users/signup`
   - **Description:** The user registers by providing a username, email address, password, and optionally, a profile image.
   - **Result:** The user's account is created in the system, and they receive a JWT (JSON Web Token) for authentication.

### 2. Authentication
   - **Endpoint:** `POST /users/signin`
   - **Description:** The user logs in using their username and password.
   - **Result:** The system validates the credentials and returns a JWT, which will be used to authorize subsequent requests.

### 3. Accessing the List of Books Filtered by Price Range
   - **Endpoint:** `GET /books`
   - **Description:** The authenticated user requests a list of books within a specified price range. Users can filter the books by providing `lowerPrice` and `upperPrice` as query parameters.
   - **Query Parameters:**
   - `lowerPrice`: The minimum price for books in the search results.
   - `upperPrice`: The maximum price for books in the search results.
   - **Result:** The API returns a list of books that fall within the specified price range. Each book includes details such as title, author, and price.

### 4. Adding a New Book
   - **Endpoint:** `POST /books`
   - **Description:** The user adds a new book to the system, providing necessary details such as title, genre, publication date, and price.
   - **Result:** The book is created in the database and returned as confirmation.

### 6. Updating Book Information
   - **Endpoint:** `PATCH /books/{id}`
   - **Description:** The user updates the information of an existing book, such as its price or genre.
   - **Result:** The book's details are updated in the database.

### 7. Deleting a Book
   - **Endpoint:** `DELETE /books/{id}`
   - **Description:** The user decides to remove a book from the system.
   - **Result:** The book is deleted from the database.

### 8. Viewing User Profile
   - **Endpoint:** `GET /users/profile`
   - **Description:** The user views the details of their own profile.
   - **Result:** Details of the user's profile are returned.
     
## Author

**Son Andreea Marina**
