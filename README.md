# Blog Project Backend

[Live Link](https://blog-project-swart-ten.vercel.app/)

## Overview

This project is the backend for a blogging platform where users can write, update, and delete their blogs. The system has two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Features

- CRUD operations for blogs
- Search, sort, and filter functionalities for blogs
- Secure authentication and role-based access control
- Admin functionalities for managing users and blogs

## Technologies Used

- **Programming Language:** TypeScript
- **Runtime** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/riasat01/blog-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-project
   ```
3. Install dependencies:
   ```bash
   npm i
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DB_URL=<your_mongodb_url>
     PORT=<port_number_you_want_to_run_this_project>
     NODE_ENV=<development or production (it is recommended to use development if you are just exploring the project)>
     JWT_ACCESS_SECRET=<your jsonwebtoken secret>
     BCRYPT_SALT_ROUNDS=<number of salt rounds>
     ```

## Usage

1. Start the development server:
   ```bash
   npm run start:dev
   ```
2. Access the server at `http://localhost:<your port number>`.

## API Endpoints

- **Users**

    - `POST /api/auth/register` - Register user
    - `POST /api/auth/login` - Login user

- **Blogs**

  - `GET /api/blogs` - Get all products
  - `POST /api/blogs` - Create a new blog
  - `PATCH /api/blogs/:blogId` - Update a blog by ID
  - `DELETE /api/blogs/:blogId` - Delete a blog by ID

- **Admin**
  - `DELETE /api/admin/blogs/:blogId` - Admin to delete a blog by Id
  - `GET /api/admin/users/:userId/block` - Admin to block a use by Id
