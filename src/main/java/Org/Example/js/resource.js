document.getElementById("saveButton").addEventListener("click", () => {
    const confirmationMessage = document.getElementById("confirmationMessage");
    console.log("Save button clicked");
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => {
        confirmationMessage.classList.add("hidden");
    }, 3000);

    saveResource();
});

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