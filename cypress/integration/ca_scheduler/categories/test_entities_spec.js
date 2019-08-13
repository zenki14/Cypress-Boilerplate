describe('Add category', () => {
	let componentId;
	let componentName;
	let entityList;
	context('UI', () => {
		beforeEach(() => {
			cy.caLogin();
			cy.server();
			cy.route('GET', '/api/component/components').as('getComponentList');
			cy.visit('/club-settings/components');
			cy.get('h1').contains('Service Components').should('be.visible');
			cy.wait('@getComponentList').then((response) => {
				if (response.status === 200) {
					componentId = response.responseBody.data[0].id;
					componentName = response.responseBody.data[0].name;
					cy.log(componentId);
					cy.log(componentName);
				}
			});
		});
		it('checks for existing Components', () => {
			cy.get('.service-components-grid').should('exist');
			cy.get('.ca-ui-tile').contains(componentName).as('existingComp').should('exist');
			cy.get('@existingComp').parent().parent().contains('Customize').as('customizeButton').should('be.visible');
			cy.get('@customizeButton').click();
			cy.url().should('contain', '/club-settings/components/' + componentId);
		});
		it('verifies existing Component Customize view', () => {
			cy.route('GET', '/api/component/components/' + componentId).as('compDetails');
			cy.visit('/club-settings/components/' + componentId);
			cy.wait('@compDetails').then((response) => {
				if (response.status === 200) {
					entityList = response.responseBody.data.entities;
					cy.log(entityList);
				}
			});
		});
		context('dynamic entities', () => {
			beforeEach(() => {
				cy.caLogin();
				cy.server();
				cy.route('GET', '/api/component/components/' + componentId).as('compDetails');
				cy.visit('/club-settings/components/' + componentId);
				cy.wait('@compDetails');
				cy.get('@compDetails').its('responseBody.data.entities').as('entities');
			});
			describe('fetched Entities', () => {
				Cypress._.range(0, 4).forEach((k) => {
					it(`# ${k}`, function() {
						const entity = this.entities[k];
						cy.log(`entity ${entity.id} ${entity.name}`);
						cy.wrap(entity).should('have.property', 'name');
						cy.get('.cru-card-read').contains(entity.name).should('be.visible');
					});
				});
			});
		});
	});
});
