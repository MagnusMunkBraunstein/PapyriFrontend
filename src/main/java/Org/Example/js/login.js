// Add event listener for the login form submission
// Add event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value; // Get the email value from the input field
    const password = document.getElementById('password').value; // Get the password value from the input field

    // Send a POST request to the login endpoint
    fetch('http://localhost:8080/api/accounthandler/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify({ email, password }) // Send the email and password as JSON
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // If the response is OK, return the response JSON
            } else {
                throw new Error('Login failed'); // If the response is not OK, throw an error
            }
        })
        .then(data => {
            alert(data.message); // Display the response message in an alert
            window.location.href = `dashboard.html?userId=${data.userId}`; // Redirect to the user-specific dashboard page
        })
        .catch(error => alert(error.message)); // Display an error message in an alert if the request fails
});

// Add event listener for the register button click
document.getElementById('registerButton').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'block'; // Show the popup overlay
    document.getElementById('registerPopup').style.display = 'block'; // Show the registration popup
});

// Add event listener for the registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('regEmail').value; // Get the email value from the input field
    const password = document.getElementById('regPassword').value; // Get the password value from the input field
    const name = document.getElementById('name').value; // Get the name value from the input field

    // Send a POST request to the register endpoint
    fetch('http://localhost:8080/api/accounthandler/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify({ email, password, name }) // Send the email, password, and name as JSON
    })
        .then(response => {
            if (response.ok) {
                return response.text(); // If the response is OK, return the response text
            } else {
                return response.text().then(text => { throw new Error(text); }); // If the response is not OK, throw an error with the response text
            }
        })
        .then(message => {
            alert(message); // Display the response message in an alert
            document.getElementById('popupOverlay').style.display = 'none'; // Hide the popup overlay
            document.getElementById('registerPopup').style.display = 'none'; // Hide the registration popup
        })
        .catch(error => alert(error.message)); // Display an error message in an alert if the request fails
});

// Add event listener for the cancel button click
document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none'; // Hide the popup overlay
    document.getElementById('registerPopup').style.display = 'none'; // Hide the registration popup
});

// Add event listener for the popup overlay click
document.getElementById('popupOverlay').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none'; // Hide the popup overlay
    document.getElementById('registerPopup').style.display = 'none'; // Hide the registration popup
});