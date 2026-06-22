describe('Historico Vacinal', () => {

  beforeEach(() => {
    cy.visit('/dashboard');
    cy.wait(2000);
  });

  it('deve navegar para o historico vacinal', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.url().should('include', '/vaccine-history');
  });

  it('deve exibir as vacinas agrupadas por faixa etaria', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.wait(1000);

    cy.get('.age-group').should('have.length.greaterThan', 0);
    cy.get('app-vaccine-card').should('have.length.greaterThan', 0);
  });

  it('deve exibir badges de status nas vacinas', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.wait(1000);

    cy.get('ion-badge').should('have.length.greaterThan', 0);
  });

  it('deve filtrar vacinas por status concluida', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.wait(1000);

    cy.contains('ion-chip', 'Concluidas').click({ force: true });
    cy.wait(500);

    cy.get('ion-badge').each(badge => {
      cy.wrap(badge).should('contain', 'Concluida');
    });
  });

  it('deve mostrar todas as vacinas ao clicar em Todas', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.wait(1000);

    cy.contains('ion-chip', 'Concluidas').click({ force: true });
    cy.wait(500);
    cy.contains('ion-chip', 'Todas').click({ force: true });
    cy.wait(500);

    cy.get('app-vaccine-card').should('have.length.greaterThan', 0);
  });

  it('deve exibir o seletor de criancas no historico', () => {
    cy.ionNavigateTo('Historico Vacinal');
    cy.wait(1000);

    cy.get('app-child-selector').should('exist');
    cy.get('ion-chip').should('have.length.greaterThan', 0);
  });
});
