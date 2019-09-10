describe('Login spec', () => {
	context('UI', () => {
		beforeEach(() => {
			cy.visit('/scheduler/logout');
			cy.visit('/club-settings/login');
			cy.url().should('contain', '/login');
		});
		it('Checks to verify Login page is visible', () => {
			cy.get('button[type=submit]').contains('Get Token').should('be.visible');
		});
		it('Enters valid information and logs in successfully', () => {
			cy.get('input[name=API_USER]').focus().type('globaladmin').blur();
			cy.get('input[name=API_PASS]').focus().type('Dassen!985').blur();
			cy.get('input[name=CLIENT_ID]').focus().type('ls_id').blur();
			cy.get('input[name=CLIENT_SECRET]').focus().type('ls_secret').blur();
			cy.get('button[type=submit]').click();
			cy.get('.club-title').contains('Deerfield Athletic Association').should('be.visible');
		});
	});
	context('API', () => {
		beforeEach(() => {
			cy.visit('/club-settings/entities');
		});
		it('Verifies Login landing page with Auth granted', () => {
			cy.get('.club-title').contains('Deerfield Athletic Association').should('be.visible');
		});
	});
});
