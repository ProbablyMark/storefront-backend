# Storefront Backend Project

- a backend providing end points for interactions with storefront client

# Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# to install and run (and other useful scripts)

- Install: `npm install`
- create database: `db-migrate up`
- Build: `npm run tsc`
- Lint: `npm run lint`
- Prettify: `npm run prettify`
- Run unit tests: `npm run test`
- Start server: `npm start`

- note that you would like to create a user then login to use the token generated for further use of the endpoints

-to create the database : `
CREATE USER <enter user name>;
CREATE DATABASE  db;


`


# env variabls needed for the udacity submission
`POSTGRES_HOST=localhost
POSTGRES_DB=db
POSTGRES_USER= #### /// created user
POSTGRES_PASSWORD= ###### /// created password 
 
ACCESS_SECRET_KEY=######  /// any   key you want
`


# content

- note some endpoints will need to add bearer token in the auth header that will be achieved by creating a new user then logging in to generate a token as follows

log in end point :

- `/users/login` :a Post request to log in and will return a jwt token, further data will be needed in the request body as such > {
  "userId":1,
  "password":"1234"

}

user end points :

- `/users/newUser` :a Post request to create a new user further data will be needed in the request body as such > {
  "firstName":"name",
  "lastName":"name2",
  "password" :"1234"
  }

- `/users/showUser/:userId`: a Get request to show a specific user using its id , token will be needed to be added in the auth headers and can be generated by loging in
- `/users/index`: a Get request to show all users using , token will be needed to be added in the auth headers and can be generated by loging in

Products end points :

- `/products/newProduct`: a post request to create a new product, further data will be needed in the request body as such >{
  "name":"product-name",
  "price":56,
  "category" :"stuff"
  }
  , token will be needed to be added in the auth headers and can be generated by loging in

- `/products/showProduct/:productId`: a Get request to show a specific product useing its id , token will be needed to be added in the auth headers and can be generated by loging in

- `/products/category/:category`: a Get request to show all products in specific category, token will be needed to be added in the auth headers and can be generated by loging in

Orders end points :

- `/orders/newOrder`: a post request to create a new order, further data will be needed in the request body as such >{
  "userId":1
  }
  , token will be needed to be added in the auth headers and can be generated by loging in

  - `/orders/currentOrder/:id`: a Get request to show a specific order useing its id , token will be needed to be added in the auth headers and can be generated by loging in

  - `/orders/yourOrders/:userId`: a Get request to show all orders in specific user, token will be needed to be added in the auth headers and can be generated by loging in

  - `/orders/addProduct`: a post request to add a new product to an order, further data will be needed in the request body as such >{
    "orderId":1,
    "productId":1

}
, token will be needed to be added in the auth headers and can be generated by loging in

- `/orders/removeProduct`: a post request to remove a product to an order, further data will be needed in the request body as such >{
  "orderId":1,
  "productId":1

}
, token will be needed to be added in the auth headers and can be generated by loging in
