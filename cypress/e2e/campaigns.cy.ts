describe('Campanhas de Vacinacao', () => {

  beforeEach(() => {
    cy.visit('/dashboard');
    cy.wait(2000);
  });

  it('deve navegar para a pagina de campanhas', () => {
    cy.ionNavigateTo('Campanhas');
    cy.url().should('include', '/campaigns');
  });

  it('deve exibir a listagem de campanhas', () => {
    cy.ionNavigateTo('Campanhas');
    cy.wait(1000);

    cy.get('ion-card').should('have.length.greaterThan', 0);
  });

  it('deve exibir badge de status ativa nas campanhas vigentes', () => {
    cy.ionNavigateTo('Campanhas');
    cy.wait(1000);

    cy.get('ion-badge').contains('Ativa').should('exist');
  });

  it('deve exibir campanhas ativas no dashboard', () => {
    cy.visit('/dashboard');
    cy.wait(2000);

    cy.contains('Campanhas Ativas').should('be.visible');
    cy.get('app-campaign-banner').should('have.length.greaterThan', 0);
  });

  it('deve exibir detalhes da campanha com faixa etaria e periodo', () => {
    cy.ionNavigateTo('Campanhas');
    cy.wait(1000);

    cy.get('ion-card').first().within(() => {
      cy.contains('Faixa etaria').should('be.visible');
      cy.contains('Periodo').should('be.visible');
    });
  });
});
