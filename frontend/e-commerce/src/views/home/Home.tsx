import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const shopButtonHandler = () => {
    navigate("/shop");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">E-Commerce</h1>
          <p className="py-6">
            E-Commerce store portfolio
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
