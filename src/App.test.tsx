import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the heading h1", () => {
  render(<App />);
  const titleElement = screen.getByText(/Star Wars/i);
  expect(titleElement).toBeInTheDocument();
});

test("Renders 1st person name", async () => {
  render(<App />);
  const peopleElement = await screen.findByText(/Luke Skywalker/i);
  expect(peopleElement).toBeInTheDocument();
});
