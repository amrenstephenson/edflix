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
 *           description: The book author
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
