describe("Тестирование открытия модального окна при ошибке", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080);
    cy.intercept("GET", "http://localhost:3000/**", {
      statusCode: 404,
    });
  });

  it("Открытие модального окна", () => {
    cy.get("[data-test=modal").should("be.visible");
  });

  it("Закрытие модального окна", () => {
    cy.get("[data-test=modal-close").click();
    cy.get("[data-test=modal").should("not.be.visible");
  });

  it("Клик вне модального окна когда оно открыто", () => {
    cy.get("[data-test=modal]").wait(500).click("topRight");
    cy.get("[data-test=modal").should("not.be.visible");
  });
});
