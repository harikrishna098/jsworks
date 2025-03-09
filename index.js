// Get elements from the DOM
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-items");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");

// Function to get expenses from localStorage
function getExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

// Function to save expenses to localStorage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render the expenses
function renderExpenses() {
    const expenses = getExpenses();
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category} 
            <button class="delete-btn" onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(li);
    });
}

// Handle form submission
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;
    const category = categoryInput.value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Get existing expenses and add the new one
    const expenses = getExpenses();
    expenses.push({ amount, description, category });
    saveExpenses(expenses);

    // Clear input fields and re-render the list
    amountInput.value = '';
    descriptionInput.value = 'movie';
    categoryInput.value = 'personal';
    renderExpenses();
});

// Function to remove an expense
function removeExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
}

// Initial render of expenses
renderExpenses();
