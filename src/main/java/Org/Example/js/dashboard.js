

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
});
