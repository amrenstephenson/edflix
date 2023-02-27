import express from 'express';
import APIController from '../controllers/api-controller.js';

const router = express.Router();
const apiController = new APIController();

router.get('/artifacts', apiController.getArtifacts);

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

export default router;
