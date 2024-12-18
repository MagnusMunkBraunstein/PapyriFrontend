document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const returnToDashboardButton = document.getElementById('returnToDashboardButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

    loadSavedTheme();

    confirmationMessage.classList.remove("hidden");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const resourceId = urlParams.get('resourceId');

    if (userId && resourceId) {
        checkIfResourceIsSaved(userId, resourceId, saveButton);
    }

    saveButton.addEventListener("click", () => {
        console.log("Save button clicked");
        confirmationMessage.classList.remove("hidden");

        setTimeout(() => {
            confirmationMessage.classList.add("hidden");
        }, 3000);

        saveResource();
    });

    returnToDashboardButton.addEventListener("click", () => {
        window.location.href = `dashboard.html?userId=${userId}`;
    });
});

function checkIfResourceIsSaved(userId, resourceId, saveButton) {
    const url = `http://localhost:8080/api/users/${userId}/resources`;

    fetch(url, {
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then((data) => {
            const isResourceSaved = data.some(resource => resource.id == resourceId);
            if (isResourceSaved) {
                saveButton.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error("Error checking saved resources", error);
        });
}

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

function applySavedTheme(){
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        document.body.className = "";
        document.body.classList.add(savedTheme);
    }
}

// Function to load the saved theme from localStorage
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    console.log('loaded theme from local storage:', savedTheme);
    if (savedTheme) {
        setTheme(savedTheme);  // Apply the saved theme
    }
}

function setTheme(theme) {
    // Remove any existing theme classes on the body
    document.body.className = '';
    if (theme) {
        document.body.classList.add(theme);
    }
    // Store the theme in localStorage
    localStorage.setItem('selectedTheme', theme);
}

