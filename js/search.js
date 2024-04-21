        // const searchForm = document.querySelector('.search-box');
        // const searchInputRecipe = document.querySelector('#search');
        // const searchInputIngredient = document.querySelector('#searchIngredient');
        // const resultsList = document.querySelector('#results');

        // searchForm.addEventListener('submit', async (e) => {
        //     e.preventDefault();
        //     const searchValueRecipe = searchInputRecipe.value.trim();
        //     const searchValueIngredient = searchInputIngredient.value.trim();
        //     if (searchValueRecipe) {
        //         await searchRecipesByName(searchValueRecipe);
        //     } else if (searchValueIngredient) {
        //         await searchRecipesByIngredient(searchValueIngredient);
        //     }
        // });

        // async function searchRecipesByName(name) {
        //     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        //     const data = await response.json();
        //     displayRecipes(data.meals);
        // }

        // async function searchRecipesByIngredient(ingredient) {
        //     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        //     const data = await response.json();
        //     displayRecipes(data.meals);
        // }

        // function displayRecipes(recipes) {
        //     let html = '';
        //     if (recipes) {
        //         recipes.forEach((recipe) => {
        //             html += `
        //                 <div class="recipe-card">
        //                     <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        //                     <h2>${recipe.strMeal}</h2>
        //                     <button class="favourite-btn"><i class="fa-regular fa-star"></i></button>
        //                 </div> 
        //                 `;
        //         });
        //     } else {
        //         html = "<p>No recipes found.</p>";
        //     }
        //     resultsList.innerHTML = html;
        // }

// ----------------------------------------------------------------------------------------


// const searchForm = document.querySelector('.search-box');
// const searchInputRecipe = document.querySelector('#search');
// const searchInputIngredient = document.querySelector('#searchIngredient');
// const resultsList = document.querySelector('#results');

// // Function to search recipes by name in local storage
// function searchRecipesByName(name) {
//     const filteredRecipes = recipeData.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
//     displayRecipes(filteredRecipes);
// }

// // Function to search recipes by ingredient in local storage
// function searchRecipesByIngredient(ingredient) {
//     const filteredRecipes = recipeData.filter(recipe => recipe.ingrediants.toLowerCase().includes(ingredient.toLowerCase()));
//     displayRecipes(filteredRecipes);
// }

// // Function to display filtered recipes
// function displayRecipes(recipes) {
//     let html = '';
//     if (recipes.length > 0) {
//         recipes.forEach((recipe) => {
//             html += `
//                 <div class="recipe-card">
//                     <img src="${recipe.url}" alt="${recipe.name}">
//                     <h2>${recipe.name}</h2>
//                     <button class="favourite-btn"><i class="fa-regular fa-star"></i></button>
//                 </div> 
//                 `;
//         });
//     } else {
//         html = "<p>No recipes found.</p>";
//     }
//     resultsList.innerHTML = html;
// }

// searchForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const searchValueRecipe = searchInputRecipe.value.trim();
//     const searchValueIngredient = searchInputIngredient.value.trim();
//     if (searchValueRecipe) {
//         searchRecipesByName(searchValueRecipe);
//     } else if (searchValueIngredient) {
//         searchRecipesByIngredient(searchValueIngredient);
//     }
// });


//-----------------------------------------------------------------------------------------------


const searchForm = document.querySelector('.search-box');
const searchInputRecipe = document.querySelector('#search');
const searchInputIngredient = document.querySelector('#searchIngredient');
const resultsList = document.querySelector('#results');
const favouritId = document.querySelector('#favouritId');


let allRecipes = JSON.parse(localStorage.getItem('recipe')) || [];

displayRecipes(allRecipes);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchValueRecipe = searchInputRecipe.value.trim();
    const searchValueIngredient = searchInputIngredient.value.trim();
    let filteredRecipes = [];

    if (searchValueRecipe) {
        filteredRecipes = searchRecipesByName(searchValueRecipe);
    } else if (searchValueIngredient) {
        filteredRecipes = searchRecipesByIngredient(searchValueIngredient);
    } else {
        filteredRecipes = allRecipes;
    }

    displayRecipes(filteredRecipes);
});

function searchRecipesByName(name) {
    return allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
}

function searchRecipesByIngredient(ingredient) {
    return allRecipes.filter(recipe => recipe.ingredients.toLowerCase().includes(ingredient.toLowerCase()));
}


function displayRecipes(recipes) {
    let html = '';
    if (recipes.length > 0) {
        recipes.forEach((recipe) => {
            html += `
                <div class="recipe-card" data-recipe-id="${recipe.id}">
                    <img src="${recipe.url}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <button onclick="addFavourite('${recipe.name}')" class="btn">Favourite</button>
                </div> 
                `;
        });
        
    } else {
        html = "<p>No recipes found.</p>";
    }
    resultsList.innerHTML = html;
}

let favouriteRecipes = JSON.parse(localStorage.getItem('favourite')) || [];


function addFavourite(name) {
    if (!favouriteRecipes.some(recipe => recipe.name === name)) {
        let favouriteRecipe = allRecipes.find(recipe => recipe.name === name);
        if (favouriteRecipe) {
            favouriteRecipes.push(favouriteRecipe);
            localStorage.setItem('favourite', JSON.stringify(favouriteRecipes));
        } else {
            console.log("Recipe not found.");
        }
    } else {
        console.log("Recipe already exists in favourites.");
    }
}






