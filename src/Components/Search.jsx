import { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "2e818cc5691b4712ad0450d2ce72991c";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("Pizza");

  useEffect(() => {
    // return async function fetchFood() {
    //   const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
    //   const data = await res.json();
    //   console.log(data);
    // };

    return function fetchFood() {
      fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setFoodData(data.results);
          console.log(data.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
