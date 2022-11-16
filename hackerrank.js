const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "nakoyo3920@tinydef.com";
const password = "11111111";
const answerObj = require("./code");
const browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null
})
let page;
browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
})
    .then(function () {
        //waitng for the elemt to appear on apge 
        let elementWaitPromise = page.waitForSelector("input[id='input-1']", { visible: true });
        return elementWaitPromise;
    })
    .then(function () {
        let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
        return emailIsEntered;
    })
    .then(function () {
        //waitng for the elemt to appear on apge 
        let elementWaitPromise = page.waitForSelector("input[id='input-2']", { visible: true });
        return elementWaitPromise;
    })
    .then(function () {
        let passwordIsEntered = page.type("input[id='input-2']", password, { delay: 50 })
        return passwordIsEntered;
    })
    .then(function () {
        let logInIsClicked = page.click(".ui-btn.ui-btn-large ", { delay: 50 })
        return logInIsClicked;
    })
    .then(function () {
        let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page, { delay: 50 })
        return clickOnAlgoPromise;
    })
    .then(function () {
        let letGetToWarmUp = waitAndClick(".checkbox-input[value='warmup']", page, { delay: 50 })
        return letGetToWarmUp;
    })
    .then(function () {
        let waitFor3Sec = page.waitFor(3000);
        return waitFor3Sec;
    })
    .then(function () {
        let allChallangesPromise = page.$$(" .ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled")
        return allChallangesPromise;
    })
    .then(function (questionsArr) {
        console.log('number of questions', questionsArr.length);
        let questionWillBeSolved = questionSolver(page, questionsArr[0], answerObj.answers[0]);
        return questionWillBeSolved;
    })

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function () {
            let clickModel = cPage.click(selector);
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}
function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function () {
            let editorIntoFocusPrimise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return editorIntoFocusPrimise;
        })
            .then(function () {
                return waitAndClick(".checkbox-input", page)
            })
            .then(function () {
                return page.waitForSelector(".custominput")
            })
            .then(function () {
                return page.type(".custominput", answer, { delay: 10 });
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.down("Control", { delay: 100 });
                return ctrlIsPressed;
            })
            .then(function () {
                let AIsPressed = page.keyboard.press("A", { delay: 100 });
                return AIsPressed;
            })
            .then(function () {
                let XIsPressed = page.keyboard.press("X", { delay: 100 });
                return XIsPressed;
            })
            .then(function () {
                let ctrlIsUnPressed = page.keyboard.up("Control", { delay: 100 });
                return ctrlIsUnPressed;
            })

            .then(function () {
                let maineditorIntoFocusPrimise = waitAndClick(".monaco-editor.no-user-select.vs", page)
                return maineditorIntoFocusPrimise;
            })

            .then(function () {
                let waitFor3Sec = page.waitFor(3000);
                return waitFor3Sec;
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.down("Control");
                return ctrlIsPressed;
            })


            .then(function () {
                let AIsPressed = page.keyboard.press("A");
                return AIsPressed;
            })
            .then(function () {
                let VIsPressed = page.keyboard.press("V", { delay: 100 });
                return VIsPressed;
            })
            .then(function () {
                let ctrlIsUnPressed = page.keyboard.up("Control", { delay: 100 });
                return ctrlIsUnPressed;
            }) 
            .then(function () {
                return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", { delay: 50 })
            }).then(function () {
                resolve();
            }).catch(function () {
                reject();
            })

    })
}