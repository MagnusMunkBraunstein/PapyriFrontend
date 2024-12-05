console.log("fieldsPage.js loaded");

document.getElementById("addToField").addEventListener("click", () => {
    const confirmationMessage = document.getElementById("confirmationMessage");
    console.log("addToField Button clicked");
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => {
        confirmationMessage.classList.add("hidden");
    }, 3000);

    addToField();
});

// Empty array to store fields
let fields = [];

// Function to initialize a new user with an empty field list
function initializeUser() {
    fields = [];
    renderFields();
}

// Function to render fields in the sidebar
function renderFields() {
    const fieldList = document.getElementById("field-list");
    fieldList.innerHTML = ""; // Clear existing fields
    fields.forEach((field, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = field.name;
        listItem.onclick = () => alert(`Field: ${field.name}`);
        fieldList.appendChild(listItem);
    });
}

// Initialize a new user on page load
initializeNewUser();

// Example: Add a field after initialization
document.querySelector('.search-field-container input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const fieldName = e.target.value.trim();
        if (fieldName) {
            addField(fieldName);
            e.target.value = ''; // Clear the input
        }
    }
});
