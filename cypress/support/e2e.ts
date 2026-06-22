Cypress.Commands.add('ionMenuOpen', () => {
  cy.get('ion-menu-button').first().click({ force: true });
  cy.wait(500);
});

Cypress.Commands.add('ionNavigateTo', (menuItem: string) => {
  cy.ionMenuOpen();
  cy.contains('ion-item', menuItem).click({ force: true });
  cy.wait(1000);
});

declare namespace Cypress {
  interface Chainable {
    ionMenuOpen(): Chainable<void>;
    ionNavigateTo(menuItem: string): Chainable<void>;
  }
}
