

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

