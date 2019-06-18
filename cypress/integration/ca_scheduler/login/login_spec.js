describe('Login spec', () => {
	context('UI', () => {
		beforeEach(() => {
			cy.visit('/scheduler/logout');
			cy.visit('/scheduler/login');
			cy.url().should('contain', '/login');
		});
		it('Checks to verify Login page is visible', () => {
			cy.get('button[type=submit]').contains('Get Token').should('be.visible');
		});
		it('Enters valid information and logs in successfully', () => {
			cy.get('input[name=API_USER]').focus().type('globaladmin').blur();
			cy.get('input[name=API_PASS]').focus().type('Dassen!985').blur();
			cy.get('input[name=CLIENT_ID]').focus().type('6e5f3c7ed09137546b78a09d7a45c2f1').blur();
			cy.get('input[name=CLIENT_SECRET]').focus().type('dev3_secret').blur();
			cy.get('button[type=submit]').click();
			cy.get('.club-title').contains('Totes the Goats').should('be.visible');
		});
	});
	context('API', () => {
		beforeEach(() => {
			cy.visit('/scheduler/logout');
			cy.caLogin();
			cy.visit('/scheduler/admin/entities');
		});
		it('Verifies Login landing page with Auth granted', () => {
			cy.get('.club-title').contains('Totes the Goats').should('be.visible');
		});
	});
});
