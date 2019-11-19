const SeleniumInfra = require('./SeleniumInfra')
const Logger = require('./Logger')

class BasePage{
    constructor(){
        this.selenium = new SeleniumInfra()
        this.logger = new Logger().logger
    }
}

module.exports = BasePage