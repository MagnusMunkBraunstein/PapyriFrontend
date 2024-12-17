// ------------------- LOGIN FUNCTIONALITY -------------------
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value; // Get email value
    const password = document.getElementById('password').value; // Get password value

    // Send a POST request to the login endpoint
    fetch('http://localhost:8080/api/accounthandler/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include session cookie (JSESSIONID)
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Successful response
            } else {
                throw new Error('Invalid email or password');
            }
        })
        .then(() => {
            alert("Login successful!");
            window.location.href = 'dashboard.html'; // Redirect to dashboard page
        })
        .catch(error => {
            alert(error.message);
            console.error("Login error:", error);
        });
});

// ------------------- REGISTRATION FUNCTIONALITY -------------------
document.getElementById('registerButton').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'block'; // Show popup overlay
    document.getElementById('registerPopup').style.display = 'block'; // Show registration form
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('regEmail').value; // Get email value
    const password = document.getElementById('regPassword').value; // Get password value
    const name = document.getElementById('name').value; // Get name value

    // Send a POST request to the register endpoint
    fetch('http://localhost:8080/api/accounthandler/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(message => {
            alert(message); // Show success message
            document.getElementById('popupOverlay').style.display = 'none'; // Hide overlay
            document.getElementById('registerPopup').style.display = 'none'; // Hide popup
        })
        .catch(error => {
            alert(error.message);
            console.error("Registration error:", error);
        });
});

// ------------------- POPUP OVERLAY CONTROL -------------------
document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none'; // Hide overlay
    document.getElementById('registerPopup').style.display = 'none'; // Hide popup
});

document.getElementById('popupOverlay').addEventListener('click', function() {
    document.getElementById('popupOverlay').style.display = 'none'; // Hide overlay
    document.getElementById('registerPopup').style.display = 'none'; // Hide popup
});
