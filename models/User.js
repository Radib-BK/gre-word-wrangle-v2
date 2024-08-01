import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  gwwUserId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  highestStreak: { 
    type: Number, 
    default: 0 
  },
  wrongGuesses: [
    {
      word: { type: String },
      meaning: { type: String }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

// Add a pre-save hook to update the lastUpdated field
userSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
