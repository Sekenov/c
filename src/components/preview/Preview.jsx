import React from "react";
import hoh from "../../img/hoh.jpg";
import "./Preview.css";
import a from "../../img/a.png";
export default function Preview() {
  return (
    <div className="preview">
      <img src={hoh} alt="" className="hoh" />
      <div className="a">
        <div className="logo">
          <img src={a} alt="" className="carto" />
          <h1 className="text">Copy Star</h1>
        </div>

        <p>Девиз команды</p>
      </div>

      
    </div>
  );
}
