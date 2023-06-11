import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>
        Resume Parser
      </h1>
      <div>

        <Link className="btn btn-primary" to="/applicant" role="button">
          Applicant
        </Link>
        <Link className="btn btn-secondary" to="/recruiter" role="button">
          Recruiter
        </Link>

      </div>
    </div>
  );
}

export default App;