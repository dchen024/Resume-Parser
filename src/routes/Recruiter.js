import React, { useState, useEffect, useCallback } from "react";
import { storage } from "../firebase"; // Import the Firebase storage module
import { ref, listAll, getBlob, getDownloadURL } from "firebase/storage"; // Import the Firebase storage functions
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; // Import the PDF.js worker
import * as pdfjsLib from "pdfjs-dist/build/pdf"; // Import the PDF.js library
import "./App.css";

// Initialize PDF.js with the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Recruiter() {
  const [searchQuery, setSearchQuery] = useState(""); // State variable to store the search query
  const [searchResults, setSearchResults] = useState([]); // State variable to store the search results
  const [isLoading, setIsLoading] = useState(false); // State variable to indicate if a search is in progress

  const searchFiles = useCallback(async () => {
    // Search for files in Firebase storage
    setIsLoading(true);

    const textRef = ref(storage, "txt");
    const pdfRef = ref(storage, "pdf");

    const { items } = await listAll(textRef).catch((error) => {
      console.error("Listing Files Error:", error);

      setIsLoading(false);
    });

    const results = await Promise.all(
      items.map(async (item) => {
        const blob = await getBlob(item);

        return { content: await blob.text(), name: item.name };
      })
    ).catch((error) => {
      console.error("Search Error:", error);
      setIsLoading(false);
    });

    const filteredResults = await Promise.all(
      results
        .filter(({ content }) =>
          content.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(async (result) => {
          const name = result.name.replace(/\.txt$/, ".pdf");
          const url = await getDownloadURL(ref(pdfRef, name));

          return { name, url };
        })
    );

    setSearchResults(filteredResults);
    setIsLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    // Trigger a search when the search query changes
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      searchFiles();
    }
  }, [searchQuery, searchFiles]);

  return (
    <div className="container">
      <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      <h1 className="text-center"> Recruiter </h1>
      <div className="row justify-content-center mb-3">
        <div className="col-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Resumes"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
            />
            {searchQuery.trim() === "" && (
              <button
                className="btn btn-secondary"
                onClick={searchFiles}
                disabled={isLoading}
              >
                Fetch All
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <ul className="list-group">
              {searchResults.length === 0 ? (
                <li className="list-group-item text-center">
                  No results found
                </li>
              ) : (
                searchResults.map((result) => (
                  <li
                    key={result.name}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{result.name}</span>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recruiter;