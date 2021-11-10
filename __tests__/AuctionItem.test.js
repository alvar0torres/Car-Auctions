import React from "react";
import { render, screen } from "@testing-library/react";
import AuctionItem from "../components/auctions/AuctionItem";

describe("Auction Item component", () => {
  test("renders the image", () => {
    render(<AuctionItem />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
