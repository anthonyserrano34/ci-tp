describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('should display the register form', () => {
        cy.get('h2').contains('Register');
        cy.get('form').should('exist');
        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button[type="submit"]').contains('Register');
    });
});