import { render, screen } from "@testing-library/react";
import AuctionList from "../components/auctions/AuctionList";

describe("Auction List", () => {
  test("renders list of auctions", async () => {
    render(<AuctionList />);

    const listOfAuctions = await screen.findAllByRole('list');

    expect(listOfAuctions).not.toHaveLength(0);
  });
});
