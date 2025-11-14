import Link from 'next/link';
import './area.css';

export default async function AreaPage({ params }) {
    const { area } = params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await res.json();
    const meals = data.meals;

    if (!meals) {
        return (
            <div className="container my-5 text-center pt-5">
                <h2 className="text-danger">No areas found</h2>
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
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="fw-bold my-3">{area} Meals</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {renderedMeals}
            </div>
        </div>
    );
}