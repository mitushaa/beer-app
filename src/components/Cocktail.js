import React from "react";
import { Link } from "react-router-dom";
export default function Cocktail({ image, name, id, style, ounces, ibu, abv }) {
  return (
    <div className="cocktail">
      <img src={image} alt={name} />
      <div className="cocktail-footer">
        <h1>{name}</h1>
        <h3>{style}</h3>
        <h3>Ounces: {ounces}</h3>
        <h3>{ibu}</h3>
        <h3>abv: {abv}</h3>
      </div>
    </div>
  );
}
