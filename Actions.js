class Actions {
    constructor(selenium , logger) {
        this.selenium = selenium
        this.logger = logger
	}

    //** Update client - insert client name and values to change -> owner , emailType , if sold (true/false) **/
    async updateClient(client , owner , emailType , sold){
        this.logger.info(`Start 'updateClient' function with values: ${client} , ${owner} , ${emailType} , ${sold}`)
        const updateElement = await this.selenium.findElementBy("className" , "update-container") 
        await this.selenium.write(client , "css" , "input[list='names']" , null , updateElement) 
        
        if(owner){ // insert owner and valid popup
            await this.selenium.write(owner , 'css' , `input[list='owner']` , null , updateElement)
            await this.selenium.clickElement('css' , `input[value='Transfer']` , null , updateElement)
            this.logger.info(`Insert owner: '${owner}'`)
            await this._popUp()
        }
        if(emailType){ // insert emailType and valid popup
            await this.selenium.write(emailType , 'css' , `input[list='emailType']` , null , updateElement)
            await this.selenium.clickElement('css' , `input[value='Send']` , null , updateElement)
            this.logger.info(`Insert email type: '${emailType}'`)
            await this._popUp()
        }
        if(sold){ // click on sold and valid popup
            await this.selenium.clickElement('css' , `input[value='Sold']` , null , updateElement)
            this.logger.info(`Sold is: '${sold}'`)
            await this._popUp()
        }
        this.logger.info(`End - 'updateClient' function with values: ${client} , ${owner} , ${emailType} , ${sold}`)
    }

    //** Add new client **/
    async addClient(Fname , Lname , country , owner , email){
        this.logger.info(`Start 'addClient' function with values: ${Fname} , ${Lname} , ${country} , ${owner} , ${email}`)
        await this.selenium.write(Fname , 'id' , 'firstName')
        await this.selenium.write(Lname , 'id' , 'lastName')
        await this.selenium.write(country , 'id' , 'country')
        await this.selenium.write(owner , 'css' , 'input#owner') 
        await this.selenium.write(email , 'id' , 'email') 
        await this.selenium.clickElement('className' , 'add-client-btn')
        this.logger.info(`End - 'addClient' function with values: ${Fname} , ${Lname} , ${country} , ${owner} , ${email}`)
    }

    //** Validate popup results --> return true or false **/
    async _popUp(){
        const success = await this.selenium.findElementBy('className' , 'success-pop-up') // get success WebElement popup
        if(success){
            this.logger.info(`Popup alert: 'UPDATE SUCCESSFUL'`)
            return true
        }

        const error = await this.selenium.findElementBy('className' , 'error-pop-up') // get error WebElement popup
        if(error){
            this.logger.info(`Popup alert: 'SOME DETAILS ARE MISSING'`)
            return false
        }
        this.logger.error(`Popup didn't appeared.`) // if both success and error popup didn't appered return error
        return false
    }
}

module.exports = Actions