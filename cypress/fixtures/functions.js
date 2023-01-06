//Id is an unquite number based on the date and time
const id = Date.now();
//Authorization token is taken from the environment variables
const authorization = 'Bearer ' + Cypress.env('GITHUB_TOKEN')
//This is the token in case you want to use it to hardcode it
//const authorization = 'Bearer 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'

export function stringify(obj) {
    //function to convert the object to a string
    return JSON.stringify(obj)
}

export const createRepo = () => {

    cy.request({
        method: 'POST',
        url: `https://api.github.com/user/repos`,
        headers: {
            authorization,
        },
        body: {
            name: 'test-repo' + id,
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name', 'test-repo' + id)
    })
}

export const getRepoList = () => {

    cy.request({
        method: 'GET',
        url: `https://api.github.com/users/nbgospace123/repos`,
        headers: {
            authorization,
        }
    }).then((response) => {
        function findLengthArray(response) {
            //find the last index of the array, which is the last repository created. 
            //this helps with the reduction of errors when running the test multiple times
            return (response.body.length) - 1;
        }
  
        let lengthArray = findLengthArray(response);
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
        expect(response.body[lengthArray]).to.have.property('name')
        expect(response.body[lengthArray].name).to.eq('test-repo' + id)
    })
}

export const deleteRepo = () => {

    cy.request({
        method: 'GET',
        url: `https://api.github.com/users/nbgospace123/repos`,
        headers: {
            authorization,
        }
    }).then((response) => {
        function findLengthArray(response) {
            //find the last index of the array, which is the last repository created. 
            return (response.body.length);
        }
  
        let lengthArray = findLengthArray(response);
        
        for(let i = 0; i < lengthArray; i++) {
            //delete all the repositories created

            //Get the name of the repository to delete
            let repoId = response.body[i].name

            cy.request({
                method: 'DELETE',
                url: `https://api.github.com/repos/nbgospace123/${repoId}`,
                headers: {
                    authorization,
                }
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        }

    })
    
}
