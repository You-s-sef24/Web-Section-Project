import './meal.css';
import Link from "next/link";

export default async function SearchPage({ params }) {
    const { name } = params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await res.json();
    const meals = data.meals;

    if (!meals) {
        return (
            <div className="container my-5 text-center pt-5">
                <h2 className="text-danger">No meals found for "{name}"</h2>
            </div>
        );
    }

    const renderedMeals = meals.map((meal) => {
        return (
            <Link href={`/meals/${meal.idMeal}`} key={meal.idMeal} className="text-decoration-none border-none text-center d-flex">
                <div className='card d-flex' key={meal.idMeal}>
                    <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                    <div className="card-body">
                        <h5 className="fw-bold card-title">{meal.strMeal}</h5>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div className="container my-5 pt-3">
            <h1 className="my-4">Search Results for "{name}"</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {renderedMeals}
            </div>
        </div>
    );
}