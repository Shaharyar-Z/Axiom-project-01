// Get DOM Elements 
const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

const selectCurrency = document.getElementById('select-currency')
const allRates = document.getElementById('rates-text')


//Fetch Exchange rates

function calculate() {
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/241d13dc13449dd721b8d6bb/pair/${currencyOneCode}/${currencyTwoCode}`)
        .then(res => res.json())
        .then(data => {
            const conversionRate = (data.conversion_rate).toFixed(2);
            rate.innerText = `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;

            const amount2 =  (new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyTwoCode }).format((amountCurrencyOne.value * conversionRate).toFixed(2)));

            amountCurrencyTwo.value = amount2; 
        });
};
// Swap Func
function swapFunc() {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;

    calculate();
}
// Exhcange Rates func
function exchnageRates() { 
    const selectedcurrency = selectCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/241d13dc13449dd721b8d6bb/latest/${selectedcurrency}`)
        .then(res => res.json())
        .then(data => {
            const ratesEnt = data.conversion_rates;
            
            const keys = Object.keys(ratesEnt)

            keys.forEach((key) => {
                const newDiv = document.createElement("div");
                newDiv.classList.add('element');
                newDiv.innerHTML = `${key} : ${ratesEnt[key]}`
                allRates.appendChild(newDiv)
            })
            
        })
        
    
}


//Event Listner
currencyOne.addEventListener('change', calculate);
amountCurrencyOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountCurrencyTwo.addEventListener('input', calculate);
swap.addEventListener('click', swapFunc);

selectCurrency.addEventListener('change',exchnageRates)
