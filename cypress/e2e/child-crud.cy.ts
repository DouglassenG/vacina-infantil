describe('CRUD de Criancas', () => {

  beforeEach(() => {
    cy.visit('/dashboard');
    cy.wait(2000);
  });

  it('deve exibir o dashboard com o seletor de criancas', () => {
    cy.get('app-child-selector').should('exist');
    cy.get('ion-chip').should('have.length.greaterThan', 0);
  });

  it('deve exibir os contadores de vacinas no dashboard', () => {
    cy.contains('Concluidas').should('be.visible');
    cy.contains('Agendadas').should('be.visible');
    cy.contains('Atrasadas').should('be.visible');
  });

  it('deve alternar entre criancas no seletor', () => {
    cy.get('ion-chip').eq(0).click({ force: true });
    cy.wait(1000);
    cy.get('.info-card h2').should('exist');

    cy.get('ion-chip').eq(1).click({ force: true });
    cy.wait(1000);
    cy.get('.info-card h2').should('exist');
  });

  it('deve navegar para o perfil da crianca', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.url().should('include', '/child-profile');
    cy.get('.profile-card').should('exist');
  });

  it('deve abrir o formulario de cadastro ao clicar no botao +', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.get('ion-header ion-button').last().click({ force: true });
    cy.wait(500);
    cy.get('.form-card').should('be.visible');
    cy.contains('Nova Crianca').should('be.visible');
  });

  it('deve cadastrar uma nova crianca (CREATE)', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.get('ion-header ion-button').last().click({ force: true });
    cy.wait(500);

    cy.get('.form-card ion-input').eq(0).type('Teste Cypress', { force: true });
    cy.get('.form-card ion-input').eq(1).type('2024-06-15', { force: true });

    cy.get('.save-button').click({ force: true });
    cy.wait(2000);

    cy.get('ion-chip').should('contain', 'Teste Cypress');
  });

  it('deve exibir os dados da crianca no perfil (READ)', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.wait(1000);

    cy.get('.profile-card').within(() => {
      cy.contains('Nome').should('be.visible');
      cy.contains('Idade').should('be.visible');
      cy.contains('Genero').should('be.visible');
      cy.contains('Data de Nascimento').should('be.visible');
    });
  });

  it('deve abrir o formulario de edicao preenchido (UPDATE)', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.wait(1000);

    cy.contains('ion-button', 'Editar').click({ force: true });
    cy.wait(500);

    cy.get('.form-card').should('be.visible');
    cy.contains('Editar Crianca').should('be.visible');
    cy.get('.form-card ion-input').eq(0).should('not.have.value', '');
  });

  it('deve exibir confirmacao antes de excluir (DELETE)', () => {
    cy.ionNavigateTo('Perfil da Crianca');
    cy.wait(1000);

    cy.contains('ion-button', 'Excluir').click({ force: true });
    cy.wait(500);

    cy.get('ion-alert').should('be.visible');
    cy.contains('Confirmar exclusao').should('be.visible');
    cy.contains('Cancelar').click({ force: true });
  });
});
