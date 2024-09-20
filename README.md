# Photo Order Application

This is a Node.js application built with TypeScript and MongoDB. It provides RESTful APIs to:

- Fetch a list of photo URLs from the Pixabay API.
- Create an order and store it in the MongoDB database.
- Retrieve all orders for a specific user.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** database local with "test" db and "orders" table.
- **Pixabay API Key** incert the key before using it in .env

## Installation

* Clone the repository.
* npm install
* add Pixabay API Key to .env
* you can run with npm run dev

## Endpoints

* GET http://localhost:3000/api/photos?count=10
* GET http://localhost:3000/api/orders/user/john_doe
* POST http://localhost:3000/api/orders
with json:
```
{
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "fullAddress": "123 Main St, Anytown, USA",
    "imageUrls": ["https://example.com/image1.jpg"],
    "frameColor": "black",
    "user": "john_doe"
}
```


