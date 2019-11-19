class Clients {
    constructor(selenium , logger) {
        this.selenium = selenium
        this.logger = logger
	}

    //Get input and searchBy , return true or false if client exist
    async searchClient(input, searchBy){
        this.logger.info(`Start 'searchClient' function with values: '${input} By: '${searchBy}'`)
        searchBy = searchBy.toLowerCase()
        input = input.toLowerCase()
        let table = []
        // Search client by input and searchBy
        const searchElement = await this.selenium.findElementBy('className', 'search-clients')
        await this.selenium.write(input , 'tagName' , 'input' , null , searchElement)
        await this.selenium.write(searchBy , 'tagName' , 'select' , null , searchElement)
        // Validate that client is exist
        table = await this.selenium.findElementListBy('className' , 'clientDetails')
        if(table.length < 1){ // if there is no values in 'table' --> there is no clients found
            this.logger.error(`End 'searchClient' function - Cannot find value = '${input}' By '${searchBy}'`)
            await this.selenium.clearElementField('tagName' , 'input' , null , searchElement)
            return false
        }
        for(let row of table){ // run over clients how found
            const arrTH = await this.selenium.findElementListBy("tagName" , "th" , row)
            if(searchBy == 'name'){ // if search by name it validate that the input name is equal to result
                const name = (await this.selenium.getTextFromElement(null , null , arrTH[0])+
                await this.selenium.getTextFromElement(null , null , arrTH[1])).toLowerCase()
                input = input.split(' ').join('')
                await this.selenium.clearElementField('tagName' , 'input' , null , searchElement)
                if(name == input){
                    this.logger.info(`End 'searchClient' function - Found value = '${input}' By '${searchBy}'`)
                    return true
                }
                this.logger.error(`End 'searchClient' function - Cannot find value '${input}' By '${searchBy}'`)
                return false
            }

            if(searchBy == 'email'){  // if search by email it validate that the input name is equal to result
            const email = (await this.selenium.getTextFromElement(null , null , arrTH[3])).toLowerCase()
            if(email == input){
                this.logger.info(`End 'searchClient' function - Found value = '${input}' By '${searchBy}'`)
                return true
            }
            this.logger.error(`End 'searchClient' function - Cannot find value '${input}' By value = '${searchBy}"`)
            return false
            }
        }
        this.logger.info(`End 'searchClient' function - Found several results for value '${input}' By '${searchBy}'`)
        return true
    }

    //** Edit client and validate editing **/
    async editClient(input , searchBy , newInput, editBy){
        this.logger.info(`Start 'editClient' function with values: '${input}' By: '${searchBy}' , edit to: '${newInput}' By: '${editBy}'`)
        const searchElement = await this.selenium.findElementBy('className', 'search-clients')
        await this.searchClient(input , searchBy) 
        // edit client
        await this.selenium.clickElement('className' , 'clientDetails')
        await this.selenium.clearElementField('id' , `${editBy}`)
        await this.selenium.write(newInput , 'id' , `${editBy}`) 
        await this.selenium.clickElement('className' , 'update-client-popup-btn')
        await this.selenium.clickElement('className' , 'cancel-client-popup-btn') 
        await this.selenium.clearElementField('tagName' , 'input' , null , searchElement) 
        const isEdit = await this.searchClient(newInput , editBy) 
        if(isEdit){
            this.logger.info(`End 'editClient' function - Client with value '${input}' By '${searchBy}' is edited to '${newInput}'`)
            return true
        }
        this.logger.error(`End 'editClient' function - Cannot edit client with value '${input}' By '${searchBy}'`)
        return false
    }

    // ** Delete Client and validate deleting **/
    async deleteClient(input , searchBy){
        this.logger.info(`Start 'deleteClient' function with values: ${input} By: ${searchBy}`)
        const searchElement = await this.selenium.findElementBy('className', 'search-clients')
        await this.searchClient(input , searchBy)
        await this.selenium.clickElement('className' , 'clientDetails') 
        await this.selenium.clickElement('className' , 'delete-client-popup-btn')
        await this.selenium.clickElement('className' , 'cancel-client-popup-btn')
        await this.selenium.clearElementField('tagName' , 'input' , null , searchElement)
        const  isExist = await this.searchClient(input , searchBy)
        if(!isExist){
            this.logger.info(`End 'deleteClient' function - Client with value '${input}' By '${searchBy}' is deleted`)
            await this.selenium.clearElementField('tagName' , 'input' , null , searchElement) 
            return true
        }
        this.logger.error(`End 'deleteClient' function - Cannot delete client with value '${input}' By '${searchBy}' is deleted`)
        await this.selenium.clearElementField('tagName' , 'input' , null , searchElement) 
        return false
    }
}

module.exports = Clients