## **Project Introduction**

Todoshpere is a social media app that allows users to create todos and posts, and comment on posts. This project includes APIs for authentication, user management, todo management, post management, and comment management.

## **Features**

**Authentication:** Users can authenticate by sending a POST request with an email and password in the request body. Passwords are stored in the database with encrypted values. JWT authentication is used for user authorization, and tokens can be refreshed by the login API.

**User Management:** Users can be managed by sending HTTP requests to create, read, update, and delete user data. Admin can also edit other user details.

_Note_: A default admin user is automatically added when the server is started. The email and password of the default admin user can be modified through the configuration file **default.json**. An admin user can edit other user details, and only an admin can see or update the roles of a user. 

**Todo Management:** Todos can be managed by sending HTTP requests to create, read, update, and delete todo data.

**Post Management:** Posts can be managed by sending HTTP requests to create, read, update, and delete post data.

**Comment Management:** Comments can be managed by sending HTTP requests to create, read, update, and delete comment data.

**Caching:** Caching has been implemented for the users and posts GET APIs using the npm package memory-cache. However, caching could also have been done through Redis, which would improve performance and scalability.

**Mongodb Indexing:** Indexing has been done on different fields in MongoDB to improve query performance.

**Rate-Limiting:** Rate-limiting has been implemented to prevent abuse of the APIs.

**Postman Collection:** A Postman collection is included in the GitHub repository for easy API testing.
<a href="postman_collection.json" download>Click to View Postman Json File</a>

_Note_: To use the postman collection, modify the variables to add BASE_URL, ACCESS_TOKEN and USER_ID

## **Technologies Used**

*   Node.js
*   FeathersJs
*   Express.js
*   MongoDB
*   Mongoose
*   bcrypt
*   jsonwebtoken
*   memory-cache

## **Setup**

To set up the project, follow these steps:

1.  Clone the repository to your local machine.
2.  Install the dependencies by running **npm install**.
3.  Create a .env file in the root folder based on .env_example, set up values of the variables based on example
5.  Start the server by running **npm start**.

## **API Documentation**

This documentation outlines the API endpoints available for managing users on TodoSphere. Please use Postman collection for testing Apis

### **Base URL**

**http://todosphere.ap-south-1.elasticbeanstalk.com**

## **Authentication**

Authentication is required to access the all API endpoints exception creating user and login. A valid JWT token must be included in the **Authorization** header of each request.

## **Login API**

Authentication can be done using the **/login** endpoint. A POST request is sent to the endpoint with a JSON body containing **strategy**, **email** and **password**. For authentication with email and password, strategy should be set as "local"

**Refresh Token**: to refresh token, call the api with JSON body containing **strategy** with value "jwt" and **accessToken**, with access token as its value obtained using above described method.

## **User API**

### **GET /users**

Retrieve a list of all users.

**Query Parameters:**

*   **firstName** (string, optional): Filter users by first name.
*   **lastName** (string, optional): Filter users by last name.
*   **email** (string, optional): Filter users by email.

**Response:**

*   **data** (array of objects): An array of user objects matching the query.
*   **limit** (number): The maximum number of results returned per page.
*   **skip** (number): The number of results skipped.
*   **total** (number): The total number of results matching the query.

### **GET /users/:id**

Retrieve a single user by ID.

**URL Parameters:**

*   **id** (string): The ID of the user to retrieve.

**Response:**

*   **data** (object): The user object.

### **POST /users**

Create a new user.

**Request Body:**

*   **firstName** (string, required): The user's first name.
*   **lastName** (string, required): The user's last name.
*   **email** (string, required): The user's email address.
*   **password** (string, required): The user's password.

**Response:**

*   **data** (object): The created user object.

### **PATCH /users**

Update a user.

**Request Body:**

*   **firstName** (string, required): The user's first name.
*   **lastName** (string, required): The user's last name.
*   **password** (string, required): The user's password.

**Response:**

*   **data** (object): The created user object.

## **Todo API**

### **GET /todo**

Retrieve a list of all todos.

**Query Parameters:**

*   **title** (string, optional): Filter todos by title.
*   **completed** (boolean, optional): Filter todos by completion status.
*   **$limit** (number): The maximum number of results to return per page.
*   **$skip** (number): The number of results to skip.

**Response:**

*   **data** (array of objects): An array of todo objects matching the query.
*   **total** (number): The total number of results matching the query.

### **GET /todo/:id**

Retrieve a single todo by ID.

**URL Parameters:**

*   **id** (string): The ID of the todo to retrieve.

**Response:**

*   **data** (object): The todo object.

### **POST /todo**

Create a new todo.

**Request Body:**

*   **title** (string, required): The title of the todo.
*   **description** (string, optional): The description of the todo.
*   **createdBy** (string, optional): The ID of the user who created the todo.

**Response:**

*   **data** (object): The created todo object.

### **PATCH /todo/:id**

Update an existing todo.

**URL Parameters:**

*   **id** (string): The ID of the todo to update.

**Request Body:**

*   **title** (string, optional): The updated title of the todo.
*   **description** (string, optional): The updated description of the todo.
*   **completed** (boolean, optional): The updated completion status of the todo.

**Response:**

*   **data** (object): The updated todo object.

### **DELETE /todo/:id**

Delete a todo by ID.

**URL Parameters:**

*   **id** (string): The ID of the todo to delete.

**Response:**

*   **data** (object): The deleted todo object.

## **Posts API**

All the routes for Posts API start with **/posts**.

### **GET /posts**

Get a list of all posts.

#### Parameters

*   **createdBy** - Filter posts by userId
*   **$skip -** Skip the given number of posts (optional, default: 0)
*   **$limit** - The maximum number of posts per page (optional, default: 10)

#### Response

*   **status** - HTTP status code
*   **data** - An array of posts objects
*   **total** - The total number of posts

### **GET /posts/:id**

Get a post by its ID.

#### Response

*   **status** - HTTP status code
*   **data** - A post object

### **POST /posts**

Create a new post.

#### Request

*   **title** - The title of the post
*   **body** - The body of the post

#### Response

*   **status** - HTTP status code
*   **data** - The created post object

### **PATCH /posts/:id**

Update a post by its ID.

#### Request

*   **title** - The title of the post
*   **body** - The body of the post

#### Response

*   **status** - HTTP status code
*   **data** - The updated post object

### **DELETE /posts/:id**

Delete a post by its ID.

#### Response

*   **status** - HTTP status code
*   **data** - deleted post

## **Comments API**

All the routes for Comments API start with **/comments**.

### **GET /comments**

Get a list of all comments.

#### Parameters

*   **postId -** filter by postId
*   **$skip -** Skip the given number of comments
*   **$limit** - The maximum number of comments per page (optional, default: 10)

#### Response

*   **status** - HTTP status code
*   **data** - An array of comment objects
*   **total** - The total number of comments

### **GET /comments/:id**

Get a comment by its ID.

#### Response

*   **status** - HTTP status code
*   **data** - A comment object

### **POST /comments**

Create a new comment.

#### Request

*   **postId** - The ID of the post the comment belongs to
*   **text** - The body of the comment

#### Response

*   **status** - HTTP status code
*   **data** - The created comment object

### **PATCH /comments/:id**

Update a comment by its ID.

#### Request

*   **body** - The body of the comment

### **DELETE /comments/:id**

Delete a comment by its ID.

#### Response

*   **status** - HTTP status code
*   **data** - The deleted comment object