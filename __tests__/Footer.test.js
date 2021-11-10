import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/layout/Footer";

describe("Footer Component", () => {
  test("renders my name in Footer", () => {
    render(<Footer />);
    const myName = screen.getByText(/Alvaro Torres/i);
    expect(myName).toBeInTheDocument();
  });
  test("renders copyright character", () => {
    render(<Footer />);
    const copyright = screen.getByText(/©/i);
    expect(copyright).toBeInTheDocument();
  });
});
