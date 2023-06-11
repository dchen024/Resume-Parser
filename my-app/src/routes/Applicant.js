import React, { useState } from "react";
import { storage } from "../firebase"; // Import the Firebase storage module
import { ref, uploadBytes } from "firebase/storage"; // Import the Firebase storage functions
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; // Import the PDF.js worker
import * as pdfjsLib from "pdfjs-dist/build/pdf"; // Import the PDF.js library

// Initialize PDF.js with the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Applicant() {
  const [fileUpload, setFileUpload] = useState(null); // State variable to store the file being uploaded

  const uploadFile = () => {
    // Upload the selected file to Firebase storage
    if (fileUpload == null) return;

    const file = fileUpload.name.split(".");
    const ext = file.pop();
    
    const path = `${file.join(".") + crypto.randomUUID()}.${ext}`;

    const fileRef = ref(
      storage,
      path
    );

    uploadBytes(fileRef, fileUpload)
      .then(() => {
        parsePDF(fileUpload, path); // Parse the uploaded PDF file
        alert("File Uploaded");
      })
      .catch((error) => {
        console.log("Upload Error:", error);
      });
  };

  // Function to clean parsed contents string so there isn't special
  const cleanString = (str) => {
    // Remove special characters except for +, #, @, ., and -
    const cleanedStr = str.replace(/[^\w\s+#@.-]/gi, "");
  
    // Remove duplicate spaces
    return cleanedStr.replace(/\s+/g, " ");
  };

const parsePDF = (file, path) => {
  // Parse the uploaded PDF file using PDF.js
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const typedArray = new Uint8Array(this.result);
    const loadingTask = pdfjsLib.getDocument(typedArray);
    loadingTask.promise.then(function (pdf) {
      const numPages = pdf.numPages;
      const getPageText = (page) =>
        page.getTextContent().then(function (textContent) {
          const pageText = textContent.items
            .map((item) => item.str)
            .join(" ");
          return pageText;
        });

      const getPagePromises = Array.from(
        { length: numPages },
        (_, i) => i + 1
      ).map((pageNum) => pdf.getPage(pageNum).then(getPageText));

      Promise.all(getPagePromises)
        .then((pageTexts) => {
          const parsedText = pageTexts.join("\n");
          const cleanedText = cleanString(parsedText); // Clean up the parsed text
          storeParsedText(cleanedText, path); // Store the cleaned text as a text file
        })
        .catch((error) => {
          console.log("PDF Parsing Error:", error);
        });
    });
  };
  fileReader.readAsArrayBuffer(file);
};

const storeParsedText = (parsedText, path) => {
  // Store the parsed text as a text file in Firebase storage
  const textFileRef = ref(storage, `${path.replace(/\.pdf$/, '.txt')}`);
  const textFileBlob = new Blob([parsedText], { type: "text/plain" });

  uploadBytes(textFileRef, textFileBlob)
    .then(() => {
      console.log("Parsed text stored as text file");
    })
    .catch((error) => {
      console.log("Text File Upload Error:", error);
    });
};

  return (
    <div className="container">
      <h1 className="text-center">Applicant</h1>
      <div className="row justify-content-center mb-3">
        <div className="col-6">
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                setFileUpload(event.target.files[0]);
              }}
            />
            <button
              className="btn btn-primary"
              onClick={uploadFile}
            >
              Upload File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicant;