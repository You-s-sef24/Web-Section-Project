import './category.css';
import Link from "next/link";

export default async function CategoriesPage() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
    const data = await res.json();
    const categories = data.meals;

    const renderedCategories = categories.map((category) => {
        return (
            <Link href={`/categories/${category.strCategory}`} key={category.strCategory} className="text-decoration-none border-none text-center d-flex">
                <div className='card d-flex' key={category.strCategory}>
                    <img src={""} className="card-img-top" alt={category.strCategory} />
                    <div className="card-body">
                        <h5 className="fw-bold card-title">{category.strCategory}</h5>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="fw-bold my-3">Categories</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {renderedCategories}
            </div>
        </div>
    );
}