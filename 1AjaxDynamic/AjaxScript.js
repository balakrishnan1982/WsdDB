// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to the important HTML elements
    const loadButton = document.getElementById('load-users-btn');
    const userContainer = document.getElementById('user-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    // 2. Add a 'click' event listener to the button
    loadButton.addEventListener('click', fetchUsers);

    // 3. Define the function that runs when the button is clicked
    async function fetchUsers() {
        
        // --- Show loading state ---
        loadingIndicator.style.display = 'block'; // Show "Loading..."
        loadButton.disabled = true;             // Disable the button
        userContainer.innerHTML = '';           // Clear any old data

        try {
            // 4. Make the AJAX request using the 'fetch' API
            // 'await' pauses the function until the network request completes
            const response = await fetch('https://my-json-server.typicode.com/balakrishnan1982/WsdDB/db.json');

            // 5. Check if the request was successful (e.g., status 200)
            if (!response.ok) {
                // If not, throw an error to be caught by the 'catch' block
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // 6. Parse the response body as JSON
            // 'await' pauses the function until the JSON is parsed
            const users = await response.json();

            // 7. Pass the data to another function to render it
            displayUsers(users);

        } catch (error) {
            // 8. Handle any errors that occurred during fetch or parsing
            console.error('Failed to fetch users:', error);
            userContainer.innerHTML = `<p class="error-message">Could not load users. Please try again later.</p>`;
        } finally {
            // 9. 'finally' always runs, whether it succeeded or failed
            // This is perfect for cleanup
            loadingIndicator.style.display = 'none'; // Hide "Loading..."
            loadButton.disabled = false;            // Re-enable the button
        }
    }

    // 10. Define the function that renders the data to the page
    function displayUsers(users) {
        // If no users were found, show a message
        if (users.length === 0) {
            userContainer.innerHTML = '<p>No users found.</p>';
            return;
        }

        // Loop through each user in the array
        users.forEach(user => {
            // Create a new 'div' element for the user card
            const userCard = document.createElement('div');
            // Add the 'user-card' class for styling
            userCard.className = 'user-card';

            // Set the HTML content of the card using template literals
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            `;

            // 11. Append the new user card to the main container
            userContainer.appendChild(userCard);
        });
    }
});