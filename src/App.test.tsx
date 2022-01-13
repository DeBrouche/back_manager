import React from "react";
import { render, screen } from "@testing-library/react";
import { BackManage } from "./App";

test("renders learn react link", () => {
  render(<BackManage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
