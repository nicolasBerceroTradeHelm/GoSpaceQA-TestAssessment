const CryptoJS = require('crypto-js')

export const fillCredentials = (username, password) => {
    //This function is to hard code the username and password
    cy.get('#login_field').clear().type(username)
    cy.get('#password').type(password)
}

export const fillEmail = (username) => {
    cy.get('#login_field').clear().type(username)
}

export const fillPassword = (pass) => {
    //The passphrase is taken from the environment variables
    const passphrase = (Cypress.env("passphrase")).toString();

    //This are the functions to encrypyt and decrypt the password
    const encryptWithAES = (text) => {
        return CryptoJS.AES.encrypt(text, passphrase).toString();
    };

    const decryptWithAES = (ciphertext) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    let password = decryptWithAES(pass)

    const field = cy.get('#password');
    field.clear();
    //log:false is to avoid logging the password in the console
    field.type(password, { log: false });

    return this;
}

export const clickLogin = () => {
    cy.get('.btn').click()
}

export const validateWrongCredentials = () => {
    cy.get('.js-flash-alert').should('be.visible')
    cy.get('.js-flash-alert').should('contain', 'Incorrect username or password.')
}

export const validateRepoList = () => {
    cy.get('*[class^="public source no-description"]').should('be.visible')
}

export const getAmmountOfRepos = () => {
    cy.get('*[data-filterable-for^="your-repos-filter"]').children('li').then($classAmm => {
        let amm = (Cypress.$($classAmm).length);
        cy.wrap(amm).as('ammountOfRepos');
    })
}

export const createANewRepo = (id) => {
    cy.get('[aria-label^="Repository"]').type('test-repo' + (id + 1)).wait(4500)
    cy.get('.aBKvw > .types__StyledButton-sc-ws60qy-0').click({ force: true })
    cy.get('.mr-2.flex-self-stretch > a').contains('test-repo' + (id + 1))
}

export const validateAmmountOfRepos = () => {
    cy.visit('https://github.com/nbgospace123?tab=repositories')
    cy.get('*[data-filterable-for^="your-repos-filter"]').children('li').then($classAmm => {
        let amm = (Cypress.$($classAmm).length);

       /*  for (let i = 0; i < amm; i++) {
            cy.get('*[data-filterable-for^="your-repos-filter"]').children('li').eq(i).invoke('text').then(($repoName) => {
                //check if repo name contains test-repo1692111568088 and click
                if ($repoName.includes('test-repo1692111568088')) {
                    cy.get('*[data-filterable-for^="your-repos-filter"]').children('li').eq(i).find('[itemprop="name codeRepository"]').as('repoClick')
                }
            })
        }

        cy.get('@repoClick').click()

/*  */

        cy.get('@ammountOfRepos').then((ammountOfRepos) => {
            expect(amm).to.be.greaterThan(ammountOfRepos)
        })
    })
}