import React from "react";

function Search() {
  return (
    <>
      <div className="container-search">
        <input placeholder="Rechercher des articles" />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </>
  );
}

export default Search;
