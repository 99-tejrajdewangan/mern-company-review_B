import express from 'express';
import { addCompany, getCompanies, getCompanyById } from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Protected route (requires authentication)
router.post('/', protect, addCompany);

export default router;