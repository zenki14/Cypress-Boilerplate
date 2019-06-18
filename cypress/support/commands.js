// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('caLogin', () => {
	cy
		.request({
			method: 'POST',
			url: '/client/auth/authorize',
			body: {
				grant_type: 'password',
				password: 'Dassen!985',
				scope: 'public private',
				username: 'globaladmin'
			},
			headers: {
				Accept: 'application/json, text/plain, */*',
				Authorization: 'Basic NmU1ZjNjN2VkMDkxMzc1NDZiNzhhMDlkN2E0NWMyZjE6ZGV2M19zZWNyZXQ='
			}
		})
		.then((response) => {
			expect(response.body.access_token).to.exist;
			window.sessionStorage.setItem('scope', response.body.scope);
			window.sessionStorage.setItem('tokenType', response.body.token_type);
			window.sessionStorage.setItem('accessToken', response.body.access_token);
		});
});
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
