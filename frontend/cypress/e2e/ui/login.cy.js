describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display the login form', () => {
        cy.get('h2').contains('Login');
        cy.get('form').should('exist');
        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button[type="submit"]').contains('Login');
    });
});