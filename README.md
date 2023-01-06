# GoSpaceQA-TestAssessment
Github Repo Link
https://github.com/nicolasBerceroTradeHelm/GoSpaceQA-TestAssessment

Installing Cypress (node.js required)
https://docs.cypress.io/guides/getting-started/installing-cypress

Npm Library required
https://www.npmjs.com/package/crypto-js

How To Run

-Download the repo
-Install the library if it's not downloaded automatically
-point to the downloaded folder and open it on cmd
-type "npx cypress open --env GITHUB_TOKEN=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,passphrase=GoSpace"
    * GITHUB_TOKEN is used to authenticate GitHub user
    * passphrase is used for password encryption
-The cypress application is open
-Click on e2e testing and select the browser desired 
-Click one of the 2 tests you want to run

in case of the Github token not working you will need to generate a new one.
It happened for me a couple of times and i didnt find a way to solve it
video tutorial
https://www.youtube.com/watch?v=5djgwx9aWrg

you will need to change it on the lunch parameters (GITHUB_TOKEN)
this are the github credential for the test user
username = nbgospace@gmail.com
password = GoSpace123!