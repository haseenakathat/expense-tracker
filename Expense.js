// const mongoose = require('mongoose');

// const expenseSchema = new mongoose.Schema({
//     category: { type: String, required: true },
//     amount: { type: Number, required: true },
//     date: { type: String, required: true },
//     description: String
// });

// const Expense = mongoose.model('Expense', expenseSchema);
// module.exports = Expense;






// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String },
    description: { type: String, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
