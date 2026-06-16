import { useEffect, useState } from "react";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const SERVER_URL = "http://localhost:8080";

const Home = () => {
  const [serverMsg, setServerMsg] = useState("");
  useEffect(() => {
    const serverFetch = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Origin": "https://localhost:5173"
          }
        });
        if (!response.ok) throw new Error(`Server response status: ${response.status}`);

        const result = await response.json();
        setServerMsg(result);
      } catch (error) {
        throw error;
      }
    };

    serverFetch();
  });

  return (
    <>
      <h1>Hello from the client!</h1>
      <h1>{serverMsg}</h1>
    </>
  );
};

export default Home;