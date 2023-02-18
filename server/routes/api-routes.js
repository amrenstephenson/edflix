import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

router.get('/artifacts', apiController.getArtifacts);

router.get('/artifacts/:topic', apiController.getPopularArtifacts);

router.get('/artifact/:id', apiController.getArtifact);

router.get('/ratings/get/:id', apiController.getArtifactRating);

router.get('/recommendations', apiController.getRecommendations);

router.get('/logout', apiController.logout);

router.post('/login', apiController.login);

router.post('/register', apiController.register);


router.get('/artifact/:id', apiController.getArtifact);

router.get('/ratings/get/:id', apiController.getArtifactRating);

router.get('/recommendations/', apiController.getRecommendations);

router.post('/login', apiController.login);

router.post('/register', apiController.register);

router.post('/ratings/new', apiController.postRating);

router.get('/user', apiController.getUser);

router.get('/journal', apiController.getJournal);

router.post('/journal/edit', apiController.JournalEdit);


export default router;
