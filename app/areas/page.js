import './area.css';
import Link from "next/link";

export default async function AreasPage() {
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

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await res.json();
    const areas = data.meals;

    const renderedAreas = areas.map((area) => {
        return (
            <Link href={`/areas/${area.strArea}`} key={area.strArea} className="text-decoration-none border-none text-center d-flex">
                <div className='card d-flex' key={area.strArea}>
                    <img src={`https://flagcdn.com/w320/${areaFlags[area.strArea] || 'un'}.png`} className="card-img-top" alt={area.strArea} />
                    <div className="card-body">
                        <h5 className="fw-bold card-title">{area.strArea}</h5>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="fw-bold my-3">Areas</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {renderedAreas}
            </div>
        </div>
    );
}