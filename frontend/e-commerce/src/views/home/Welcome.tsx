import api from "@/api/api";
import { useEffect, useState } from "react";

const Home = () => {

  const [welcomeData, setWelcomeData] = useState<string>("");

  useEffect(() => {
    const fetchWelcome = () => {
      api.get("/").then((response) => {
        setWelcomeData((response.data as { message: string }).message);
      });
    }

    fetchWelcome();
  }, [])

  return <div>{welcomeData}</div>;
};
export default Home;
