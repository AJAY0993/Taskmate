import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function PageNotFound() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex gap-2">
      <p>Page not found</p>
      <Button type="primary" onClick={navigateToHome}>
        Home
      </Button>
    </div>
  );
}

export default PageNotFound;
