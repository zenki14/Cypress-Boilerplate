describe('Adds an area', () => {
	beforeEach(() => {
		cy.caLogin();
		cy.visit('club-settings/areas/new?entityId=17');
		cy.url().should('contain', '/new?entityId=17');
	});
	it('Verifies page load with expected entity used', () => {
		cy.get('.selection-text').contains('Automation_Entity').should('be.visible');
	});
	it('Adds required values and submits successfully', () => {
		cy.server();
		cy.route('POST', '/api/club/location/areas').as('addArea');
		cy.get('input[name=name]').focus().type('AAN ' + Date.now()).blur();
		cy.get('input[name=classification]').focus().type('AAC ' + Date.now()).blur();
		cy.get('input[name="resource.0.name"]').focus().type('AAR ' + Date.now()).blur();
		cy.get('#area-submit').contains('Submit').click();
		cy.wait('@addArea');
		cy.url().should('contain', '/club-settings/areas/');
	});
});
