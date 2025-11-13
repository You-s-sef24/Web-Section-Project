"use client";

import "./Navbar.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom position-fixed top-0 w-100">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand fw-bold" href="/">
          Cookpedia
        </Link>
        <div className="d-flex gap-3">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/categories">
            Categories
          </Link>
          <Link className="nav-link" href="/areas">
            Areas
          </Link>
        </div>
      </div>
    </nav>
  );
}
