import './meal.css';
export default async function mealPage({ params }) {
    const { id } = params;
    let meal = null;
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        meal = data.meals ? data.meals[0] : null;
    } catch (err) {
        console.error("Error", err);
    }

    if (!meal) {
        return (
            <div className="container my-5 text-center pt-5">
                <h2 className="text-danger">No meal found</h2>
            </div>
        );
    }

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    const renderIngredients = ingredients.map((ingredient, index) => {
        return (
            <span className="rounded-pill border bg-success text-white p-2" key={index}>
                {ingredient}
            </span>
        );
    });

    return (
        <div className="container my-5">
            <div className='d-flex justify-content-center thumbnail my-3'>
                <img
                    src={meal.strMealThumb}
                    className="img-fluid rounded w-75"
                    alt="meal Thumbnail"
                />
            </div>
            <h1>{meal.strMeal}</h1>
            <p className="text-success mb-4">Category: {meal.strCategory} | Area: {meal.strArea}</p>
            <h4 className="fw-bold">Instructions</h4>
            <p className='mb-3'>{meal.strInstructions}</p>
            <h4 className="fw-bold mb-3">Ingredients</h4>
            <div className="d-flex flex-wrap gap-1 mb-3">
                {renderIngredients}
            </div>
            <a href={meal.strYoutube} target="_blank" className="border text-decoration-none btn btn-secondary">
                Watch Tutorial
            </a>
        </div>
    );
}