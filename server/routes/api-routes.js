import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

router.get('/artifacts', apiController.getArtifacts);

router.get('/artifact/:id', apiController.getArtifact);

router.get('/ratings/get/:id', apiController.getArtifactRating);

router.get('/recommendations', apiController.getRecommendations);

router.post('/login', apiController.login);

router.post('/register', apiController.register);


export default router;
