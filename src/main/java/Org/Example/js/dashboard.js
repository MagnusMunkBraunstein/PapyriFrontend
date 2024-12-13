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

//TODO
function loadPersonalResources() {

    // need to insert the true id when it is posible

    const url = `http://localhost:8080/api/users/3/resources`;

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
                listItem.textContent = resource.name;
                listItem.dataset.id = resource.id;
                listItem.addEventListener('click', () => {
                    window.location.href = `resource.html?id=${resource.id}`;
                });
                savedResourcesList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function loadRecentResources() {
    const url = `http://localhost:8080/api/resources/recent`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const recentResourcesList = document.querySelector('.recent-resources ul');
            recentResourcesList.innerHTML = ''; // Clear existing list

            data.forEach(resource => {
                const listItem = document.createElement('li');
                listItem.textContent = resource.name;
                listItem.dataset.id = resource.id;
                listItem.addEventListener('click', () => {
                    window.location.href = `resource.html?id=${resource.id}`;
                });
                recentResourcesList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecentResources();
});

document.addEventListener('DOMContentLoaded', () => {
    const createResourceButton = document.getElementById("createResourceButton");
    if (createResourceButton) {
        createResourceButton.addEventListener('click', () => {
            document.getElementById('createResourceModal').style.display = 'block';
        });
    }

    document.querySelector(".close").addEventListener('click', () => {
        document.getElementById('createResourceModal').style.display = 'none';
        });

    document.getElementById("createResourceConfirmButton").addEventListener('click', () => {
        const title = document.getElementById("resourceTitle").value.trim();
        const refId = document.getElementById("resourceRefId").value.trim();

        if (title && refId) {
            checkResourceUniqueness(title, refId)
                .then(isUnique => {
                    if (isUnique) {
                        const resource = {
                            name: title,
                            ref_id: refId
                        };
                        console.log("prepared resource", resource);
                        saveResourceToBackend(resource);
                        document.getElementById('createResourceModal').style.display = 'none';
                    } else {
                        alert("Title and Reference ID must be unique.");
                    }
                });

            } else {
            alert("Please fill out all fields.");
        }
    });
});


function checkResourceUniqueness(name, refId) {
    if(!name||!refId){
        console.error("Name or RefId is empty");
        return Promise.resolve(false);
    }

    const url =`http://localhost:8080/api/resources/check-uniqueness?name=${encodeURIComponent(name)}&ref_id=${encodeURIComponent(refId)}`;
    console.log("Sending request to:", url);
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.hasOwnProperty('isUnique')) {
                return data.isUnique;
            }else{
                console.error("Response does not contain isUnique property");
                throw new Error("Response does not contain isUnique property");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            return false;
        });
}


function saveResourceToBackend(resource) {
    const url = "http://localhost:8080/api/resources";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resource)
    })
        .then(response => response.json())
        .then(data => {
            console.log("resource created", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.querySelector('.search-results');
    const searchScope = document.getElementById('searchScope');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        const scope = searchScope.value;
        if (query.length > 0) { // Start searching after 1 character
            searchResources(query, scope);
        } else {
            clearSearchResults();
        }
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(clearSearchResults, 200); // Delay clearing to allow click events
    });

    searchResults.addEventListener('mousedown', (event) => {
        event.preventDefault(); // Prevent blur event when clicking on search results
    });
});

function searchResources(query, scope) {
    let url;
    if (scope === 'saved-resources') {
        url = `http://localhost:8080/api/resources/saved/search?query=${encodeURIComponent(query)}`;
    } else if (scope === 'recent-resources') {
        url = `http://localhost:8080/api/resources/recent/search?query=${encodeURIComponent(query)}`;
    } else if (scope === 'personal-projects') {
        url = `http://localhost:8080/api/resources/search?query=${encodeURIComponent(query)}`;
    } else if (scope === 'personal-topics') {
        url = `http://localhost:8080/api/topics/search?query=${encodeURIComponent(query)}`;
    } else {
        url = `http://localhost:8080/api/resources/search?query=${encodeURIComponent(query)}`;
    }

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function displaySearchResults(resources) {
    const searchResultsContainer = document.querySelector('.search-results ul');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (resources.length === 0) {
        const noResultsItem = document.createElement('li');
        noResultsItem.textContent = 'No matching results';
        noResultsItem.style.color = 'red'; // Optional: style the message
        searchResultsContainer.appendChild(noResultsItem);
    } else {
        resources.forEach(resource => {
            const listItem = document.createElement('li');
            listItem.textContent = resource.name;
            listItem.dataset.id = resource.id;
            listItem.addEventListener('click', () => {
                window.location.href = `resource.html?id=${resource.id}`;
            });
            searchResultsContainer.appendChild(listItem);
        });
    }

    document.querySelector('.search-results').style.display = 'block';
}

function clearSearchResults() {
    const searchResultsContainer = document.querySelector('.search-results ul');
    searchResultsContainer.innerHTML = ''; // Clear previous results
    document.querySelector('.search-results').style.display = 'none';
}
