document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const returnToDashboardButton = document.getElementById('returnToDashboardButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

    confirmationMessage.classList.remove("hidden");

    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = urlParams.get('resourceId');

    if (resourceId) {
        checkIfResourceIsSaved(resourceId, saveButton);
    }

    saveButton.addEventListener("click", () => {
        console.log("Save button clicked");
        confirmationMessage.classList.remove("hidden");

        setTimeout(() => {
            confirmationMessage.classList.add("hidden");
        }, 3000);

        saveResource(resourceId);
    });

    returnToDashboardButton.addEventListener("click", () => {
        window.location.href = `dashboard.html`;
    });
});

function checkIfResourceIsSaved(resourceId, saveButton) {
    const url = `http://localhost:8080/api/users/resources`;

    fetch(url, {
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include JSESSIONID cookie for session authentication
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

function saveResource(resourceId) {
    const url = "http://localhost:8080/api/users/saveaspersonalresource";
    const params = new URLSearchParams({
        resourceId: resourceId
    });

    fetch(url + "?" + params.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: 'include' // Include JSESSIONID cookie for session authentication
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to save resource");
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error saving resource:", error);
        });
}
