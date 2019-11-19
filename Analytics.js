class Analytics {
    constructor(selenium , logger) {
        this.selenium = selenium
        this.logger = logger
    }

    //** Return number of emails that had sent to the clients **/
    async getEmailSent(){ 
        this.logger.info(`Get number of 'Email Sent'`)
        const info = await this.selenium.findElementListBy('className' , 'badge') 
        return await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[1]) // Return number of emailSent
    }

    //** Return how many clients are outstanding **/
    async getOutstandingClients(){ 
        this.logger.info(`Get number of 'Outstanding Clients'`)
        const info = await this.selenium.findElementListBy('className' , 'badge') 
        return await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[2]) // Return number of outstanding clients
    }

    //** Validate if the hottest country is realy the hottest country **/
    async hottestCountry(){ 
        this.logger.info(`Start 'hottestCountry' function`)
        const salesDiv = await this.selenium.findElementBy('className' , 'sales-by-param-chart') 
        const info = await this.selenium.findElementListBy('className' , 'badge') 
        const hotCountry = await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[3]) // Get hottest country

        const arrGTag = await this.selenium.findElementListBy('className' , `recharts-layer recharts-bar-rectangle` , salesDiv) // Creat array with all the columns
        let biggest = 0 
        let country = " " 
        for(let g of arrGTag){ // Run over the array of columns
            await this.selenium.clickElement('tagName' , 'path' , null , g)
            let numOfSales = await this.selenium.getTextFromElement('className' , 'recharts-tooltip-item-value')
            let nameOfCountry = await this.selenium.getTextFromElement('className' , 'recharts-tooltip-label' , null , salesDiv)
            numOfSales = parseInt(numOfSales) 
            if(numOfSales > biggest){ // Equal between number of sales and the biggest number of sales
                biggest = numOfSales 
                country = nameOfCountry
            }
        }
        if(hotCountry == country){ // If the hottest country is the one with the most sales, return true. otherwise return false
            this.logger.info(`End 'hottestCountry' function - '${hotCountry}' is the Hottest country!`)
            return true
        }
        this.logger.error(`End 'hottestCountrt' function - '${hotCountry}' is Not the hottest country! --> The real hottest country is '${country}'`)
        return false
    }
}

module.exports = Analytics

