// Get DOM elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money_credit');
const moneyDebit = document.getElementById('money_debit');
const list = document.getElementById('list');
const form = document.getElementById('addform');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');



let Transactions = [
    // { id: 1, reason: 'salary', amount: 5000 },
    // { id: 2, reason: 'Breakfast', amount: -500 },
    // { id: 3, reason: 'Lunch', amount: -1200 },
    // { id: 4, reason: 'Savings', amount: 15000 },
];

let transactions = Transactions;
populateUI();


// Function-
function displayTransaction(transaction) {
    const type = transaction.amount > 0 ? '+' : '';
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit')
    transactionLI.innerHTML = `
    ${transaction.reason} <span>${type}$${transaction.amount}</span>
    <button onclick="deleteTransaction(${transaction.id})" id='delete_btn' class="delete_btn">x</button>`
    list.appendChild(transactionLI)


};

function updateBalance() {
    const transactionAmounts = transactions.map(transaction => transaction.amount)
    const totalBalance = transactionAmounts.reduce((acum, amount) =>  acum += amount, 0)
    balance.innerText = `$${totalBalance}`
    const creditBalance = transactionAmounts
        .filter(amount => amount > 0)
        .reduce((acc,amount)=> acc += amount, 0)
        moneyCredit.innerText = `+$${creditBalance}`
    const debitBalance = transactionAmounts
        .filter(amount => amount < 0)
        .reduce((acc,amount)=> acc += amount, 0)
        moneyDebit.innerText = `$${debitBalance}`
};

function storeTransactions() {
    // const transactionArray = [];
    // transactionArray = [...transactions,...transactionArray]
    localStorage.setItem('transactions', JSON.stringify(transactions))
    // init()
};

function createID() {
    return Math.floor(Math.random() * 100000000000)
};

function addTransaction(e) {
    e.preventDefault();
    if (reason.value === '' || amount.value === '') {
        alert('Please Enter Valid Trasaction values')
    } else {
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        displayTransaction(transaction);
        updateBalance();

        storeTransactions()
        
        reason.value = '';
        amount.value = '';
    }
};

function deleteTransaction(id) {
    // Filter out the transaction with the provided id
    transactions = transactions.filter( transaction => transaction.id !== id );
    // Initialize the app again to update the DOM
    storeTransactions()
    init();
};

function populateUI() {
    const getTransactions = JSON.parse(localStorage.getItem('transactions'))
    // console.log('local');
    // console.log(getTransactions);
    if (getTransactions !== null && getTransactions.length > 0) {
        getTransactions.forEach(trans => {
            transactions.push(trans)
        })
    }
};

function init() {
    list.innerHTML = '';
    transactions.forEach(displayTransaction)
    updateBalance();
};
init()


// Event Listner
form.addEventListener('submit', addTransaction);