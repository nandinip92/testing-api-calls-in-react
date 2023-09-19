import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { StarWarsPeople } from "./types/starwars.types";

function App() {
  const [people, setPeople] = useState<StarWarsPeople>();
  useEffect(() => {
    const getPeople = async (peopleNumber: number) => {
      const apiResponse = await fetch(
        `https://swapi.dev/api/people/${peopleNumber}`
      );
      const json = (await apiResponse.json()) as StarWarsPeople;
      console.log("json--->", json);
      setPeople(json);
    };
    getPeople(1); // as assignment said only first person hard coding this to 1
  }, []);
  return (
    <>
      <h1>Star Wars</h1>
      <h3>{people && people.name}</h3>
    </>
  );
}

export default App;
