Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Name");
  cy.get("#lastName").type("Last Name");
  cy.get("#email").type("email@email.com");
  cy.get("#open-text-area").type(
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, eaque, qui rem dolor beatae excepturi expedita obcaecati ex odit illum, error labore earum dolorum cum molestiae dignissimos nostrum. Quaerat, sequi!",
    { delay: 0 }
  );
  cy.get(".button").click();
});
