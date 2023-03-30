import { render, fireEvent, screen } from "@testing-library/react";
import { ColorModeContext } from "../../theme";
import Topbar from "../../scenes/global/Topbar";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'

describe("Topbar", () => {
  it("should render the app name when on the dashboard or doctext pages", () => {
    const { debug } = render(
      <BrowserRouter>
        <Topbar />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <ColorModeContext.Provider value={{}}>
            {children}
          </ColorModeContext.Provider>
        ),
      }
    );

    debug();

    const appNameElement = screen.getByText("PlanetParity");
    expect(appNameElement.textContent).toBeInTheDocument();
  });

  it("should toggle the color mode when the icon button is clicked", () => {
    const toggleColorMode = jest.fn();
    const location = {
      pathname: "/dashboard",
      search: "",
      hash: "",
      state: null,
    };
    const { getByRole } = render(
      <BrowserRouter>
        <Topbar />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <ColorModeContext.Provider value={{ toggleColorMode }}>
            {children}
          </ColorModeContext.Provider>
        ),
      }
    );

    const colorModeToggleButton = getByRole("button");
    expect(colorModeToggleButton).toBeInTheDocument();
    expect(toggleColorMode).not.toHaveBeenCalled();

    colorModeToggleButton.click();
    expect(toggleColorMode).toHaveBeenCalled();
  });
});