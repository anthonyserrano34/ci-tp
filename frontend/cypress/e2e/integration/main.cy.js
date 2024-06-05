describe('Authentication Workflow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

	it('should be disconnected', () => {
		cy.visit('/');
		cy.get('p').should('contain', 'You are not logged in.');
	});

    it('should display the login form', () => {
        cy.get('h2').contains('Login');
        cy.get('form').should('exist');
        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button[type="submit"]').contains('Login');
    });

    it('should display an error message for invalid credentials', () => {
        cy.get('input#username').type('invalidUser');
        cy.get('input#password').type('invalidPass');
        cy.get('button[type="submit"]').click();
        
        cy.get('p').should('contain', 'Login failed.');
    });

	it('should display an error message for empty credentials', () => {
		cy.get('button[type="submit"]').click();
		cy.get('p').should('contain', 'Login failed.');
	});

	it('should register a new user', () => {
		cy.visit('/register');
		cy.get('input#username').type('testUser');
		cy.get('input#password').type('testPassword');
		cy.get('button[type="submit"]').click();
		cy.get('p').should('contain', 'Registration successful!');
	});

    it('should login successfully with valid credentials', () => {
        cy.intercept('POST', 'http://localhost:5000/api/login', {
            statusCode: 200,
        }).as('loginRequest');
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPassword');
        cy.get('button[type="submit"]').click();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
        cy.get('p').should('contain', 'Login successful!');
		cy.visit('/');
		cy.get('p').should('contain', 'You are logged in.');
    });
});
