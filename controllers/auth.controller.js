import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Vérification si tous les champs sont fournis
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérification si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Sauvegarde de l'utilisateur
    await newUser.save();

    // Génération du token JWT
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Utilisateur créé avec succès', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  try {
    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Compare le mot de passe fourni avec celui stocké dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Génère un token JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Renvoie le token et quelques informations sur l'utilisateur
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};