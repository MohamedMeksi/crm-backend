import User from '../models/user.model.js';
import Lead from '../models/lead.model.js';

// Obtenir les statistiques du tableau de bord
export const getDashboardStats = async (req, res) => {
  try {
    const leadsInProgress = await Lead.countDocuments({ status: { $ne: 'COMPLETED' } });
    const leadsCompleted = await Lead.countDocuments({ status: 'COMPLETED' });
    const leadsCanceled = await Lead.countDocuments({ status: 'CANCELED' });

    res.json({
      leadsInProgress,
      leadsCompleted,
      leadsCanceled,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des statistiques' });
  }
};

// Obtenir la liste des managers
export const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: 'manager' });
    res.json(managers);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des managers' });
  }
};

// Créer un nouveau manager
export const createManager = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newManager = new User({
      name,
      email,
      password,
      role: 'manager',
    });

    await newManager.save();
    res.status(201).json(newManager);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la création du manager' });
  }
};

// Mettre à jour un manager
export const updateManager = async (req, res) => {
  const { managerId } = req.params;
  const { name, email, password } = req.body;

  try {
    const manager = await User.findById(managerId);

    if (!manager) {
      return res.status(404).json({ message: 'Manager non trouvé' });
    }

    manager.name = name || manager.name;
    manager.email = email || manager.email;
    manager.password = password || manager.password;

    await manager.save();
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du manager' });
  }
};

// Supprimer un manager
export const deleteManager = async (req, res) => {
  const { managerId } = req.params;

  try {
    const manager = await User.findByIdAndDelete(managerId);

    if (!manager) {
      return res.status(404).json({ message: 'Manager non trouvé' });
    }

    res.json({ message: 'Manager supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du manager' });
  }
};

// Obtenir tous les leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des leads' });
  }
};

// Créer un nouveau lead
export const createLead = async (req, res) => {
  const { contactName, contactEmail, companyName, status, managerId } = req.body;

  try {
    const newLead = new Lead({
      contactName,
      contactEmail,
      companyName,
      status: status || 'PENDING',
      managerId,
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la création du lead' });
  }
};

// Mettre à jour un lead
export const updateLead = async (req, res) => {
  const { leadId } = req.params;
  const { status, notes } = req.body;

  try {
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead non trouvé' });
    }

    lead.status = status || lead.status;
    lead.notes = notes || lead.notes;

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du lead' });
  }
};

// Supprimer un lead
export const deleteLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    const lead = await Lead.findByIdAndDelete(leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead non trouvé' });
    }

    res.json({ message: 'Lead supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du lead' });
  }
};
