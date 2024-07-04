const handleSavePDF = async (toPDF) => {
    
    const addButton = document.getElementById('add-button');
    if (addButton) {
        addButton.style.display = "none";
    }
    document.getElementById('list-view-container').style.height = "800px";
    const buttonContainers = document.getElementsByClassName("button-container");

    for (let i = 0; i < buttonContainers.length; i++) {
        const buttonContainer = buttonContainers[i];

        buttonContainer.style.display = "none";
    }

    const dateTime = new Date();
    const date = dateTime.toLocaleDateString('bg-BG').slice(0, 10);

    const savePDF = document.getElementById('savePDF');
    savePDF.innerText = 'Заявка за поръчка на тапетни врати ' + date;
    savePDF.style.fontWeight = "bold";
    savePDF.style.fontSize = "32px";
    savePDF.style.display = "block";
    savePDF.style.paddingTop = "30px";

    const container = document.getElementById('container');
    container.style.width = "1320px";
    container.style.maxWidth = "1320px";

    await toPDF();

    
    if (addButton) {
        addButton.style.display = null;
    }
    document.getElementById('list-view-container').style.height = "500px";
    for (let i = 0; i < buttonContainers.length; i++) {
        const buttonContainer = buttonContainers[i];

        buttonContainer.style.display = "grid";
    }

    savePDF.style.display = "none";
    container.style.width = null;
    container.style.maxWidth = null;
    
};  

module.exports = {
    handleSavePDF
}