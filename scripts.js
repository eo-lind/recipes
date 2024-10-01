function showLogin() {
  const loginForm = document.getElementById("login")
  loginForm.style.display = "block" // Show the login form
}

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyAvpw5Bb6H9UBdfZl6Tuzke925PvEgP7IQ",
  authDomain: "recipes-c74b5.firebaseapp.com",
  projectId: "recipes-c74b5",
  storageBucket: "recipes-c74b5.appspot.com",
  messagingSenderId: "497413846366",
  appId: "1:497413846366:web:b0618843502eb069398bcf",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Firebase Authentication login function
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Admin signed in");
      document.getElementById("login").style.display = "none"; // Hide login form
      document.getElementById("add-recipe-form").style.display = "block"; // Show add form
    })
    .catch((error) => {
      document.getElementById("login-error").textContent =
        "Login failed: " + error.message;
    });
}

// Check if user is signed in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in (admin)
    document.getElementById("login").style.display = "none"; // Hide login
    document.getElementById("add-recipe-form").style.display = "block"; // Show add form
  } else {
    // No user is signed in (viewers)
    document.getElementById("login").style.display = "block"; // Show login form
    document.getElementById("add-recipe-form").style.display = "none"; // Hide add form
  }
});

// Firebase Authentication login function
function login() {
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Admin signed in")
      document.getElementById("login").style.display = "none" // Hide login form
      document.getElementById("add-recipe-form").style.display = "block" // Show add form
    })
    .catch((error) => {
      document.getElementById("login-error").textContent =
        "Login failed: " + error.message
    })
}

// Check if user is signed in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in (admin)
    document.getElementById("login").style.display = "none" // Hide login
    document.getElementById("add-recipe-form").style.display = "block" // Show add form
  } else {
    // No user is signed in (viewers)
    document.getElementById("login").style.display = "block" // Show login form
    document.getElementById("add-recipe-form").style.display = "none" // Hide add form
  }
})

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
    // Create a recipe object
    const recipe = {
      name: name.trim(),
      ingredients: ingredients.map((ingredient) => ingredient.trim()),
      steps: steps.trim(),
    }

    // Add recipe to Firestore
    db.collection("recipes")
      .add(recipe)
      .then(() => {
        console.log("Recipe added successfully")
        displayRecipes() // Refresh the recipe list
        clearForm() // Clear form fields
      })
      .catch((error) => {
        console.error("Error adding recipe: ", error)
      })
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
