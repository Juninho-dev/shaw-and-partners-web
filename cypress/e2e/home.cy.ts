/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should test home page", () => {
    cy.get('img[src="/logo_300.png"]').should("be.visible");
    cy.get("h1").should("contain", "GitHub Users");
    cy.get("h1").should(
      "contain",
      "Please, to start your jouney paste your GitHub personal access token here 👇"
    );
    cy.get("input").should("be.visible");
    cy.get("button").should("contain", "Go to users list!");
  });

  it("should test home page with token", () => {
    cy.get("input").type("123");
    cy.get("button").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/users");
    });
  });

  it("should test home page with token and error", () => {
    cy.get("button").click();
    cy.get("p").should("contain", "Token is required");
  })
});

// Prevent TypeScript from reading file as legacy script
export {};
