document.getElementById("saveButton").addEventListener("click", () => {
    const confirmationMessage = document.getElementById("confirmationMessage");
    console.log("Save button clicked");
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => {
        confirmationMessage.classList.add("hidden");
    }, 3000);

    saveResource();
});

function saveResource() {
    const url = "http://localhost:8080/api/users/saveaspersonalresource";
    const params = new URLSearchParams({
        resourceId: "3",
        userId: "3"
    });

    fetch(url + "?" + params.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

document.getElementById('addFactButton').addEventListener('click', function() {
    addAttributeField('factsContainer');
});

document.getElementById('addAccessButton').addEventListener('click', function() {
    addAttributeField('accessContainer');
});

function addAttributeField(containerId) {
    const container = document.getElementById(containerId);
    const attributeDiv = document.createElement('div');
    attributeDiv.classList.add('attribute');

    const attributeName = document.createElement('input');
    attributeName.type = 'text';
    attributeName.placeholder = 'Attribute Name';
    attributeName.classList.add('box');

    const attributeValue = document.createElement('input');
    attributeValue.type = 'text';
    attributeValue.placeholder = 'Attribute Value';
    attributeValue.classList.add('box');

    attributeDiv.appendChild(attributeName);
    attributeDiv.appendChild(attributeValue);
    container.appendChild(attributeDiv);
}