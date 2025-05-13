import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      cca3: { type: String, required: true }, // country code
      name: { type: String },
      flag: { type: String }
    }
  ]
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
