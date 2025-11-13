"use client";

import "../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (search.trim() !== "") {
      router.push(`./search/${search}`);
    }
  }

  return (
    <header className="hero d-flex justify-content-center align-items-center flex-column border rounded p-5 100-vh my-5">
      <h1>
        <i className="bi bi-fork-knife"></i> Welcome to Cookpedia
      </h1>
      <p>Discover delicious meals from around the world</p>
      <form className="input-group mb-3" onSubmit={(e)=>{
        e.preventDefault()
        handleSearch();
        }}>
        <input
          type="text"
          placeholder="Search meals..."
          className="form-control w-50 mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-success"
          type="submit"
        >
          Search
        </button>
      </form>
    </header>
  );
}
