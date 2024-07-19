import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();

  const shopButtonHandler = () => {
    navigate("/shop");
  };
  
  const { isAuthenticated, user } = useContext(AuthContext).authState;
  
  return (
    <div className="hero-content m-auto">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">E-Commerce</h1>
          <p className="py-6">
            E-Commerce store portfolio
            <br />
            {isAuthenticated && user ? `Welcome, ${user.name}` : "Please sign in to shop"}
            <br />
            <a className="link" href="https://github.com/firze20/E-Commerce">Github Project</a>
          </p>
          <button className="btn btn-primary" onClick={shopButtonHandler}>Shop Now</button>
        </div>
      </div>
    </div>
  );
};
export default Home;
