//  Get DOM Element

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');


// Initialize User data arry
let data = [];

async function getRandomUser() {
    // 
    const res = await fetch('https://randomuser.me/api');
        
    const data = await res.json();

    const user = data.results[0]

    // Create the New User
    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random() * 1000000)
    }
    //add new user into data array
    addData(newUser);
};

//  Function to add user data into user array
function addData(newUser) {

    data.push(newUser);
    // Update the DOM to display the user in the data array
    updateDom();
}

// Function to double the Money of all users 
function doubleMoney() {
    data = data.map(user => {
        return {...user,balance : user.balance * 2};
    });
    // update DOM
    updateDom();
}

// Function to Filter the Millionaiers USers
function filterUsers() {
    data = data.filter(user => user.balance >= 1000000);
    // update Dom
    updateDom();
}

// Function to sort by balance using compare 
function sortByBalance() {
    // using compare func 
    data = data.sort((a, b) => b.balance - a.balance)
    // update DOM
    updateDom();
}

// Fnnction to sum of all balance 
function totalBalance() {
    // updat DOM
    updateDom();
    const balance = data.reduce((acc, user) => (acc += user.balance), 0);
    // create div for the balance
    const balanceElement = document.createElement('div');
    balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`
    main.appendChild(balanceElement);
}


// Function to format random to dollar
function formatNumberToDollar(number) {
   return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//  Function to update the Ui data to the user data array
function updateDom(userData = data) {
    
    main.innerHTML = '<h2><strong>User</strong> Wealth</h2>'

    userData.forEach(user => {
        const userDiv = document.createElement('div');
    
        userDiv.classList.add('user');
        
        userDiv.innerHTML = `<strong>${user.name}</strong> 
                            ${formatNumberToDollar(user.balance)}`

        main.appendChild(userDiv)
    });
}

// Event Listner
// 1- Listen for click on add user
addUserBtn.addEventListener('click', getRandomUser);

// 2- Listin for click to double the money
doubleBtn.addEventListener('click', doubleMoney);

// 3- Listin for click to Filter the millionaires
filterBtn.addEventListener('click', filterUsers);

// 4- Listin for click to sort by balance
sortBtn.addEventListener('click', sortByBalance);

// 5- Listin for click to sort by balance
sumBtn.addEventListener('click', totalBalance);

// Create a random user
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();