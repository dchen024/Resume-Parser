import { Link } from "react-router-dom";
import "./App.css";
import customApplicantIcon from "../assets/custom-applicant-icon.png";
import customRecruiterIcon from "../assets/custom-recruiter-icon.png";

function App() {
  return (
    <div className="container">
      <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      <h1 className="title custom-title">
        Resume Parser
      </h1>
      <div>
        <h1 className="text-center">
          <Link className="btn btn-primary btn-lg" to="/applicant" role="button">
            <img src={customApplicantIcon} alt="Applicant" /> Applicant
          </Link>
          <Link className="btn btn-danger btn-lg" to="/recruiter" role="button">
            <img src={customRecruiterIcon} alt="Recruiter" /> Recruiter
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default App;