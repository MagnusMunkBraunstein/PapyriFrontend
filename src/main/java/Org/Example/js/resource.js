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