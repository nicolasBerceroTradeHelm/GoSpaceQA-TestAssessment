import * as selectors from "../fixtures/gitHubSelectors.js";
import * as api from "../fixtures/functions.js";
//Id is an unquite number based on the date and time
const id = Date.now();
const username = 'nbgospace@gmail.com'

describe('UI Testing', () => {

	before(() => {
        //Create a repo to populate the list
        api.createRepo()
    })

    it('Validate Login', () => {
        cy.visit('https://github.com/login')
        //Validate Wrong Credentials
        selectors.fillCredentials(username, 'WrongPassword')
        selectors.clickLogin()
        selectors.validateWrongCredentials()
        //Validate Correct Credentials and validate the list of repos
        selectors.fillEmail(username)
        selectors.fillPassword('U2FsdGVkX1/TRztD0l/s90480RW8ydUmDLKzowJC5iw=')
        selectors.clickLogin()
        //Front end Validation
        selectors.validateRepoList()
    })

    it('Validate Repo List', () => {
        cy.visit('https://github.com/login')
        selectors.fillEmail(username)
        selectors.fillPassword('U2FsdGVkX1/TRztD0l/s90480RW8ydUmDLKzowJC5iw=')
        selectors.clickLogin()
        cy.visit('https://github.com/nbgospace123?tab=repositories')
        selectors.getAmmountOfRepos()
        //Create a new repo and validate that the ammount increased
        cy.visit('https://github.com/new')
        selectors.createANewRepo(id)
        //Validates that the ammount of repos in greater than before
        //repo Ammount is saved as "ammountOfRepos" in the previous step
        selectors.validateAmmountOfRepos()
    })

    it('Delete all Repos', () => {
        //The delete is left at the end to make sure that data is deleted
        //no matter what happens in the previous tests
        api.deleteRepo()
    })

})

