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
 */

/**
 * @swagger
 * tags:
 *   name: Artifacts
 *   description: The artifacts managing API
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

router.get('/recommendations', apiController.getRecommendations);

router.get('/logout', apiController.logout);

router.post('/login', apiController.login);

router.post('/register', apiController.register);

router.get('/artifact/:id', apiController.getArtifact);

router.get('/recommendations/', apiController.getRecommendations);

router.post('/login', apiController.login);

router.post('/register', apiController.register);

router.get('/ratings/global/:id', apiController.getGlobalRatings);

router.get('/ratings/get/:id', apiController.getRating);

router.post('/ratings/set', apiController.setRating);

router.post('/ratings/remove', apiController.removeRating);

router.get('/user', apiController.getUser);

router.get('/user/ratings', apiController.getUserRatings);

router.get('/journal', apiController.getJournal);

router.post('/journal/edit', apiController.editJournal);

router.post('/user/edit', apiController.editUser);

export default router;
