import * as creatorRequestModel from '../models/creatorRequestModel.js';
import * as userModel from '../models/userModel.js';

export const submitCreatorRequest = async (req, res) => {
  try {
    const { sample_work_link, message } = req.body;

    if (!sample_work_link || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if user already has a pending request
    const existingRequest = await creatorRequestModel.getRequestByUserId(req.user.id);
    if (existingRequest && existingRequest.status === 'pending') {
      return res.status(400).json({ error: 'You already have a pending creator request' });
    }

    const request = await creatorRequestModel.createCreatorRequest(req.user.id, sample_work_link, message);
    res.status(201).json({ message: 'Request submitted successfully', request });
  } catch (err) {
    console.error('Submit request error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await creatorRequestModel.getPendingRequests();
    res.json(requests);
  } catch (err) {
    console.error('Get requests error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await creatorRequestModel.getAllRequests();
    res.json(requests);
  } catch (err) {
    console.error('Get all requests error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await creatorRequestModel.getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await creatorRequestModel.approveRequest(id);
    const user = await userModel.getUserById(request.user_id);

    res.json({ message: 'Request approved', user });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await creatorRequestModel.getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await creatorRequestModel.rejectRequest(id);
    res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('Reject error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyRequest = async (req, res) => {
  try {
    const request = await creatorRequestModel.getRequestByUserId(req.user.id);
    res.json(request || null);
  } catch (err) {
    console.error('Get my request error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
