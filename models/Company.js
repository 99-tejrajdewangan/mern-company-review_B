import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  foundedOn: {
    type: Date,
    required: [true, 'Founded date is required']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  logo: {
    type: String,
    required: [true, 'Logo URL is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Company', companySchema);