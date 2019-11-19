const BasePage = require("./BasePage");
const Home = require("./Home")

class HomeTest {
    constructor() {
        this.selenium = new BasePage().selenium
        this.home = new Home(this.selenium)
    }
    async runTest(){
        this.home.navigateToHomePage()
        this.home.clickOn('Analytics')
    }
   
}

let homeTest = new HomeTest()
homeTest.runTest()