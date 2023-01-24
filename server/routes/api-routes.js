import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

router.get('/artifacts', apiController.getArtifacts);

router.get('/artifacts', apiController.getArtifacts_id);

router.get('/artifacts', apiController.getArtifacts_Name);

router.get('/api/ratings/get/artifact-id', apiController.getArtifacts_avag);

router.get('/recommendations/get/<user_id>', apiController.recommendations_id);

router.post('/login', apiController.login);

router.post('/register ', apiController.register);


export default router;
