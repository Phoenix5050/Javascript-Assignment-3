document.getElementById('searchBtn').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredientInput').value;
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    if (data.drinks === null) {
        alert('No cocktails found with that ingredient!');
        return;
    }
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = data.drinks.map(drink => `
        <div class="cocktail-card">
            <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        </div>
    `).join('');
});