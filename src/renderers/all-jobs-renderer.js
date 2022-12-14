

const btn = document.getElementById("btn");
const loading = document.getElementById("loading");
const input_origin = document.getElementById("origin")
const input_evaluatedSelector = document.getElementById("evaluatedSelector")
const input_folderName = document.getElementById("folderName")
const input_urlListName = document.getElementById("urlListName")
window.electronAPI.setTitle("Renderer 1")

updateJobState("not started")


window.ipcRenderer.on("job-failed", (event, message) => {
    updateJobState(message);
})

btn.addEventListener("click", async () => {
    loading.innerText = "loading..."
    btn.disabled = true

    // example of valid data
    const origin = 'https://www.dota2.com/heroes';
    const evaluatedSelector = ".herogridpage_HeroIcon_7szOn";
    const folderName = `tmp-data/extracted-pictures`;
    const urlListName = "hero-images";

    // const origin = input_origin.value;
    // const evaluatedSelector = input_evaluatedSelector.value || "div";
    // const folderName = input_folderName.value || "default-folder-name";
    // const urlListName = input_urlListName.value || "default-list-name";

    try {
        updateJobState("started")
        const names = await window.electronAPI.extractParseAndReadBgImgUrlAll({ origin, evaluatedSelector, folderName, urlListName })
        showImagesInUI('#allImages', names)
        loading.innerText = "NOT loading..."
        btn.disabled = false
        updateJobState("done")
    } catch (err) {
        updateJobState("job failed")
    }

})

function updateJobState(text) {
    const results = document.getElementById("results");
    results.innerText = text
}

function showImagesInUI(holderSelector, namesList) {

    setTimeout(() => {
        const holder = document.querySelector(holderSelector);
        let nodes = namesList.map(name => {
            let imgNode = document.createElement('img');
            imgNode.src = `./tmp-data/extracted-pictures/${name}`;
            imgNode.classList.add("small-img");
            return imgNode;
        });
        holder.append(...nodes);
    }, 5000)


}

