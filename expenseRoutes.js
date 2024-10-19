const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new expense
router.post('/add', async (req, res) => {
    try {
        const { category, amount, date, description } = req.body;
        const newExpense = new Expense({ category, amount, date, description });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add expense' });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

module.exports = router;
