describe("Тестирование открытия боковой панели", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/servers.json", {
      fixture: "servers.json",
    });
    cy.intercept("GET", "**/users.json", {
      fixture: "users.json",
    });
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080);
  });

  it("Открытие боковой панели", () => {
    cy.get(".servers .table-elements__body .table-elements__line").click();
    cy.get(".info .table-elements__body .table-elements__line").click();
    cy.get(".info .sidebar").should("be.visible");
  });

  it("Закрытие боковой панели", () => {
    cy.get(".servers .table-elements__body .table-elements__line").click();
    cy.get(".info .table-elements__body .table-elements__line").click();
    cy.get(".info .sidebar .sidebar__close").wait(500).click();
    cy.get(".info .sidebar").should("not.be.visible");
  });

  it("Клик вне боковой панели когда она открыта", () => {
    cy.get(".servers .table-elements__body .table-elements__line").click();
    cy.get(".info .table-elements__body .table-elements__line").click();
    cy.get(".info .sidebar").wait(500).click("center");
    cy.get(".info .sidebar").should("not.be.visible");
  });
});
