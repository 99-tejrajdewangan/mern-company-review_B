import Company from '../models/Company.js';
import Review from '../models/Review.js';

// @desc    Create a new company (protected)
// @route   POST /api/companies
export const addCompany = async (req, res) => {
  try {
    const { name, location, foundedOn, city, logo, description } = req.body;
    
    const company = await Company.create({
      name,
      location,
      foundedOn,
      city,
      logo,
      description,
      createdBy: req.user._id
    });
    
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all companies with search, filter, and average ratings
// @route   GET /api/companies
export const getCompanies = async (req, res) => {
  try {
    const { name, city } = req.query;
    const filter = {};
    
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }
    
    const companies = await Company.find(filter).sort({ createdAt: -1 });
    
    // Get average ratings for each company
    const companiesWithRatings = await Promise.all(
      companies.map(async (company) => {
        const reviews = await Review.find({ companyId: company._id });
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;
        return {
          ...company.toObject(),
          averageRating: parseFloat(avgRating.toFixed(1)),
          reviewCount: reviews.length
        };
      })
    );
    
    res.json(companiesWithRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single company with average rating
// @route   GET /api/companies/:id
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    const reviews = await Review.find({ companyId: company._id });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
    
    res.json({
      ...company.toObject(),
      averageRating: parseFloat(avgRating.toFixed(1)),
      reviewCount: reviews.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};