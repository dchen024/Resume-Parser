import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="container">
       <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />

      <h1 className="text-center">
        Resume Parser
      </h1>
      <div>
      <h1 className="text-center"> 
        <Link className="btn btn-primary" to="/applicant" role="button">
          Applicant
        </Link>
        <Link className="btn btn-secondary" to="/recruiter" role="button">
          Recruiter
        </Link>
        </h1>
      </div>
    </div>
  );
}

export default App;