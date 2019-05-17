//Set reference type for Intellisence. *Not Required*
/// <reference types="Cypress" />

//Set some helpful variables.
const aNewHope = 'https://swapi.co/api/films/1/';
const obiWanKenobi = 'https://swapi.co/api/people/10/';
const chewbacca = 'https://swapi.co/api/people/13/';
const wookiee = 'https://swapi.co/api/species/3/';
const starshipsPage1 = 'https://swapi.co/api/starships/?page=1';
const starshipsPage2 = 'https://swapi.co/api/starships/?page=2';
const starshipsPage3 = 'https://swapi.co/api/starships/?page=3';
const starshipsPage4 = 'https://swapi.co/api/starships/?page=4';
const enterpriseSearch = 'https://swapi.co/api/starships/?search=Enterprise';

//State the feature being tested.
describe('Starwars API', () => {
	beforeEach(() => {
		//Assert that JSON is being returned from the API before each test.
		cy.request('/').its('headers').its('content-type').should('include', 'application/json');
	});

	//Set the context of the following group of tests.
	context('Positive Tests', () => {
		it('asserts that Obi-Wan Kenobi appears in A New Hope', () => {
			//Create a variable that contains a function that makes a GET request to
			//Obi-Wan Kenobi's json object.
			const getObiWan = () => cy.request(obiWanKenobi);

			//Create a variable that contains a function that makes a GET request to
			//A New Hope's json object.
			const getANewHope = () => cy.request(aNewHope);

			//Make a GET request to Obi-Wan's JSON object, then assert that the response
			//contains a 'name' property that equals Obi-Wan Kenobi. Assert that the response
			//also contains a films property that is an array containing A New Hope. To verify
			//that the value matches A New Hope, it cross references the film's string value
			//by asserting that the value listed has a 'title' of A New Hope.

			//*Assertions made with Chai*
			getObiWan().then((response) => {
				expect(response.body).to.have.property('name', 'Obi-Wan Kenobi');
				expect(response.body.films).to.be.an('array').that.includes(aNewHope);
			});
			getANewHope().then((response) => {
				expect(response.body).to.have.property('title', 'A New Hope');
			});

			//*Assertions made with Cypress*
			getObiWan().its('body').its('name').should('eq', 'Obi-Wan Kenobi');
			getObiWan().its('body').its('films').should('include', aNewHope);
			getANewHope().its('body').its('title').should('eq', 'A New Hope');
		});
		it('asserts that Chewbacca is a Wookiee', () => {
			//Makes a GET request to verify that Chewbacca exists and then verifies that the
			//species value matches the expected value. In this case, a Wookiee. It also
			//verifies that the listed species array in the characters response matches that
			//of Wookiee by making a GET request to the matching species value.
			const getChewbacca = () => cy.request(chewbacca);
			const getWookiee = () => cy.request(wookiee);
			//*Assertions made with Chai*
			getChewbacca().then((response) => {
				expect(response.body).to.have.property('name', 'Chewbacca');
				expect(response.body.species).to.be.an('array').that.includes(wookiee);
			});
			getWookiee().then((response) => {
				expect(response.body).to.have.property('name', 'Wookiee');
			});
			//*Assertions made with Cypress*
			getChewbacca().its('body.name').should('eq', 'Chewbacca');
			getChewbacca().its('body.species').should('include', wookiee);
			getWookiee().its('body.name').should('eq', 'Wookiee');
		});
		it('asserts that the /starships endpoint returns expected fields', () => {
			//This verifies that a response to a request made to the /starships endpoint contains
			//specific properties. It makes a GET request to /starships, then compares the response
			//to the expected values by taking the first starship returned, then verifying that
			//the response contains the expected properties. This test can certainly be improved
			//by wrapping the request and being able to loop through the response to look for the
			//properties expected with only a single API call, but I wanted it to be readable and
			//more of a step by step process for this case.
			const getStarships1 = () => cy.request(starshipsPage1);
			//*Assertions made with Chai*
			getStarships1().then((response) => {
				expect(response.body.results).to.be.an('array');
				expect(response.body.results[0]).to.have.property('name');
				expect(response.body.results[0]).to.have.property('model');
				expect(response.body.results[0]).to.have.property('crew');
				expect(response.body.results[0]).to.have.property('hyperdrive_rating');
				expect(response.body.results[0]).to.have.property('pilots');
				expect(response.body.results[0]).to.have.property('films');
			});
			//*Assertions made with Cypress*
			getStarships1().its('body.results.0.name').should('exist');
			getStarships1().its('body.results.0.model').should('exist');
			getStarships1().its('body.results.0.crew').should('exist');
			getStarships1().its('body.results.0.hyperdrive_rating').should('exist');
			getStarships1().its('body.results.0.pilots').should('exist');
			getStarships1().its('body.results.0.films').should('exist');
		});
	});
	//Set the context of the following group of tests
	context('Negative Tests', () => {
		it('fails to assert that the Enterprise appears in Starwars', () => {
			//This test makes a GET request to the /starships endpoint by using the query string
			//param of "Enterprise". This makes use of the ability to filter responses based on
			//matching strings. The reason we do this is that there are multiple pages of info
			//and we didn't want to make a request to each page looking for the Enterprise.
			//We are also under the assumption that this feature works as expected. After making
			//this request, we expect that the response should containe a name prop of Enterprise,
			//which obviously fails.
			const getEnterprise = () => cy.request(enterpriseSearch);
			//*Assertions made with Chai*
			getEnterprise().then((response) => {
				expect(response.body.results).to.have.property('name', 'Enterprise');
			});
			//*Assertions made with Cypress*
			getEnterprise().its('body.results.0.name').should('eq', 'Enterprise');
		});
	});
});
