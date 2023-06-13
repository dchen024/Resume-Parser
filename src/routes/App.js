import { Link } from "react-router-dom";
import customApplicantIcon from "../assets/custom-applicant-icon.png";
import customRecruiterIcon from "../assets/custom-recruiter-icon.png";

function App() {
  return (
    <div className="container">
      <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      
      <h1 className="display-1 mb-5">
        Resume Parser
      </h1>

      <div className="d-flex justify-content-between gap-5">
          <Link className="btn btn-primary btn-lg" to="/applicant" role="button">
            <img width="64" src={customApplicantIcon} alt="Applicant" /> Applicant
          </Link>
          <Link className="btn btn-danger btn-lg" to="/recruiter" role="button">
            <img width="64" src={customRecruiterIcon} alt="Recruiter" /> Recruiter
          </Link>
      </div>
    </div>
  );
}

export default App;