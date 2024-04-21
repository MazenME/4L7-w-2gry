
function handleRecipeClick(recipeId) {
    window.location.href = `../Details.html?id=${recipeId}`;
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('recipe-card')) {
        const recipeId = event.target.dataset.recipeId;
        handleRecipeClick(recipeId);
    }
});

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');




let recipeName = document.getElementById("recipeName");
let recipeCourse = document.getElementById("recipeCourse");
let recipeIngredients = document.getElementById("recipeIngredients");
let recipeImg = document.getElementById("recipeImg");
let recipeInstructions = document.getElementById("recipeInstructions");


const recipeString = localStorage.getItem('recipe');
let recipeData = JSON.parse(recipeString);


function fetchData(){
    for(let i = 0 ; i<recipeData.length ;i++){
        if(recipeData[i].id == recipeId){
            let recipe = recipeData[i];
            recipeName.innerHTML = recipe.name;
            recipeCourse.innerHTML = recipe.course;
            recipeImg.src = recipe.url;
            recipeInstructions.innerHTML = recipe.description;

            let ingredients = recipe.ingrediants.split('-');
            for(let i = 0 ; i < ingredients.length ; i++){
                let left = ingredients[i].split(',')[0];
                let right = ingredients[i].split(',')[1];

                recipeIngredients.innerHTML+=`
                <tr>
                <td>${left}</td>
                <td>${right}</td>
                </tr>
                `
            }
            return;
        }
    }
}

fetchData();






