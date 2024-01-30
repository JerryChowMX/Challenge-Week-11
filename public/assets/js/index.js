/**
 * index.js
 * This script provides interactivity for the landing page of the Note Taker application.
 * Currently, its primary function is to facilitate navigation to the notes page.
 */

// This function redirects to the notes page
function goToNotesPage() {
  window.location.href = '/notes';
}

// Event listeners can be set up here for future functionality
document.addEventListener('DOMContentLoaded', () => {
  // Example: An event listener for a button to navigate to the notes page
  // const startButton = document.querySelector('.start');
  // startButton.addEventListener('click', goToNotesPage);

  // Additional functionality can be added here as needed
});

// Additional functions for future interactivity can be defined here
