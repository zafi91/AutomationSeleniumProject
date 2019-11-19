const BasePage = require('./BasePage')
const Actions = require('./Actions')
const Home = require('./Home')
const Clients = require('./Clients')

class ActionsTest{
    constructor(){
        this.basePage = new BasePage()
        this.selenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.actions = new Actions(this.selenium , this.logger)
        this.home = new Home(this.selenium , this.logger)
        this.clients = new Clients(this.selenium , this.logger)
    }

    //** Main method - run all the test cases **/
    //** Notice - In line 22 'updateClient' is invoke with small letters which is wrong --> Negative test */
    async runTest(){
        this.logger.info(`Start testing 'Actions page'`)
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Actions') // Nevigate to actions page
        await this.addClient('Zafrir' , 'Freits' , 'israel' , 'Janice Alvarado' , 'zafrirr@gmail.com') // Functional test
        await this.updateClient('Zafrir Freits' , 'Jhon') // Functinal test
        await this.negativeUpdateClient('Zafrir Freits', 'Jhon') // Negative test
        await this.selenium.close() // Close browser
        this.logger.info(`Finish testing 'Action page'`)
    }

    // Functional test - Update client and validate that client is updated
    async updateClient(name , owner , emailType , sold){ 
        this.logger.info(`Start (functional Test) - 'updateClient' function`)
        await this.actions.updateClient(name , owner , emailType , sold)
        await this.home.clickOn('Clients') 
        if(await this.clients.searchClient(name , 'name')){ 
            await this.home.clickOn('Actions')
            return this.logger.info(`End - 'updateClient' function is working!`)
        }
        this.logger.error(`End - 'updateClient' function is not working!`)
        await this.home.clickOn('Actions') // Back to actions page
    }

    // Functional test - Add new client and validate that client is added
    async addClient(Fname , Lname , country , owner , email){
        this.logger.info(`Start (Functional Test) - 'addClient' function`)
        await this.actions.addClient(Fname , Lname , country , owner , email) // Add new client
        await this.home.clickOn('Clients') // Nevigate to clients page
        if(await this.clients.searchClient(`${Fname} ${Lname}` , 'name')){
            this.logger.info(`End - 'addClient' function is working!`)
        }else{
            this.logger.error(`End - 'addClient' function is working!`)
        }
        await this.home.clickOn('Actions') // Back to actions page
    }

    async negativeUpdateClient(name , owner , emailType , sold){
        this.logger.info(`Start (Negative Test) - 'updateClient' function`)
        await this.actions.updateClient(name , owner , emailType , sold)
        await this.home.clickOn('Clients') 
        if(await this.clients.searchClient(name , 'name')){ 
            await this.home.clickOn('Actions')
            return this.logger.info(`End - 'updateClient' function is working! - Negative faild!`)
        }
        this.logger.error(`End - 'updateClient' function is not working! - Negative succssed!`)
        await this.home.clickOn('Actions') // Back to actions page
    }
}

const action = new ActionsTest()
action.runTest()