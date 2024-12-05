document.addEventListener('DOMContentLoaded', () => {
    // Allow uploading a profile picture
    const profileUpload = document.getElementById('profile-upload');
    const profilePicture = document.getElementById('profile-picture');


    profileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePicture.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

// Basic Interactivity for Demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Field Click Listener
    const fields = document.querySelectorAll('.field-list li');
    fields.forEach(field => {
        field.addEventListener('click', () => {
            alert(`You clicked on ${field.textContent}`);
        });
    });

    // Saved Resource Click Listener
    const resources = document.querySelectorAll('.saved-resources ul li');
    resources.forEach(resource => {
        resource.addEventListener('click', () => {
            alert(`Opening ${resource.textContent}`);
        });
    });

    // Personal Projects Click Listener
    const projects = document.querySelectorAll('.personal-projects ul li');
    projects.forEach(project => {
        project.addEventListener('click', () => {
            alert(`You clicked on ${project.textContent}`);
        });
    });

    // Recent Resources Click Listener
    const recents = document.querySelectorAll('.recent-resources ul li');
    recents.forEach(recent => {
        recent.addEventListener('click', () => {
            alert(`You clicked on ${recent.textContent}`);
        });
    });

    // Personal Topics Click Listener
    const topics = document.querySelectorAll('.personal-topics ul li');
    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            alert(`You clicked on ${topic.textContent}`);
        });
    });
    loadPersonalResources();
});

function loadPersonalResources() {
    const url = 'http://localhost:8080/api/users/3/resources'; // Assuming the user ID is 3
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const savedResourcesList = document.querySelector('.saved-resources ul');
            savedResourcesList.innerHTML = '';// Clear existing list

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(resource => {
                    const listItem = document.createElement('li');
                    listItem.textContent = resource.name; // Assuming the resource object has a 'name' property
                    savedResourcesList.appendChild(listItem);
                });
            } else {
                const emptyMessage = document.createElement('li');
                emptyMessage.textContent = 'No saved resources found';
                savedResourcesList.appendChild(emptyMessage);
            }
            /*data.forEach(resource => {
                const listItem = document.createElement('li');
                listItem.textContent = resource.name; // Assuming the resource object has a 'name' property
                savedResourcesList.appendChild(listItem);
            });*/
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

