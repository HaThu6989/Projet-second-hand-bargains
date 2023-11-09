import React from "react";
import earthreusemin from "../../../assets/slogan/earth-reuse-min.png";
import reuseit2 from "../../../assets/slogan/reuseit2.png";

function Slogan() {
  return (
    <div className="container-slogan">
      <div className="left-slogan">
        <h2 className="title">Second hand bargains</h2>
        <div className="reuse-slogan">
          <h4>Sustainability starts with ...</h4>
          <img src={reuseit2} />
        </div>
      </div>
      <div className="right-slogan">
        <img src={earthreusemin} />
      </div>
    </div>
  );
}

export default Slogan;
