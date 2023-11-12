# Simple Auth API with Express.js and MongoDB

## Overview

This project is a simple authentication API built using Express.js and MongoDB. It provides a basic foundation for implementing user authentication in your web applications.

## Features

User registration with email and password User login with token-based authentication Secure password hashing using bcrypt MongoDB for data storage

## Prerequisites

Before you begin, ensure you have the following:

- **MongoDB:** Make sure you have MongoDB installed and running. You can download MongoDB from [the official MongoDB website](https://www.mongodb.com/try/download).

- **Node.js:** This project requires Node.js version 20. You can download and install it from [the official Node.js website](https://nodejs.org/) **OR** use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to manage your Node.js versions. You can install nvm by following the instructions in the [official repository](https://github.com/nvm-sh/nvm).

- Global Installations

    Install the following npm packages:

    ```bash
    npm install -g nodemon ts-node prettier typescript
    ```

  - nodemon: Automatically restarts the server when changes are made.
  - ts-node: Allows you to directly run TypeScript files without transpiling.
  - prettier: Code formatter to maintain consistent code style.
  - typescript: Adds TypeScript support to the project.

## Configuration

Create a .env file at the project root with the following configurations:

```bash
MONGO_URI=""
SERVER_PORT=""
TOKEN_SECRET_KEY=""
```

Update the values accordingly:

- MONGO_URI: MongoDB connection URI.
- SERVER_PORT: Port number on which the server will run.
- TOKEN_SECRET_KEY: Secret key for JWT token generation.

## Installation

- Clone the repository:

    ```bash
    git clone https://github.com/ravi-more/simple-auth-api-express-js-mongodb.git
    ```

- Navigate to the project directory:

    ```bash
    cd simple-auth-api-express-js-mongodb
    ```

- Install dependencies:

    ```bash
    npm install
    ```

- Start the development server:

    ```bash
    nodemon
    ```

This uses nodemon to automatically restart the server when changes are made.

## Usage

Assuming your base URL is `localhost:9090`, you can use the following endpoints:

1. **User Login**

   - **Endpoint:** `{{baseUrl}}/auth/login`
   - **Method:** `POST`
   - **Request Body:**

    ```json
    {
        "email": "your-email@example.com",
        "password": "yourpassword"
    }
    ```

   This endpoint allows users to log in by providing their email and password.

2. **Create User**

   - **Endpoint:** `{{baseUrl}}/users/create`
   - **Method:** `POST`
   - **Request Body:**

   ```json
     {
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "mobile": "1234567890",
         "password": "yourpassword"
     }
     ```

   This endpoint allows you to create a new user by providing their first name, last name, email, mobile number, and password.

3. **Get User by ID**

   - **Endpoint:** `{{baseUrl}}/users/get/<userId>`
   - **Method:** `GET`
   - **Header:** Authorization: Bearer your-generated-token

   This endpoint allows you to retrieve user details by providing the specific user ID in the URL.

4. **Get All Users**

   - **Endpoint:** `{{baseUrl}}/users/get`
   - **Method:** `GET`
   - **Header:** Authorization: Bearer your-generated-token

   This endpoint allows you to retrieve details of all users.

5. **Update User by ID**

   - **Endpoint:** `{{baseUrl}}/users/update/<userId>`
   - **Method:** `PATCH`
   - **Header:** Authorization: Bearer your-generated-token
   - **Request Body:**

   ```json
     {
         "firstName": "UpdatedFirstName",
         "lastName": "UpdatedLastName",
         "email": "updated.email@example.com",
         "mobile": "9876543210"
     }
     ```

   This endpoint allows you to update user details by providing their user ID and the fields you want to update.

6. **Change User Password**

   - **Endpoint:** `{{baseUrl}}/users/change/password`
   - **Method:** `PATCH`
   - **Header:** Authorization: Bearer your-generated-token
   - **Request Body:**

    ```json
     {
         "currentPassword": "mypass1234",
         "newPassword": "mypass12345",
         "confirmNewPassword": "mypass12345"
     }
     ```

   This endpoint allows users to change their password by providing the current password, new password, and confirming the new password.

7. **Delete User by ID**

   - **Endpoint:** `{{baseUrl}}/users/delete/<userId>`
   - **Method:** `DELETE`
   - **Header:** Authorization: Bearer your-generated-token

   This endpoint allows you to delete a user by providing their user ID.

Make sure to replace `{{baseUrl}}` with the actual base URL you are using.

## Contributing

I welcome contributions from the community! If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## Acknowledgments

I want to express our gratitude to the open-source community for their valuable contributions and resources that have made this project possible.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
