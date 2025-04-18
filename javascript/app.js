document.getElementById('searchBtn').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredientInput').value;
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    console.log(data);
});