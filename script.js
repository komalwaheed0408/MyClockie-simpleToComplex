document.addEventListener("DOMContentLoaded", () => {
  let is24Hour = false; // default format
  const clockElement = document.getElementById("clock");
  const toggleButton = document.getElementById("toggleFormat");

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: "America/Los_Angeles", // PST
      hour12: !is24Hour
    };
    clockElement.textContent = now.toLocaleTimeString("en-US", options);
  }

  toggleButton.addEventListener("click", () => {
    is24Hour = !is24Hour;
    updateClock();
  });

  updateClock();
  setInterval(updateClock, 1000);
});
