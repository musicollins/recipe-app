window.addEventListener("load", () => {
  console.log("Recipe App Loaded");

  window.addEventListener("click", (e) => {
    if (e.target.parentNode.classList[0] === "meal-category") {
      console.log("DOES");
      searchByCategory(e.target.classList);
    }
    if (e.target.classList[1] === "fa-minus") {
      console.log("iconClicked");
      document.querySelector(".random-meal-container").remove();
    //   searchByCategory(e.target.classList);
    }
  });

  async function searchByCategory(categoryName) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    let responseDataJSON = await response.json();
    console.log(responseDataJSON);

    if (document.querySelectorAll(".meal-list-container")) {
      document.querySelectorAll(".meal-list-container").forEach((el) => {
        el.remove();
      });
    }

    let theHollow = document.querySelector(".main-container");
    const breaker = document.querySelector(".results_breaker");
    breaker.style.display = "block";

    responseDataJSON.meals.forEach((meal, index) => {
      console.log(meal);

      const mealListContainer = document.createElement("div");
      const mealListTopTag = document.createElement("div");
      const mealListMealNameContainer = document.createElement("div");
      const mealListMealName = document.createElement("div");
      const mealListPlayIcon = document.createElement("i");

      mealListContainer.classList.add("meal-list-container");

      mealListContainer.style.backgroundImage = `url(${meal.strMealThumb})`;

      mealListTopTag.classList.add("meal-list_top-tag");
      mealListTopTag.classList.add("00_" + index+1);

      mealListTopTag.innerHTML = `#${index+1}`;

      mealListMealNameContainer.classList.add("meal-list_meal-name-rating");
      mealListMealName.classList.add("meal-list_meal-title");
      mealListMealName.innerHTML = `${meal.strMeal}`;
      mealListPlayIcon.classList.add("fas");
      mealListPlayIcon.classList.add("fa-play");

      mealListMealNameContainer.appendChild(mealListMealName);
      mealListMealNameContainer.appendChild(mealListPlayIcon);
      mealListContainer.appendChild(mealListTopTag);
      mealListContainer.appendChild(mealListMealNameContainer);
      theHollow.appendChild(mealListContainer);
    });
  }

  async function getMealCategories() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let responseDataJSON = await response.json();

    console.log(responseDataJSON);
    console.log(responseDataJSON.categories);

    let categoriesContainer = document.querySelector(".categories-container");
    responseDataJSON.categories.forEach((category, index) => {
      if (index > 6) return;
      let categoryContainer = document.createElement("div");
      categoryContainer.classList.add("meal-category");
      categoryContainer.classList.add(`__${index}`);
      categoryContainer.classList.add(category.strCategory);
      let categoryImg = document.createElement("img");
      categoryImg.classList.add(category.strCategory);
      categoryImg.src = category.strCategoryThumb;
      let categoryName = document.createElement("h5");
      categoryName.classList.add(`category-name__${category.strCategory}`);
      categoryName.innerHTML = category.strCategory;

      categoryContainer.appendChild(categoryImg);
      categoryContainer.appendChild(categoryName);
      categoriesContainer.appendChild(categoryContainer);
    });
  }

  async function getRandomMeal() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    let responseDataJSON = await response.json();

    console.log(responseDataJSON);
    console.log(responseDataJSON.meals);
    const randomMealContainer = document.querySelector(
      ".random-meal-container"
    );
    randomMealContainer.style.backgroundImage = `url(${responseDataJSON.meals[0].strMealThumb})`;
    const mealTitle = document.querySelector(".meal-title");
    mealTitle.innerHTML = responseDataJSON.meals[0].strMeal;

    // let ingredients=new Array();
    // ingredients.forEach((ingredient, index) =>{

    //     if(responseDataJSON.meals[0].strIngredient[index] === ""){
    //         return
    //     }
    //     console.log(responseDataJSON.meals[0].strIngredient[index]);
    // })

    // for (let index = 1; index < 20; index++) {
    //     if(responseDataJSON.meals[0].strIngredient+""+index === ""){
    //         return;
    //     }
    //     console.log(responseDataJSON.meals[0].strIngredient[index])
    //     ingredients.push(responseDataJSON.meals[0].strIngredient+""+index)

    // }
  }

  getMealCategories();
  getRandomMeal();
});

/*
console.log(categories)
        let categoriesContainer = document.querySelector(".categories-container");
        categories.forEach((category, index) =>{
            let categoryContainer = document.createElement("div");
            categoryContainer.classList.add("meal-category")
            categoryContainer.classList.add(`__${index}`);
            let categoryImg = document.createElement("img");
            categoryImg.src = category.strCategoryThumb;
            let categoryName = document.createElement(".h5");
            categoryName.classList.add(`category-name__${category.strCategory}`);
            categoryName.innerHTML = category.strCategory;

            categoryContainer.appendChild(categoryImg);
            categoryContainer.appendChild(categoryName);
            categoriesContainer.appendChild(categoryContainer);

        })



*/
