
const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const handleUserSignup = require('./src/handleUserSignup/signup')
const handleUserSignin = require('./src/handleSignin/handleSignin')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express') 
const swaggerJsDoc = require('swagger-jsdoc')
const User = require('./src/models/User')
const handleCreateList = require('./src/handleCreateList/handleCreateList')
const handleAddToList = require('./src/handleAddToLIst/handleAddToList')
const handleDeleteTask = require('./src/handleDeleteTask/handleDeleteTask')
const handleUpdateTask = require('./src/handleUpdateTask/handleUpdateTask')
const handleUpdateList = require('./src/handleUpdateList/handleUpdateList')
const handleDeleteList = require('./src/handleDeleteList/handleDeleleList')
global.Promise = mongoose.Promise
mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true }, () => {
console.log('connected to mongodb')
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(helmet())
app.use('/todoapi', router)
let port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log('listening on port 3000')
})
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Todo Api ',
      contact: {
        name: 'Adewumi Sunkanmi',
        email: 'sunkanmiadewumi1@gmail.com',
        phone_number: '0703185081'
      },
      description: `Todo app api to respond to all request from the todo client app.
      `,
      servers: ['https://todo-api-241.herokuapp.com/']
    }

  },
  apis: ['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

router.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/**
* @swagger
* /signup :
*    post:
*       tags:
*         - Handles signing up a user
*
*       description:  >
*           This endpoint is used to signup a user ,
*           this would return a status 200 with user if user was signed up and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/signup', (req, res) => {
  handleUserSignup(req, res, User)
})






/**
* @swagger
* /signin :
*    post:
*       tags:
*         - Handles signing in a user
*
*       description:  >
*           This endpoint is used to signin a user ,
*           this would return a status 200 with user if user was signin and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/signin', (req, res) => {
  handleUserSignin(req, res, User)
})






/**
* @swagger
* /create-list/:id :
*    post:
*       tags:
*         - Handles creating a list
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*
*       description:  >
*           This endpoint is used to create  a list using the user id ,
*           this would return a status 201 if list was added and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/create-list/:id', (req, res) => {
  handleCreateList(req, res, User)
})




/**
* @swagger
* /add-task/:id/:listId :
*    post:
*       tags:
*         - Handles add a task to a list
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*         - name : listId
*           description: the list id
*           required: true
*
*       description:  >
*           This endpoint is used to add a task to a list using the user id and list id,
*           this would return a status 201 if task was added and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/add-task/:id/:listId', (req, res) => {
  handleAddToList(req, res, User)
})




/**
* @swagger
* /delete-task/:id/:listId/:taskId :
*    delete:
*       tags:
*         - Handles deleting a task
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*         - name : listId
*           description: the list id
*           required: true
*         - name : taskId
*           description: the task id
*           required: true
*
*       description:  >
*           This endpoint is used to delete a task using the user id, list id and task id,
*           this would return a status 201 if task was deleted and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.delete('/delete-task/:id/:listId/:taskId', (req, res) => {
  handleDeleteTask(req, res, User)
})



/**
* @swagger
* /update-task/:id/:listId/:taskId :
*    post:
*       tags:
*         - Handles updating a task
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*         - name : listId
*           description: the list id
*           required: true
*         - name : taskId
*           description: the task id
*           required: true
*
*       description:  >
*           This endpoint is used to update a task using the user id ,list id and task id,
*           this would return a status 201 if task was updated and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/update-task/:id/:listId/:taskId', (req, res) => {
  handleUpdateTask(req, res, User)
})
/**
* @swagger
* /update-list/:id/:listId :
*    post:
*       tags:
*         - Handles updating a list
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*         - name : listId
*           description: the list id
*           required: true
*
*       description:  >
*           This endpoint is used to update list using the user id and list id,
*           this would return a status 201 if list was updated and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.post('/update-list/:id/:listId', (req, res) => {
  handleUpdateList(req, res, User)
})
/**
* @swagger
* /delete-list/:id/:listId :
*    delete:
*       tags:
*         - Handles deleting a list
*       parameters:
*         - name : id
*           description: user id for list owner
*           required: true
*         - name : listId
*           description: the list id
*           required: true
*
*       description:  >
*           This endpoint is used to delete list using the user id and list id,
*           this would return a status 201 if list was deleted and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and status success is return
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.delete('/delete-list/:id/:listId', (req, res) => {
  handleDeleteList(req, res, User)
})
/**
* @swagger
* /get-user/:id :
*    get:
*       tags:
*         - Handles fetching a particular user
*       parameters:
*         - name : id
*           description: This is the unique identifier that would be used to query a user from the database
*           required: true
*
*       description:  >
*           This endpoint returns a particular user object based on the id that was passed as a parameter,
*           this would return a status 200 if a user was found and 400 if an error occured
*       responses:
*         '200':
*             description:
*                The request is succesfull and the user is returned
*             content:
*                application/json
*         '400':
*             description: An error occured
*
*         '500':
*             description: An internal server Error occured
*
*
*/
router.get('/get-user/:id',(req, res) => {
  handleDeleteList(req, res, User)
})









