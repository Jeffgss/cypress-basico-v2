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

  it("Should display an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName").type("Name");
    cy.get("#lastName").type("Last Name");
    cy.get("#email").type("myemail");
    cy.get("#open-text-area").type(
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, eaque, qui rem dolor beatae excepturi expedita obcaecati ex odit illum, error labore earum dolorum cum molestiae dignissimos nostrum. Quaerat, sequi!",
      { delay: 0 }
    );

    cy.get(".button").click();

    cy.get(".error").should("be.visible");
    cy.get(".error").should("not.visible");
  });

  it("Should keep the phone field empty if a non-numeric value is entered.", () => {
    cy.get("#phone").type("my phone").should("not.have.text");
  });

  it("Should display an error message when the phone number becomes mandatory but is not filled in before submitting the form.", () => {
    cy.get("#firstName").type("Name");
    cy.get("#lastName").type("Last Name");
    cy.get("#email").type("myemail");

    cy.get("#phone-checkbox").click();

    cy.get("#open-text-area").type(
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, eaque, qui rem dolor beatae excepturi expedita obcaecati ex odit illum, error labore earum dolorum cum molestiae dignissimos nostrum. Quaerat, sequi!",
      { delay: 0 }
    );

    cy.get(".button").click();

    cy.get(".error").should("be.visible");
    cy.get(".error").should("not.visible");
  });

  it("Should fill in and clear the name, surname, email and telephone fields.", () => {
    cy.get("#firstName")
      .type("Name")
      .should("have.value", "Name")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Last Name")
      .should("have.value", "Last Name")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("email@email.com")
      .should("have.value", "email@email.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("123456789")
      .should("have.value", "123456789")
      .clear()
      .should("have.value", "");
  });

  it("Should display an error message when submitting the form without filling in the required fields.", () => {
    cy.get(".button").click();

    cy.get(".error").should("be.visible");
    cy.get(".error").should("not.visible");
  });

  it("Should submit the form successfully using a custom command.", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success")
      .should("be.visible")
      .should("contain", "Mensagem enviada com sucesso.");

    cy.get(".success").should("not.visible");
  });

  it("Should select a product (YouTube) by its text.", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Should select a product (Mentoring) by its value (value).", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
});
