document.getElementById("saveButton").addEventListener("click", () => {
    const confirmationMessage = document.getElementById("confirmationMessage");
    console.log("Save button clicked");
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => {
        confirmationMessage.classList.add("hidden");
    }, 3000);
});
