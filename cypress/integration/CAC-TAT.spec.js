/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Should check the application title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Should fill in the mandatory fields and submit the form", () => {
    cy.get("#firstName").type("Name");
    cy.get("#lastName").type("Last Name");
    cy.get("#email").type("email@email.com");
    cy.get("#open-text-area").type(
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, eaque, qui rem dolor beatae excepturi expedita obcaecati ex odit illum, error labore earum dolorum cum molestiae dignissimos nostrum. Quaerat, sequi!",
      { delay: 0 }
    );
    cy.get(".button").click();

    cy.get(".success")
      .should("be.visible")
      .should("contain", "Mensagem enviada com sucesso.");

    cy.get(".success").should("not.visible");
  });
});
