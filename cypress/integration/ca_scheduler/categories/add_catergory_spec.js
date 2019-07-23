describe('Add category', () => {
	context('UI', () => {
		beforeEach(() => {
			cy.caLogin();
			cy.server();
			cy.route('GET', '/api/component/component-list').as('getComponentList');
			cy.visit('/scheduler/admin/components');
			cy.get('h1').contains('Service Components').should('be.visible');
			cy.wait('@getComponentList');
		});
		it('checks for existing Categories', () => {
			cy.get('.service-components-grid').should('exist');
			cy.get('.ca-ui-tile').should('be.visible');
			cy.get('button[type=button]').contains('Customize').as('customizeButton').should('be.visible');
			cy.get('@customizeButton').click();
			cy.url().should('contain', '/scheduler/admin/components/');
		});
	});
});
