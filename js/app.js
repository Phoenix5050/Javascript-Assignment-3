document.getElementById('searchBtn').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredientInput').value;
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    if (!data.drinks) {
      alert('No cocktails found with that ingredient!');
      return;
    }
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = data.drinks.map(drink => `
      <div class="cocktail-card" data-id="${drink.idDrink}">
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>${drink.strDrink}</h3>
      </div>
    `).join('');
  });
  
  document.addEventListener('click', async (e) => {
    // open details
    const card = e.target.closest('.cocktail-card');
    if (card) {
      const drinkId = card.dataset.id;
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/lookup.php?i=${drinkId}`
      );
      const data = await response.json();
      console.log('Fetched drink data:', data); // <-- check this
      showModal(data.drinks[0]);
    }
    // close modal
    if (e.target.classList.contains('close')) {
      document.getElementById('modal').style.display = 'none';
    }
  });
  
  function showModal(drink) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(
          `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`] || ''}`
        );
      }
    }
    document.getElementById('modalDetails').innerHTML = `
      <h2>${drink.strDrink}</h2>
      <h3>Ingredients:</h3>
      <ul>${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <p>${drink.strInstructions}</p>
    `;
    document.getElementById('modal').style.display = 'block';
  }  