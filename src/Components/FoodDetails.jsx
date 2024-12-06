import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "2e818cc5691b4712ad0450d2ce72991c";

  useEffect(() => {
    function fetchFood() {
      fetch(`${URL}?apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFood(data);
          setIsLoading(false);
        })
        .catch((error) => {
          // console.error("Error fetching data:", error);
        });
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img src={food.image} alt={food.title} className={styles.recipeImage} />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏰ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🐔 Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐄 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          💲
          <span>
            <strong>{food.pricePerSaving / 100} Per serving</strong>
          </span>
        </div>
      </div>
      <h2>Ingredients</h2>

      {isLoading ? <p>Loading...</p> : <ItemList food={food} />}

      <div className={styles.recipeInstructions}>
        <h2>Instructions</h2>
        <ol>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
