
let id = document.getElementById("Admin-image-ID");
let name = document.getElementById("Admin-recipe-name");
let url = document.getElementById("Admin-image-source");
let description = document.getElementById("Admin-recipe-description");
let ingrediants = document.getElementById("Admin-recipe-ingrediants");
let submit = document.getElementById("Admin-submit");
let course = document.getElementById("Admin-course");
let status = 'add';
let tmp;
let daleteAll = document.getElementById("Admin-delete-all");


let recipeData;
if(localStorage.recipe != null) {
    recipeData = JSON.parse(localStorage.recipe);
} else {
    recipeData = [];
}

if (recipeData == []) {
    daleteAll.style.display="none";
}


submit.onclick = function() {
    let newRecipe = {
        id: id.value,
        name: name.value,
        url: url.value,
        course: course.value,
        description: description.value,
        ingrediants: ingrediants.value
    }
    if(!(id.value == '' || name.value === '' || url.value === '' || description.value === '' || ingrediants.value === '' || course.value === '')) {
        if(status === 'add') {
            recipeData.push(newRecipe);
        }
        else {
            recipeData[tmp] = newRecipe;
            status = 'add';
            submit.innerHTML = 'add';
        }
        localStorage.setItem('recipe', JSON.stringify(recipeData));
        clearData();
        showRecipe();
        daleteAll.style.display="block";
    }
   
    
}

function clearData(){
    id.value = '',
    name.value = '';
    url.value = '';
    course.value = '-- Course --';
    description.value = '';
    ingrediants.value = '';
}

function showRecipe() {
    let cards = '';
    for(let i = 0; i < recipeData.length; i++) {
        cards += `<div class="Admin-recipe-card">
            <img src="${recipeData[i].url}" alt="${recipeData[i].name} image">
            <p>${recipeData[i].name}</p>
            <button onclick="editRecipe(${i})" id="Admin-card-edit" class="Admin-card-edit">Edit</button>
            <button onclick="deleteRecipe(${i})" id="Admin-card-delete">Delete</button>
            </div>`;   
    }
    document.getElementById("Admin-recipes").innerHTML = cards;
}
showRecipe();




function deleteRecipe(i) {
    recipeData.splice(i, 1);
    localStorage.recipe = JSON.stringify(recipeData);
    showRecipe();
    if(localStorage.recipe == null) {
        daleteAll.style.display="none";
    }
}

function editRecipe(i) {
    id.value = recipeData[i].id,
    name.value = recipeData[i].name;
    url.value = recipeData[i].url;
    course.value = recipeData[i].course;
    description.value = recipeData[i].description;
    ingrediants.value = recipeData[i].ingrediants;
    submit.innerHTML = 'Edit';
    status = 'edit';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}


daleteAll.onclick = function() {
    recipeData = [];
    localStorage.recipe = JSON.stringify(recipeData);
    showRecipe();
    daleteAll.style.display="none";
}