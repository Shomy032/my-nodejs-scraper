const { extractParseAndReadBgImgUrlAll } = require("../helpers/get-all-heroes-pictures")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }


    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

    const btn = document.getElementById("btn");
    const loading = document.getElementById("loading");
    const input_origin = document.getElementById("origin")
    const input_evaluatedSelector = document.getElementById("evaluatedSelector")
    const input_folderName = document.getElementById("folderName")
    const input_urlListName = document.getElementById("urlListName")


    btn.addEventListener("click", async () => {
        // todo add inputs
        loading.innerText = "loading..."
        btn.disabled = true
        // const origin = 'https://www.dota2.com/heroes';
        // const evaluatedSelector = ".herogridpage_HeroIcon_7szOn";
        // const folderName = `extracted-pictures`;
        // const urlListName = "hero-images";
        const origin = input_origin.value;
        const evaluatedSelector = input_evaluatedSelector.value;
        const folderName = input_folderName.value;
        const urlListName = input_urlListName.value;

        await extractParseAndReadBgImgUrlAll({ origin, evaluatedSelector, folderName, urlListName })
        loading.innerText = "NOT loading..."
        btn.disabled = false
    })
})