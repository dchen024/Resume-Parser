import React, { useState } from "react";
import { storage } from "../firebase"; // Import the Firebase storage module
import { ref, uploadBytes } from "firebase/storage"; // Import the Firebase storage functions
import { Link } from "react-router-dom"; // Import the React Router Link component
import { AiFillHome, AiFillBackward } from "react-icons/ai"; // Import the home icon from React Icons
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; // Import the PDF.js worker
import * as pdfjsLib from "pdfjs-dist/build/pdf"; // Import the PDF.js library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize PDF.js with the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Applicant() {
  const [fileUpload, setFileUpload] = useState(null); // State variable to store the file being uploaded

  const uploadFile = () => {
    // Upload the selected file to Firebase storage
    if (fileUpload == null) return;

    const file = fileUpload.name.split(".");

    if (file.pop() !== "pdf") {
      toast.error("Invalid file type. Please upload a PDF file."); // Show an error message if the file type is invalid
      return;
    }

    const path = `${file.join(".") + crypto.randomUUID()}`;

    const fileRef = ref(storage, `pdf/${path}.pdf`);

    toast
      .promise(uploadBytes(fileRef, fileUpload), {
        pending: "File Uploading...",
        success: "File Uploaded",
        error: "Upload Error",
      })
      .then(() => {
        parsePDF(fileUpload, path); // Parse the uploaded PDF file
      })
      .catch((error) => {
        toast.error("Upload Error"); // Show an error message if there is an error
        console.log("Upload Error:", error); // Log an error if the file upload fails
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
    const textFileRef = ref(storage, `txt/${path}.txt`);
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
    <>
      <Link to="/">
        <AiFillHome className="m-5" size={32} />
      </Link>

      <div className="applicant">
        <h1>Applicant</h1>
        <p>Please Submit a PDF of your Resume</p>

        <div className="input-group mt-5 ">
          <input
            type="file"
            className="form-control"
            onChange={(event) => setFileUpload(event.target.files[0])}
          />

          <button className="btn btn-primary" onClick={uploadFile}>
            Upload File
          </button>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Applicant;
