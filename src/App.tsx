import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { StarWarsPeople } from "./types/starwars.types";

function App() {
  const [people, setPeople] = useState<StarWarsPeople>();
  const [error, setError] = useState("");
  useEffect(() => {
    const getPeople = async (peopleNumber: number) => {
      let message = "";
      try {
        const apiResponse = await fetch(
          `https://swapi.dev/api/people/${peopleNumber}`
        );
        if (apiResponse.status === 500) {
          message = "Oops... something went wrong, try again 🤕";
          throw new Error(message);
        }
        if (apiResponse.status === 418) {
          message = "418 I'm a tea pot 🫖, silly";
          throw new Error(message);
        }
        const json = (await apiResponse.json()) as StarWarsPeople;
        console.log("json--->", json);
        setPeople(json);
      } catch (error) {
        setError(message);
      }
    };
    getPeople(1); // as assignment said only first person hard coding this to 1
  }, []);
  return (
    <>
      <h1>Star Wars</h1>
      <h3>{people && people.name}</h3>
      {error && <h3>{error}</h3>}
    </>
  );
}

export default App;
