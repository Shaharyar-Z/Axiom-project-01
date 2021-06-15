// Get DOM element
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultHeading = document.getElementById('result_heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected_meal');


// Functions

// Function to render Categories
function categoryData() {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => res.json())
        .then(data => {
            console.log(data.categories[0]);
            // Update result Heading
            resultHeading.innerHTML = `<h1>Categories</h1>`
            // Check if data return from API
            if (data.categories === null){
                resultHeading.innerHTML = `<h1>No result found</h1>`
            } else {
                meals.innerHTML = data.categories.map(meal =>
                    `<div class='meal'>

                    <img src="${meal.strCategoryThumb}" alt="${meal.strCategory}"/>

                    <div class='meal_info' data_mealId='${meal.idCategory}'>
                    <h3>${meal.strCategory}</h3>
                    </div>
                    </div>`
                ).join('')
            }
        })
};
categoryData();


// Function to search the meal
function searchMeal(e) {
    // prevent on form submittion
    e.preventDefault();
    // Get the value form input field
    let searchText = search.value;
    // Check if search input filed is empty
    if (searchText.trim()) {
        // Fetch data form API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                // Update result Heading
                resultHeading.innerHTML = `<h1>Search result for ${searchText}</h1>`
                // Check if no Data return from API
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h1>No result found for ${searchText}</h1>`
                } else {
                    meals.innerHTML = data.meals.map(meal =>
                        `<div class='meal'>

                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>

                        <div class='meal_info' data_mealId='${meal.idMeal}'>
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div>`
                    ).join('')
                }
            });
        // Clear the search input
        search.value = "";
    } else {
        alert('Please enter search keyword')
    }
    // Remove previous selected meal info
    selectedMeal.innerHTML = '';
};


// Function to get the detail of selected Meal
function getMeal(mealId) {
    // Clear Search result
    meals.innerHTML = '';
    // Clear result Heading
    resultHeading.innerHTML = '';
    // Array to hold Ingredients & measurements
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            displayMealDetails(meal);
        })
};
// Function to render meal detail in UI
function displayMealDetails(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++){
        // Check if ingredients exist
        if (meal[`strIngredient${i}`]) {
            // push all the ingredient into the array
            ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    };
    // Render data into Ui
    selectedMeal.innerHTML = `
    <div class='selected_meal_details'>
        <h1>${meal.strMeal}</h1>
        <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
        <div class='selected_meal_info'>
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class='selected_meal_instructions'>
            <p>${meal.strInstructions}</p>
            <h1>Ingredients</h1>
            <ul>
            ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>
    `;
};

// Function for generate random meal
function randomMeal() {
    // Clear Search result
    meals.innerHTML = '';
    // Clear result Heading
    resultHeading.innerHTML = '';
    // Remove previous selected meal info
    selectedMeal.innerHTML = '';

    // Get ramdon meal from API
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            const randomMeal = data.meals[0];
            displayRandomMeal(randomMeal);
        })
};
// Function to render random meal detail in UI
function displayRandomMeal(randomMeal) {
    const randomMealData = [];
    // Check if ingredients exist
    for (let j = 1; j <= 20; j++) {
        // push all the ingredient into the array
        if (randomMeal[`strIngredient${j}`]) {
            randomMealData.push(`${randomMeal[`strIngredient${j}`]} : ${randomMeal[`strMeasure${j}`]}`);
        } else {
            break;
        }
    }
    selectedMeal.innerHTML = `
    <div class='random_meal_details'>
        <h1>${randomMeal.strMeal}</h1>
        <img src='${randomMeal.strMealThumb}' alt='${randomMeal.strMeal}' />
        <div class='random_meal_info'>
        ${randomMeal.strCategory ? `<p>${randomMeal.strCategory}</p>` : ''}
        ${randomMeal.strArea ? `<p>${randomMeal.strArea}</p>` : ''}
        </div>
        <div class='random_meal_instructions'>
            <p>${randomMeal.strInstructions}</p>
            <h1>Ingredients</h1>
            <ul>
            ${randomMealData.map( ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>
    `;
};


// Event Listners

// 1-Listen for form submit
submit.addEventListener('submit', searchMeal)

// 2- Listen for click on meal
meals.addEventListener('click', e => {
    // find and return if only click on a meal-infi div
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal_info');
        } else {
            return false
        }
    });
    // Check if mealInfo exist
    if (mealInfo) {
        // Get meal id 
        const mealId = mealInfo.getAttribute('data_mealId');
        // Fetch Meal details
        getMeal(mealId);
    }
});

// Listen for click on random meal button
generate.addEventListener('click',randomMeal)