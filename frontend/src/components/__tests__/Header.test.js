import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";


describe(Header, () => {
    it ("renders with title and subtitle", () => {
      const {getByText} = render(<Header title={"This is a test title"} subtitle={"This is a test subtitle"} />)
      const titleElement = getByText("This is a test title").textContent
      const subtitleElement = getByText("This is a test subtitle").textContent
      expect(titleElement).toEqual("This is a test title")
      expect(subtitleElement).toEqual("This is a test subtitle");
    });
  });