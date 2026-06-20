import { useEffect, useState } from "react";
import type { Route } from "./+types/Home";
import { Link } from "react-router";
import { heading1Style, homeLinkStyle } from "~/styles/styleTemplates";
import Login from "./Login";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const SERVER_URL = "http://localhost:8080";

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

  // JWT on client

  return (
    <>
      <header>
        <h1 className={heading1Style}>
          Odin Members Only
        </h1>
      </header>
      <main>
        <ul className={`flex justify-evenly md:justify-center md:gap-16`}>
          <li className={homeLinkStyle}>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className={homeLinkStyle}>
            <Link to="/login">Login</Link>
          </li>
          <li className={homeLinkStyle}>
            <Link to="/message-board">Message Board</Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Home;