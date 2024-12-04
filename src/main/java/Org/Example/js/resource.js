document.getElementById("saveButton").addEventListener("click", () => {
    const confirmationMessage = document.getElementById("confirmationMessage");
    console.log("Save button clicked");
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => {
        confirmationMessage.classList.add("hidden");
    }, 3000);
    saveResource();

});

function saveResource(){
    const url = "http://localhost:8080/api/resource/save";
    const data = {
        name: "Resource name",
        author: "Resource author",
        fromDate: "2023-01-01",
        toDate: "2023-02-01",
        users: []
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}