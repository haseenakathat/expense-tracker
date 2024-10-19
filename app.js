
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalCost = document.getElementById('total-cost');

let total = 0;

// Form submit event to add expense
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const expense = { category, amount, date, description };


        // Log the expense before sending
        console.log('Submitting Expense:', expense);

        
    // Backend POST request to add expense
    const response = await fetch('http://localhost:5000/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    });

    const newExpense = await response.json();
    console.log('New Expense Added:', newExpense); // Response ko log karein


    if(response.ok){
    const li = document.createElement('li');
    li.innerText = `${newExpense.category}: $${newExpense.amount} on ${newExpense.date} (${newExpense.description})`;
    expenseList.appendChild(li);

    total += amount;
    totalCost.innerText = total.toFixed(2);

    form.reset();
    }else{
        console.error('Expense add karne mein fail:', newExpense); 
    }
});

// Fetch all expenses on page load
async function fetchExpenses() {
    const response = await fetch('http://localhost:5000/api/expenses');
    const expenses = await response.json();

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerText = `${expense.category}: $${expense.amount} on ${expense.date} (${expense.description})`;
        expenseList.appendChild(li);

        total += expense.amount;
        totalCost.innerText = total.toFixed(2);
    });
}

fetchExpenses();




