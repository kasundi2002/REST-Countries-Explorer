import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/users/favorites
export const getFavorites = async (req, res) => {
  console.log('Fetching favorites for user:', req.user._id);
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
    console.log('Fetched favorites:', user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ POST /api/users/favorites
export const addFavorite = async (req, res) => {
  const { cca3, name, flag } = req.body;
  try {
    const user = await User.findById(req.user._id);

    const alreadyExists = user.favorites.some((fav) => fav.cca3 === cca3);
    if (alreadyExists) {
      return res.status(400).json({ message: 'Country already in favorites' });
    }

    user.favorites.push({ cca3, name, flag });
    await user.save();

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (fav) => fav.cca3 !== req.params.cca3
    );
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

