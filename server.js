const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Expense = require('./server/models/Expense');

const app = express();
app.use(express.json());  // To parse JSON request bodies
app.use(cors());

// Serve static files (HTML, CSS, JS)
// app.use(express.static(path.join(__dirname, 'Client')));  // 'public' is where your HTML, CSS, and JS files will be placed

// MongoDB Atlas connection (replace with your MongoDB URL)
mongoose.connect('mongodb+srv://haseenakathak23:Haseena0786@cluster0.srkqg.mongodb.net/ExpenseDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));



// Routes
// Get all expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/',async(request,response)=>{
    response.send('hello haseena')
})

// Add a new expense
app.post('/api/expenses/add', async (req, res) => {
    try {
        console.log(req.body);
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error adding expense' });
    }
});

// Serve frontend
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Client', 'index.html'));  // Serving your HTML file
// });

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
