let arrData = []

if (localStorage.getItem("favourite") != null) {
    arrData = JSON.parse(localStorage.getItem("favourite"))
    console.log(arrData)
    displayData()
}


function displayData() {
    let html = ``;

    for (let i = 0; i < arrData.length; i++) {
        html += `
                <div class="recipe-card">
                    <img src="${arrData[i].url}" alt="${arrData[i].name}">
                    <h2>${arrData[i].name}</h2>
                   <button onclick="removeFavourite('${arrData[i].name}')" class="btn">Remove</button>

                </div> 
                `;
    }
    document.getElementById("FAVO").innerHTML = html
}

function removeFavourite(name) {
    const index = arrData.findIndex(recipe => recipe.name === name);
    if (index !== -1) {
        arrData.splice(index, 1);
        localStorage.setItem('favourite', JSON.stringify(arrData));
        displayData();
    } else {
        console.log("Recipe not found in favourites.");
    }
}
