/* eslint-disable max-len */
import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

/**
 * @swagger
 * components:
 *   schemas:
 *     ShortArtifact:
 *       type: object
 *       required:
 *         - Artifact_id
 *         - Artifact_Name
 *         - Topic
 *       properties:
 *         Artifact_id:
 *           type: integer
 *           description: The auto-generated id of the artifact
 *         Artifact_Name:
 *           type: string
 *           description: The artifact name
 *         ThumbnailURL:
 *           type: string
 *           description: The artifact's thumbnail image URL
 *         Topic:
 *           type: string
 *           description: The topic the artifact belongs to
 *         avg_rating:
 *           type: float
 *           description: The artifact's average rating
 *       example:
 *         Artifact_id: 1316
 *         Artifact_Name: Machine Learning for Dummies
 *         ThumbnailURL: ...
 *         Topic: Artificial Intelligence
 *         avg_rating: 4.5
 *     Artifact:
 *       type: object
 *       required:
 *         - Artifact_id
 *         - Artifact_Name
 *         - Topic
 *       properties:
 *         Artifact_id:
 *           type: integer
 *           description: The auto-generated id of the artifact
 *         Artifact_Name:
 *           type: string
 *           description: The artifact name
 *         ThumbnailURL:
 *           type: string
 *           description: The artifact's thumbnail image URL
 *         Topic:
 *           type: string
 *           description: The topic the artifact belongs to
 *         ArtifactURL:
 *           type: string
 *           description: The external URL to the artifact's resource
 *         Description:
 *           type: string
 *           description: The artifact's description as a HTML string
 *         Type:
 *           type: string
 *           enum: [Courseware, Resources, Software]
 *           description: The type of artifact
 *         ImageURL:
 *           type: string
 *           description: The artifact's main image URL
 *       example:
 *         Artifact_id: 1316
 *         Artifact_Name: Machine Learning for Dummies
 *         ThumbnailURL: ...
 *         Topic: Artificial Intelligence
 *         avg_rating: 4.5
 *         ArtifactURL: ...
 *         Description: <p>This book gives you insights...
 *         Type: Resources
 *         ImageURL: ...
 *     User:
 *       type: object
 *       required:
 *         - User_id
 *         - User_name
 *         - Email
 *       properties:
 *         User_id:
 *           type: integer
 *           description: The auto-generated id of the account
 *         User_name:
 *           type: string
 *           description: The account's username
 *         Email:
 *           type: string
 *           description: The user's email address
 *         ProfilePicture:
 *           type: string
 *           description: The image URL of the user's profile picture
 *       example:
 *         User_id: 20
 *         User_name: FakeUser_19_Capstone
 *         Email: fake_19.fake@gmail.com
 *         ProfilePicture: ...
 */

/**
 * @swagger
 * tags:
 *   - name: Artifacts
 *     description: The artifacts managing API
 *   - name: Accounts
 *     description: The account management API
 */

/**
 * @swagger
 * /artifacts:
 *   get:
 *     summary: Returns the list of all the artifacts
 *     tags: [Artifacts]
 *     responses:
 *       200:
 *         description: The list of artifacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShortArtifact'
 */
router.get('/artifacts', apiController.getArtifacts);

/**
 * @swagger
 * /artifacts/{topic}:
 *   parameters:
 *     - in: path
 *       name: topic
 *       schema:
 *         type: string
 *       required: true
 *       description: The artifact topic
 *   get:
 *     summary: Returns the list of all the artifacts belonging to a particular topic
 *     tags: [Artifacts]
 *     responses:
 *       200:
 *         description: The list of artifacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShortArtifact'
 *       500:
 *         description: Some error happened
 */
router.get('/artifacts/:topic', apiController.getPopularArtifacts);

/**
 * @swagger
 * /artifact/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: The artifact id
 *   get:
 *     summary: Returns the full details of a particular artifact by id
 *     tags: [Artifacts]
 *     responses:
 *       200:
 *         description: The full artifact details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artifact'
 *       500:
 *         description: Some error happened
 */
router.get('/artifact/:id', apiController.getArtifact);

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Returns the list of all the user's recommended artifacts
 *     tags: [Artifacts]
 *     parameters:
 *       - name: edflixSessionToken
 *         in: cookie
 *         description: Session token cookie
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The list of recommended artifacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShortArtifact'
 */
router.get('/recommendations', apiController.getRecommendations);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Clears the user's current session token and logs them out of their account
 *     tags: [Accounts]
 *     parameters:
 *       - name: edflixSessionToken
 *         in: cookie
 *         description: Session token cookie
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The user was successfully logged-out
 *       500:
 *         description: An error occurred
 */
router.get('/logout', apiController.logout);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate the user and set the current session token
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The account username
 *               password:
 *                 type: string
 *                 description: The account password
 *               remember:
 *                 type: boolean
 *                 description: True if the user's session should persist across browser sessions
 *             required:
 *               - userName
 *               - password
 *               - remember
 *             example:
 *               userName: FakeUser_0_IBM Cloud
 *               password: password1
 *               remember: true
 *     responses:
 *       200:
 *         description: The user was successfully logged-in
 *       500:
 *         description: An error occurred
 */
router.post('/login', apiController.login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new Edflix account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The account email
 *               userName:
 *                 type: string
 *                 description: The account username
 *               password:
 *                 type: string
 *                 description: The account password
 *             required:
 *               - email
 *               - userName
 *               - password
 *             example:
 *               email: example@example.com
 *               userName: FakeUser_0_IBM Cloud
 *               password: password1
 *     responses:
 *       200:
 *         description: The user was successfully logged-in
 *       500:
 *         description: An error occurred
 */
router.post('/register', apiController.register);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the user's account information
 *     tags: [Accounts]
 *     parameters:
 *       - name: edflixSessionToken
 *         in: cookie
 *         description: Session token cookie
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The user's account information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: The user is not logged in or the session token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The relevant error code
 *               example:
 *                 code: UNKNOWN_USERID
 */
router.get('/user', apiController.getUser);

/**
 * @swagger
 * /user/edit:
 *   post:
 *     summary: Edit an existing Edflix account's details
 *     tags: [Accounts]
 *     parameters:
 *       - name: edflixSessionToken
 *         in: cookie
 *         description: Session token cookie
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The account email
 *               username:
 *                 type: string
 *                 description: The account username
 *             required:
 *               - email
 *               - username
 *             example:
 *               email: example@example.com
 *               username: FakeUser_0_IBM Cloud
 *     responses:
 *       200:
 *         description: The account details were successfully updated
 *       500:
 *         description: An error occurred
 */
router.post('/user/edit', apiController.editUser);

router.get('/ratings/global/:id', apiController.getGlobalRatings);

router.get('/ratings/get/:id', apiController.getRating);

router.post('/ratings/set', apiController.setRating);

router.post('/ratings/remove', apiController.removeRating);

router.get('/user/ratings', apiController.getUserRatings);

router.get('/journal', apiController.getJournal);

router.post('/journal/edit', apiController.editJournal);

export default router;
