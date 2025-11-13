import Link from 'next/link';
import HeroSection from './Components/HeroSection';
import './globals.css';

export default async function Home() {

    const areaFlags = {
        American: "us",
        British: "gb",
        Canadian: "ca",
        Chinese: "cn",
        Croatian: "hr",
        Dutch: "nl",
        Egyptian: "eg",
        Filipino: "ph",
        French: "fr",
        Greek: "gr",
        Indian: "in",
        Irish: "ie",
        Italian: "it",
        Jamaican: "jm",
        Japanese: "jp",
        Kenyan: "ke",
        Malaysian: "my",
        Mexican: "mx",
        Moroccan: "ma",
        Polish: "pl",
        Portuguese: "pt",
        Russian: "ru",
        Spanish: "es",
        Thai: "th",
        Tunisian: "tn",
        Turkish: "tr",
        Ukrainian: "ua",
        Unknown: "❓",
        Uruguayan: "uy",
        Vietnamese: "vn"
    };

    const categoryRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const categoryData = await categoryRes.json();
    const categories = categoryData?.meals || [];
    const renderedCategories = categories.map((category) => {
        return (
            <Link href={`/categories/${category.strCategory}`} key={category.strCategory} className="text-decoration-none border-none text-center d-flex">
                <div className='card m-2' key={category.strCategory}>
                    <img src={`https://www.themealdb.com/images/category/${category.strCategory}.png`} className="card-img-top" alt={category.strCategory} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{category.strCategory}</h5>
                        <p className="card-text">Explore delicious {category.strCategory} meals.</p>
                    </div>
                </div>
            </Link>
        );
    })

    const areaRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const areaData = await areaRes.json();
    const areas = areaData?.meals || [];
    const renderAreas = areas.map((area) => {
        return (
            <Link href={`/areas/${area.strArea}`} key={area.strArea} className="text-decoration-none border-none text-center d-flex">
                <div className="card m-2" key={area.strArea}>
                    <img className="card-img-top flags" src={`https://flagcdn.com/w320/${areaFlags[area.strArea] || 'un'}.png`} alt={area.strArea} />
                    <div className="card-body">
                        <h4 className="card-title fw-bold">{area.strArea}</h4>
                        <p className="card-text">Explore delicious {area.strArea} meals.</p>
                    </div>
                </div>
            </Link>
        );
    });

    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();
    const allMeals = data?.meals || [];

    function getRandomMeals(meals, count = 4) {
        const shuffled = [...meals].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const featured = getRandomMeals(allMeals, 4);
    const renderFeatured = featured.map((item) => {
        return (
            <Link href={`/meals/${item.idMeal}`} key={item.idMeal} className="text-decoration-none border-none text-center d-flex">
                <div className='card m-2' key={item.idMeal}>
                    <img src={item.strMealThumb} className="card-img-top" alt={item.strMeal} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{item.strMeal}</h5>
                        <p className="card-text">Explore delicious {item.strCategory} meals.</p>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div className="container mt-5 pt-1">
            <HeroSection />

            <section className="my-5">
                <h2>Featured Meals</h2>
                <div className="d-flex flex-row overflow-auto gap-1">
                    {renderFeatured}
                </div>
            </section>

            <section className="my-5">
                <h2>Explore by Category</h2>
                <div className="d-flex flex-row overflow-auto gap-1">
                    {renderedCategories}
                </div>
            </section>

            <section className="my-5">
                <h2>Explore by Area</h2>
                <div className="d-flex flex-row overflow-auto gap-1">
                    {renderAreas}
                </div>
            </section>
        </div>
    )
}
