import {screen, render} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// jest.mock("../tree/FileIcon", () => {
//     return () => {
//         return "File Icon Component"
//     }
// });

function renderComponent() {
    const repository = {
        full_name: "facebook/react", 
        language: "Javascript", 
        description: "A JS Library", 
        owner: { login: "facebook" }, 
        name: "react",
        html_url: "https://react.com/facebook/react", 
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository}/>
        </MemoryRouter>
    );

    return { repository };
}

test("Should Render a Github Link", async () => {
    const { repository } = renderComponent();
    await screen.findByRole("img", { name: repository.language });

    const link = screen.getByRole("link", { name: "github repository" });
    expect(link).toHaveAttribute("href", repository.html_url);
});

test("Should Render a Star Icon", async () => {
    const { repository } = renderComponent();

    const icon = await screen.findByRole("img", { name: repository.language });
    expect(icon).toBeInTheDocument();
});

test("Should Show a Link to The Code Editor Page", async () => {
    const { repository } = renderComponent();

    const link = await screen.findByRole("link", { name: new RegExp(repository.owner.login) });
    expect(link).toHaveAttribute("href", `/repositories/${ repository.full_name }`);
});