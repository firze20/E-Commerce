"use client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

type AboutProps = {};

const About: NextPage<AboutProps> = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/e-commerce`);
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if(error) {
    return <div>Error: {error}</div>
  };

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>About the E-Commerce</h1>
        {data ? (
          <div>
            <p>{data.message}</p>
            {/* Render other data here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    );
  
};

export default About;