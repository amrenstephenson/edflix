import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

router.get('/artifacts', apiController.getArtifacts);

export default router;
