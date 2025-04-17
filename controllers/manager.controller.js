import Lead from '../models/lead.model.js';

export const getMyLeads = async (req, res) => {
  const leads = await Lead.find({ managerId: req.user.id });
  res.json(leads);
};

export const updateLeadStatusOrNotes = async (req, res) => {
  const lead = await Lead.findOne({ _id: req.params.id, managerId: req.user.id });
  if (!lead) return res.status(403).json({ message: "Ce lead ne vous appartient pas" });

  const { status, notes } = req.body;
  if (status) lead.status = status;
  if (notes) lead.notes = notes;

  await lead.save();
  res.json(lead);
};
