import api from "@/api/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [welcomeData, setWelcomeData] = useState<string>("");

  useEffect(() => {
    const fetchWelcome = () => {
      api.get("/").then((response) => {
        setWelcomeData((response.data as { message: string }).message);
      });
    };

    fetchWelcome();
  }, []);

  return (
    <div>
      <h1 data-test-id="e-commerce-title">{welcomeData}</h1>
      <button className="btn btn-primary">Shop Now</button>
    </div>
  );
};
export default Home;
