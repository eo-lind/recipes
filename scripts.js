function displayRecipes(filteredRecipes = recipes) {
  const recipeList = document.getElementById("recipes")
  recipeList.innerHTML = "" // Clear the list before rendering

  filteredRecipes.forEach((recipe) => {
    const li = document.createElement("li")
    li.innerHTML = `<strong>${
      recipe.name
    }</strong><br>Ingredients: ${recipe.ingredients.join(", ")}<br>Steps: ${
      recipe.steps
    }`
    recipeList.appendChild(li)
  })
}

function addRecipe() {
  const name = document.getElementById("recipe-name").value
  const ingredients = document
    .getElementById("recipe-ingredients")
    .value.split(",")
  const steps = document.getElementById("recipe-steps").value

  if (name && ingredients.length > 0 && steps) {
    recipes.push({
      name: name.trim(),
      ingredients: ingredients.map((ingredient) => ingredient.trim()),
      steps: steps.trim(),
    })

    displayRecipes() // Refresh the recipe list
    clearForm() // Clear form fields
  }
}

function clearForm() {
  document.getElementById("recipe-name").value = ""
  document.getElementById("recipe-ingredients").value = ""
  document.getElementById("recipe-steps").value = ""
}

function searchRecipes() {
  const query = document.getElementById("search-bar").value.toLowerCase()
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query)
      )
  )
  displayRecipes(filteredRecipes)
}

// Initialize the app by displaying all recipes
displayRecipes()