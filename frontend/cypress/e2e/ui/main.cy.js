describe('Status Page', () => {
	beforeEach(() => {
	  cy.visit('/');
	});
  
	it('should display the logo', () => {
	  cy.get('.logo').should('exist');
	  cy.get('.logo').should('have.attr', 'height', '100');
	  cy.get('.logo').should('have.attr', 'width', '100');
	});
  
	it('should display the status heading', () => {
	  cy.get('h2').contains('Status');
	});
  
	context('when authenticated', () => {
	  beforeEach(() => {
		localStorage.setItem('jwtToken', 'testToken');
		cy.reload();
	  });
  
	  it('should display the authenticated status message', () => {
		cy.get('#authStatus').contains('You are logged in.');
	  });
  
	  it('should display the logout button', () => {
		cy.get('button').contains('Logout').should('exist');
	  });
	});
  
	context('when not authenticated', () => {
	  beforeEach(() => {
		localStorage.removeItem('jwtToken');
		cy.reload();
	  });
  
	  it('should display the not authenticated status message', () => {
		cy.get('#authStatus').contains('You are not logged in.');
	  });
  
	  it('should display the login button', () => {
		cy.get('button').contains('Login').should('exist');
	  });
	});
  });