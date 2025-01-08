import React, { useState, useEffect } from "react";
import "./card.css";
import axios from "axios";
function FurnitureSearch() {
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([
    "Amazon.in",
    "Flipkart",
    "Tradeindia.com",
    "Pepperfry",
    "Aajjo.com",
    "skmafujurislamfurniture.org",
    "gbfurniture.in",
    "IKEA.in",
    "Desket Furniture",
    "Wakefit",
    "Furlenco",
    "Delite Kom",
    "casaliving",
    "lakdi",
    "Caspian Furnitures",
    "Wooden Bazar",
    "eTerior",
    "Urban Daily Furniture By G Shaanti",
    "The Home Story",
    "Wooden Street",
    "TorqueIndia",
    "Meesho",
    "JioMart",
    "Shop Libas",
    "My Seventh Heaven",
    "Suspire",
    "Littlebird India",
    "Urban Ladder",
    "Ralph DaVinci",
    "Artisan & Blooms",
    "Furniture Magik",
    "AJIO.com",
    "MaltaDIY.com",
    "Artlivo",
    "Ouch Cart",
    "blessberries.com",
    "Tata CLiQ Lifestyle",
    "TATA CLiQ LUXURY",
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    for (const [key, value] of params) {
      queryParams[key] = value;
    }
    console.log(queryParams);

    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryParams = {};
        for (const [key, value] of params) {
          queryParams[key] = value;
        }
        console.log(queryParams)
        const response = await axios.post('http://localhost:5000/filter', {
          color:queryParams.color,
          category:queryParams.category,
          minPrice: queryParams.minPrice !== '' ? parseInt(queryParams.minPrice) : undefined,
          maxPrice: queryParams.maxPrice !== '' ? parseInt(queryParams.maxPrice) : undefined
        });
    
        
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function
  }, []); // Run only once on component mount

  return (
    <div className="card-container">
      <div>
        <h1 style={{ maxWidth: "100vw", minWidth: "100vw", padding: "10px" }}>
          Amazon
        </h1>
        <br />
      </div>
      ;
      {results.map((result, index) =>
        result.platform === "Amazon.in" ? (
          <div className="card" key={index}>
            <img
              src={result.imageUrl}
              alt={result.title}
              className="card-image"
            />
            <div className="card-details">
              <h3>{result.title}</h3>
              <p>Price: {result.price}</p>
              <p>Platform: {result.platform}</p>
              <p>Color: {result.color}</p>
              <p>Category: {result.category}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          </div>
        ) : null
      )}
      <div>
        <h1 style={{ maxWidth: "100vw", minWidth: "100vw", padding: "10px" }}>
          Flipkart
        </h1>
        <br />
      </div>
      {results.map((result, index) =>
        result.platform === "Flipkart" ? (
          <div className="card" key={index}>
            <img
              src={result.imageUrl}
              alt={result.title}
              className="card-image"
            />
            <div className="card-details">
              <h3>{result.title}</h3>
              <p>Price: {result.price}</p>
              <p>Platform: {result.platform}</p>
              <p>Color: {result.color}</p>
              <p>Category: {result.category}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          </div>
        ) : null
      )}
      <div>
        <h1 style={{ maxWidth: "100vw", minWidth: "100vw", padding: "10px" }}>
          Pepperfry
        </h1>
        <br />
      </div>
      {results.map((result, index) =>
        result.platform === "Pepperfry" ? (
          <div className="card" key={index}>
            <img
              src={result.imageUrl}
              alt={result.title}
              className="card-image"
            />
            <div className="card-details">
              <h3>{result.title}</h3>
              <p>Price: {result.price}</p>
              <p>Platform: {result.platform}</p>
              <p>Color: {result.color}</p>
              <p>Category: {result.category}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default FurnitureSearch;
