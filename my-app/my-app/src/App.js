// Import styles from App.css
import './App.css';
// Import the useState hook from the React library
// This allows us to create state within functional components
import React, { useState } from "react";
// Import the storage object from the firebase library
import { storage } from "./firebase";
// Import the ref and uploadBytes functions from the storage module (Upload)
import { ref, uploadBytes } from "firebase/storage";
// Import the v4 function from the uuid library
// This allows us to generate unique IDs for stored files
import { v4 } from "uuid";
// Import Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Use the useState hook to create a state variable called fileUpload, initially set to null
  const [fileUpload, setFileUpload] = useState(null);
  // Define a function called uploadFile
  const uploadFile = () => {
    // If fileUpload is null or undefined, return and do nothing
    if (!fileUpload) return;
    // Create a file reference in the storage object using the file's name and a v4 uuid
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    // Upload the file to the storage object using the uploadBytes function and the file reference
    uploadBytes(fileRef, fileUpload).then(() => {
      // Alert the user that the file was successfully uploaded
      alert("File Uploaded");
    })
  }
  
  // Render an input element that allows users to select a file to upload
  // Add an event listener on the input element that sets the fileUpload state to the selected file
  // Render a button that triggers the uploadFile function when clicked, only if a file has been selected
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Upload your resume</h3>
              <div className="form-group">
                <input 
                  type="file" 
                  accept=".pdf, .docx, .doc, .txt"
                  className="form-control-file" 
                  onChange={
                    (event) => {
                      setFileUpload(event.target.files[0]);
                    }
                  }/>
              </div>
              <button 
                className="btn btn-primary"
                onClick={uploadFile}
                disabled={!fileUpload}>
                  Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;