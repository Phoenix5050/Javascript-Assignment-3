document.getElementById('searchBtn').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredientInput').value.trim();
    if (!ingredient) {
        alert('Please enter an ingredient.');
        return;
    }

    try {
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?i=${ingredient}`
        );
        const data = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        resultsDiv.innerHTML = data.drinks.map(drink => `
            <div class="cocktail-card" data-id="${drink.idDrink}">
                <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}">
                <h3>${drink.strDrink}</h3>
            </div>
        `).join('');

        /*
            There is probably a better way to do this, but this will do for now.
            Currently getting errors on non-valid ingredients for some reason    
        */
    } catch (error) {
        alert('No drinks were found with that ingredient.');
    }
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
  
    const favButton = document.createElement('button');
    const isFavorite = localStorage.getItem(drink.idDrink) === 'true';
  
    favButton.textContent = isFavorite ? '❤️ Remove Favorite' : 'Add Favorite';
  
    favButton.addEventListener('click', () => {
      if (localStorage.getItem(drink.idDrink) === 'true') {
        localStorage.removeItem(drink.idDrink);
        favButton.textContent = 'Add Favorite';
      } else {
        localStorage.setItem(drink.idDrink, 'true');
        favButton.textContent = '❤️ Remove Favorite';
      }
    });
  
    document.getElementById('modalDetails').append(favButton);
    document.getElementById('modal').style.display = 'block';
  }  