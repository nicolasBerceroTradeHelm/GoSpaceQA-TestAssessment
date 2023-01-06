import * as api from "../fixtures/functions.js";

describe('template spec', () => {

	it('Create a repository', () => {
    //Create a repo to populate the list
		api.createRepo()
	})

	it('List of Git Repositories', () => {
    //Get the list of repositories and validate that the repo jsut created is there
    api.getRepoList()
	})

	it('Delete a repository', () => {
    //Delete all the repositories created
    api.deleteRepo()
	})

})
