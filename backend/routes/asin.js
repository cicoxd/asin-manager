const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Asin = require('../models/Asin');

router.post('/', auth, async (req, res) => {
    try {
        const asin = new Asin({
            ...req.body,
            user: req.user.id
        });
        await asin.save();
        res.status(201).json(asin);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const asins = await Asin.find({ user: req.user.id });
        res.json(asins);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const asin = await Asin.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!asin) return res.status(404).json({ message: 'ASIN not found' });
        res.json(asin);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const asin = await Asin.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!asin) return res.status(404).json({ message: 'ASIN not found' });
        res.json({ message: 'ASIN deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;