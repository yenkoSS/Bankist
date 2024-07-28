# Online Banking Application

This is an online banking application developed using Express.js for the back-end. The application uses JSON Web Tokens (JWT) for authentication to ensure secure communication between the client and server.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [License](#license)

## Features

- User registration and authentication
- JWT-based authentication
- Fund transfer between accounts
- Transaction history
- Secure API endpoints

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- dotenv for environment variable management

## Prerequisites

- Node.js and npm installed
- MongoDB database (local or remote)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yenkoSS/Bankist
   cd Bankist
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/online-banking
   JWT_SECRET=your_jwt_secret
   ```

4. Ensure MongoDB is running. 

## Configuration

Configure your environment variables in the `.env` file:

- `PORT`: The port number on which the server will run (default is 3000).
- `MONGODB_URI`: The MongoDB connection string.
- `JWT_SECRET`: A secret key for JWT token generation.

## Running the Application

1. Start the server:

   ```bash
   npm start
   ```

   The server will start on the specified port (default is 3000).

## API Endpoints

### User Authentication

- **Register**: `POST /api/v1/user/signup`
  
  Request body:
  ```json
  {
    "email": "email@mail.com",
    "password": "examplePassword"
  }
  ```

- **Login**: `POST /api/v1/user/login`
  
  Request body:
  ```json
  {
    "email": "email@email.com",
    "password": "examplePassword"
  }
  ```

  ### Rest API Endpoints

  - **GET**: `POST /api/v1/user`

    Returns a list of all users.
    
    - **POST**: `POST /api/v1/user`

    Add a new user into database.

    - **GET**: `POST /api/v1/user/:id`

    Get a specific user by id.

    - **PUT**: `POST /api/v1/user`

    Update a specific user by id.

    - **DELETE**: `POST /api/v1/user`

    Delete a user by id.

### Account Management

- **Get Account Dashboard**: `GET /dashboard`
  
  * Requires a valid JWT token in order to access this endpoint. If not, user is redirected to /form
  * It returns an HTML file with dashboard layout.
  
- **Get Login/Register form**: `GET /form`
  *  It returns an HTML file with login/register form.
  *  
## Authentication

This application uses JWT for authentication. After a successful login, the server returns a JWT token, which should be included in a cookie.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to this project by creating pull requests, submitting issues, or suggesting improvements!
