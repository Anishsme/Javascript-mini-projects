const meals = document.getElementById("meals");
const mealPopup = document.getElementById("meal-popup");

const mealInfoEl = document.getElementById("popup");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  // fetch returns a promise
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  console.log(respData);
  // Below gets a random Meal object
  const randomMeal = respData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsbySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meal = respData.meals;
  console.log(meal);
  return meal;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
          <div class="meal-header">
          
          ${random ? `<span class="random"> Random Recipe </span>` : ""}
            
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
          </div>
       `;
  //  Now this is the heart button functionality
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  // Adds the random recipe to the page
  meals.appendChild(meal);
}

// Now we need to store favorites to the localstorgae

function addMealLS(mealID) {
  const mealIDs = getMealsLS();
  localStorage.setItem("meals", JSON.stringify([...mealIDs, mealID]));
}

function removeMealLS(mealID) {
  const meals = getMealsLS();

  localStorage.setItem(
    "meals",
    JSON.stringify(meals.filter((m) => m !== mealID))
  );
}

function getMealsLS() {
  const mealsIds = JSON.parse(localStorage.getItem("meals"));
  return mealsIds === null ? [] : mealsIds;
}

function addMealsToFav(mealData) {
  favoriteContainer.innerHTML = "";
  const Favmeal = document.createElement("li");

  Favmeal.innerHTML = `
         <img src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}">
              <br/>
              <span>${mealData.strMeal}</span>
              <button class="clear"><i class="fa-solid fa-xmark"></i></button>
       `;
  const btn = Favmeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
  });
  favoriteContainer.appendChild(Favmeal);
}

// Function is to fill out the favorite meals area of the menu
async function fetchFavMeals() {
  const mealIds = getMealsLS();

  for (i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    m = await getMealById(mealId);
    addMealsToFav(m);
  }
}

function showMealInfo(mealData) {
  // Update meal info
  // mealEl.innerHTML = ``;
  const mealEl = document.createElement("div");

  // Show popup
  console.log(mealData);
  mealEl.innerHTML = `
          <button id="close-popup" class="close-popup">
          <i class="fa-solid fa-xmark"></i>
        </button>
          <h1>${mealData.strMeal}</h1>
          <img src="${mealData.strMealThumb}">
          <p>
            ${mealData.strInstructions}
          </p>
         `;

  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
  const popupCloseBtn = document.getElementById("close-popup");
  popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
  });
}

searchBtn.addEventListener("click", async () => {
  meals.innerHTML = "";
  const search = searchTerm.value;
  const mea = await getMealsbySearch(search);
  console.log(mea);
  mea.forEach((m) => {
    addMeal(m);
  });
});
