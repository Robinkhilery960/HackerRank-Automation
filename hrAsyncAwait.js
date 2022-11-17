const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "nakoyo3920@tinydef.com";
const password = "11111111";
const answerObj = require("./code");
(async function(){
    try {
    const browserInstance = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"],
        defaultViewport: null
    })
    let newTab= await browserInstance.newPage();
    await  newTab.goto(loginLink);
    await newTab.type("input[id='input-1']", email, { delay: 50 });
    await newTab.type("input[id='input-2']", password, { delay: 50 });
    await  newTab.click(".ui-btn.ui-btn-large ", { delay: 50 });
    await  waitAndClick(".topic-card a[data-attr1='algorithms']", newTab, { delay: 50 });
    await waitAndClick(".checkbox-input[value='warmup']", newTab, { delay: 50 });
    let allChallangesPromise = await newTab.$$(" .ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
    console.log('number of questions', questionsArr.length);




    
}
 catch (error) {
    console.log(error);
}
})()
async function waitAndClick(selector, cPage) {
        await cPage.waitForSelector(selector);
         
            let selectorIsClicked = await cPage.click(selector);
            return selectorIsClicked;
        
}  