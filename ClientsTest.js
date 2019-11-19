const BasePage = require('./BasePage')
const Clients = require('./Clients')
const Home = require('./Home')

class ClientsTest{
    constructor(){
        this.basePage = new BasePage()
        this.selenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.clients = new Clients(this.selenium , this.logger)
        this.home = new Home(this.selenium , this.logger)
    }

    //** Main method - run all the test cases **/
    
    async runTest(){
        this.logger.info(`Start testing 'Clients page'`)
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Clients') // Nevigate to clients page
        await this.searchClient('Zafrir Freits' , 'name') // Functinal test
        await this.editClient('Zafrir Freits' , 'name' , 'Elevation' , 'name') // Functional test
        await this.deleteClient('Elevation' , 'name') // Functional test
        await this.selenium.close() // Close browser
        this.logger.info(`Finish testing 'Clients page'`)
    }

    // Fanctional test - search and validate client exist
    async searchClient(input , searchBy){
        this.logger.info(`Start (Functional Test) - 'Search Client' function`)
        if(await this.clients.searchClient(input , searchBy)){
            return this.logger.info(`End - 'Search client' function is working!`)
        }
        return this.logger.error(`End - 'Search Client' function is not working!`)
    }

    // Functional test - edit client and validate changes
    async editClient(input , searchBy , newInput , editBy){
        this.logger.info(`Start (Functional Test) - 'Edit client' function`)
        if(await this.clients.editClient(input , searchBy , newInput , editBy)){
            return this.logger.info(`End - 'Edit Client' function is working!`)
        }
        return this.logger.error(`End - 'Edit Client' function is not working!`)
    }

    // Functional test - delete client and validate client is not exist anymore
    async deleteClient(input , searchBy){
        this.logger.info(`Start (Functional Test) - 'Delete client' function`)
        if(await this.clients.deleteClient(input,searchBy)){
            return this.logger.info(`End - 'Delete Client' function is working!`)
        }
        return this.logger.error(`End - 'Delete Client' function is not working!`)
    }
}

const client = new ClientsTest()
client.runTest()