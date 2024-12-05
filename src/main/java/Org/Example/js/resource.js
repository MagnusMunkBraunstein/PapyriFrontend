document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

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
            if(isSaved){
                saveButton.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error("Error checking saved resources", error);
        });
}


function loadPersonalResources() {
    const url = 'http://localhost:8080/api/users/3/resources';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const savedResourcesList = document.querySelector('.saved-resources ul');
            savedResourcesList.innerHTML = ''; // Clear existing list

            data.forEach(resource => {
                const listItem = document.createElement('li');
                listItem.textContent = resource.name; // Display only the name
                listItem.dataset.id = resource.id; // Store the resource ID
                listItem.addEventListener('click', () => {
                    window.location.href = `resource.html?userId=3&resourceId=${resource.id}`; // Redirect to the new HTML page with the user ID and resource ID
                });
                savedResourcesList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}