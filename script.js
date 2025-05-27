// script.js

// Function to fetch food data from foods.json and display it
function loadMeals() {
  fetch('foods.json') // Ensure this path matches the location of your JSON file
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(foodData => {
      const container = document.getElementById('meal-container');
      container.innerHTML = ''; // Clear any existing meals

      foodData.forEach(meal => {
        // Create meal card div
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        // Meal image
        const img = document.createElement('img');
        img.src = meal.image;
        img.alt = meal.name;
        img.onerror = function () {
          this.src = 'images/placeholder.jpg'; // fallback if image not found
        };

        // Meal title
        const name = document.createElement('h3');
        name.textContent = meal.name;

        // Meal details
        const details = document.createElement('p');
        details.innerHTML = `
          <strong>Type:</strong> ${meal.mealType}<br>
          <strong>Calories:</strong> ${meal.calories} kcal<br>
          <strong>Protein:</strong> ${meal.protein}g<br>
          <strong>Carbs:</strong> ${meal.carbs}g<br>
          <strong>Fat:</strong> ${meal.fat}g<br>
          <strong>Cost:</strong> $${meal.cost}
        `;

        // Append all elements to the mealDiv
        mealDiv.appendChild(img);
        mealDiv.appendChild(name);
        mealDiv.appendChild(details);

        // Append mealDiv to the container
        container.appendChild(mealDiv);
      });
    })
    .catch(error => {
      console.error('Error loading food data:', error);
      const container = document.getElementById('meal-container');
      container.innerHTML = '<p>Failed to load meals. Please try again later.</p>';
    });
}

// Add event listener to the "Load Meals" button
document.addEventListener('DOMContentLoaded', () => {
  const loadButton = document.getElementById('load-meals-btn');
  if (loadButton) {
    loadButton.addEventListener('click', loadMeals);
  }
});
