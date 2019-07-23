describe('Edits an Existing Area', () => {
	let assertAreaName;
	let assertAreaId;
	beforeEach(() => {
		cy.caLogin();
		cy.caSeedArea();
		cy.server();
		cy.route('GET', '/api/club/location/area-list?entityIds=17').as('getAreas');
		cy.route('GET', '/api/club/details').as('getAreaDetails');
		cy.route('PUT', '/api/club/location/area').as('putArea');
		cy.visit('/scheduler/admin/entities/17');
		cy.wait('@getAreas').then((response) => {
			if (response.status === 200) {
				const newArea = response.responseBody.data;
				const areaName = newArea.pop();
				assertAreaName = areaName.name;
				// cy.log(areaName);
				assertAreaId = areaName.id;
			}
		});
	});
	it('verifies seeded area via Areas list view', () => {
		cy.get('h3').contains(assertAreaName).should('exist');
	});
	it('verifies edit view of an existing Area can be navigated to via the UI', () => {
		cy.get('.tile-content').contains(assertAreaName).as('areaToEdit').should('exist');
		cy.get('@areaToEdit').scrollIntoView().parent().as('areaParent').should('be.visible');
		cy.get('@areaParent').parent().find('.tile-action').click();
		cy.get('h1').should('contain', assertAreaName);
	});
	it('verifies URL navigation to existing Area', () => {
		cy.visit('/scheduler/admin/areas/' + assertAreaId + '?entityId=17');
		cy.get('h1').should('contain', assertAreaName);
	});
	it('edits the Area Name of an existing Area via the UI', () => {
		cy.visit('/scheduler/admin/areas/' + assertAreaId + '?entityId=17');
		cy.wait('@getAreaDetails');
		cy.get('.area-info').should('be.visible');
		cy.get('.card-edit').should('be.visible');
		cy.get('.card-edit').first().click();
		cy.get('.edit-save').contains('Save').as('saveAreaEdit').should('be.visible');
		cy
			.get(':nth-child(1) > .ca-ui-text-input > label > .text-input')
			.focus()
			.type('{home}{del}{del}{del}{del}Edit')
			.blur();
		cy.get('@saveAreaEdit').click();
		cy.wait('@putArea');
		cy.get('@putArea').then((xhr) => {
			cy.log(xhr.requestBody.name);
			cy.wrap(xhr.requestBody.name).as('putAreaName');
			cy.get('.is-active').contains('Areas').click();
			cy.wait('@getAreas');
			cy.get('.tile-content').contains(assertAreaName).should('not.exist');
			cy.get('.tile-content').contains(this.putAreaName).should('exist');
		});
	});
});
