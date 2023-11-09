import React, { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="container-search">
        <input
          placeholder="Rechercher des articles"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          to={`/productList?search=${search}`}
          onClick={() => setSearch("")}
        >
          <i className="fa fa-search"></i>
        </Link>
      </div>
    </>
  );
}

export default Search;
