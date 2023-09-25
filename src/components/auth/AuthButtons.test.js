import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../../test/server";
import { SWRConfig } from "swr";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter>
                <AuthButtons />
            </MemoryRouter>
        </SWRConfig>
    );

    await screen.findAllByRole("link");
}

describe("When User Is Not Signed In", () => {
    createServer([
        {
            path: "/api/user",
            res: () => {
                return { user: null }
            },
        },
    ]);

    test("Sign In and Sign Up Should Be Visible", async () => {
        await renderComponent();
        const signInButton = screen.getByRole("link", { name: /sign in/i });
        const signUpButton = screen.getByRole("link", { name: /sign up/i });

        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute("href", "/signin");
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute("href", "/signup");
    });
    
    test("Sign Out is Not Visible", async () => {
        await renderComponent();

        const signOutButton = screen.queryByRole("link", { name: /sign out/i });
        expect(signOutButton).not.toBeInTheDocument();
    });    
});


describe("When User Is Signed In", () => {
    createServer([
        {
            path: "/api/user",
            res: () => {
                return { user: { id: 1, email: "user.name@mail.com" } }
            },
        },
    ]);

    test("Sign In and Sign Up is Not Visible", async () => {
        await renderComponent();
        const signInButton = screen.queryByRole("link", { name: /sign in/i });
        const signUpButton = screen.queryByRole("link", { name: /sign up/i });

        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
    });
    
    test("Sign Out is Visible", async () => {
        await renderComponent();

        const signOutButton = screen.getByRole("link", { name: /sign out/i });
        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute("href", "/signout");
    });    
});