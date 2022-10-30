import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import mockResponse from "./components/__tests__/mockTestSuite.json";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

it(" shouldfetch on load", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Suite Mix Save Mental")).toBeInTheDocument();
  });
});
