// Get DOM elements for display box and all drum pads
const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

/**
 * Plays the audio clip inside the pad and updates the display text
 * @param {HTMLElement} pad - The drum pad element container
 */
function playAudio(pad) {
  // Find the child <audio> element inside the clicked button
  const audio = pad.querySelector(".clip");

  // Rewind the audio clip to the start (allows rapid consecutive triggers)
  audio.currentTime = 0;

  // Play the sound sample
  audio.play();

  // Update the display text with the clean name/ID of the drum sample
  display.textContent = pad.id;
}

// Attach click event listeners to every drum pad button
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    playAudio(pad);
  });
});

// Attach global event listener for physical keyboard key presses
document.addEventListener("keydown", (event) => {
  // Convert key pressed to uppercase to match the audio element IDs (Q, W, E, etc.)
  const keyPressed = event.key.toUpperCase();

  // Target the specific <audio> element by its letter ID
  const audioEl = document.getElementById(keyPressed);

  // Check if the element exists and has the correct 'clip' class
  if (audioEl && audioEl.classList.contains("clip")) {
    // Reference the parent button element containing this audio
    const parentPad = audioEl.parentElement;

    // Execute the main audio and display update function
    playAudio(parentPad);

    // Add visual 'active' state class for realistic button press animation
    parentPad.classList.add("active");

    // Remove the visual active state after 100 milliseconds
    setTimeout(() => parentPad.classList.remove("active"), 100);
  }
});
