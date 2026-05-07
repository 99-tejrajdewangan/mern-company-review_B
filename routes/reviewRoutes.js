import express from 'express';
import { addReview, getReviews, likeReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', addReview);
router.get('/', getReviews);
router.post('/:reviewId/like', likeReview);

export default router;