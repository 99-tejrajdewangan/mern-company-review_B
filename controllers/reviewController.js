import Review from '../models/Review.js';

// @desc    Add a new review
// @route   POST /api/reviews
export const addReview = async (req, res) => {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;
    
    const review = await Review.create({
      companyId,
      fullName,
      subject,
      reviewText,
      rating
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get reviews for a company with sorting
// @route   GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const { companyId, sort = 'date' } = req.query;
    
    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' });
    }
    
    let sortOption = {};
    switch (sort) {
      case 'date':
        sortOption = { createdAt: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'relevance':
        sortOption = { likes: -1, createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
    
    const reviews = await Review.find({ companyId }).sort(sortOption);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a review
// @route   POST /api/reviews/:reviewId/like
export const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.likes += 1;
    await review.save();
    
    res.json({ message: 'Review liked', likes: review.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};