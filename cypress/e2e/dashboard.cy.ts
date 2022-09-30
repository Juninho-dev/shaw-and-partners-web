/* eslint-disable */

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('input').type(Cypress.env('NEXT_GIT_TOKEN'));
    cy.get('button').click();
  })

  it("should check users is listed", () => {
    cy.get('h1').should('contain', 'GitHub Users');
    cy.get("#__next > main > div > div > div:nth-child(1)").should('be.visible');
  });
});