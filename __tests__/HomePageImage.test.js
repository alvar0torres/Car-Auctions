import React from "react";
import { render, screen } from "@testing-library/react";
import HomepageImage from "../components/ui/HomepageImage";

describe("Homepage Image", () => {
  test("renders motto on top of image", () => {
    render(<HomepageImage />);
    const motto = screen.getAllByText(/The most trusted source for car deals/i);
    expect(motto).not.toHaveLength(0);
  });
 
});
