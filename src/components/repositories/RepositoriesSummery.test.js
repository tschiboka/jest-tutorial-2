import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("Should Display Repository Details", () => {
    const repository = { stargazers_count: 1, open_issues: 2, forks: 5, language: "JavaScript" }
    render(<RepositoriesSummary repository={repository} />);

    Object.keys(repository).forEach(key => {
        const property = screen.getByText(new RegExp(repository[key]));
        expect(property).toBeInTheDocument();
    });
});