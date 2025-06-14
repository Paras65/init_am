// CSVUpload.js
import React, { useState } from "react";
import Papa from "papaparse";

function CSVUpload({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setError(null);

      Papa.parse(file, {
        complete: (result) => {
          const products = result.data.map((row, idx) => ({
            id: `csv-${idx}`,
            name: row["Product Name"] || `Product ${idx + 1}`,
            link: row["Link"] || "#",
            description: row["Description"] || "No description",
            image: row["Image URL"] || "https://via.placeholder.com/80",
            category: row["Category"] || "Uncategorized",
            subcategory: row["Subcategory"] || "Miscellaneous",
          }));
          onDataLoaded(products);
          setLoading(false);
        },
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        error: (err) => {
          setError("Failed to parse CSV file.");
          setLoading(false);
        },
      });
    }
  };

  return (
    <div className="csv-upload">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CSVUpload;
