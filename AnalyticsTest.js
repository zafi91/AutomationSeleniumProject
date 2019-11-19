const BasePage = require('./BasePage')
const Analytics = require('./Analytics')
const Home = require('./Home')
const Actions = require('./Actions')

class AnalyticsTest{
    constructor(){
        this.basePage = new BasePage()
        this.selenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.analytics = new Analytics(this.selenium , this.logger)
        this.home = new Home(this.selenium , this.logger)
        this.actions = new Actions(this.selenium , this.logger)
    }
    //** Main method - run all the test cases **/
    async runTest(){
        this.logger.info(`Start testing 'Analytics page'`)
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Analytics') // Nevigate to analytics page
        await this.getEmailSent() // Functional test
        await this.getOutstandingClients() // Functional test
        await this.hottestCountry() // Functional test
        await this.selenium.close() // Close browser
        this.logger.info(`Finish testing 'Analytics page'`)
    }

    // Functional test - Sent an email and validate increase email sent
    async getEmailSent(){
        this.logger.info(`Start (Functional test) - 'Email sent' function`)
        const beforeSent = await this.analytics.getEmailSent() // Get number of email sent 
        await this.home.clickOn('Actions') 
        await this.actions.updateClient('Zafrir Freits' , null , 'B') 
        await this.home.clickOn('Analytics') 
        const afterSent = await this.analytics.getEmailSent() // Get new number of email sent
        if(beforeSent < afterSent){ // Equal between numbers and print result
            return this.logger.info(`End - 'Email sent' function is working!`)
        }
        return this.logger.error(`End - 'Email sent' function is not working!`)
    }
    
    // Functional test - Mark 'Sold' to a client and validate decrease number of outstanding clients
    async getOutstandingClients(){
        this.logger.info(`Start (Functional Test) - 'Outstanding clients' function`)
        const before = await this.analytics.getOutstandingClients() // Get number of outstanding clients
        await this.home.clickOn('Actions') 
        await this.actions.updateClient('Zafrir' , null , null , true)
        await this.home.clickOn('Analytics') 
        const after = await this.analytics.getOutstandingClients() // Get new number of outstanding clients
        if(before > after){ // Equal between numbers and print result
            return this.logger.info(`End - 'Outstanding client' function is work!`)
        }
        return this.logger.error(`End - 'Outstanding client' function doesn't work!`)
    }

    // Functional test - Validate that the hottest country is realy the country with the most clients
    async hottestCountry(){
        this.logger.info(`Start (Functional Test) - 'Hottest country' function`)
        if(await this.analytics.hottestCountry()){
            return this.logger.info(`End - 'Hottest country' is working`)
        }
        return this.logger.info(`End - 'Hottest country' does'nt work!`)
        
    }
}

const analytic = new AnalyticsTest()
analytic.runTest()