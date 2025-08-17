document.addEventListener("DOMContentLoaded", () => {
  let is24Hour = false; // default format
  const clockElement = document.getElementById("clock");
  const toggleButton = document.getElementById("toggleFormat");
  const tzDropdown = document.getElementById("timezone");
  const timeOutput = document.getElementById("timeOutput");

  let selectedTimeZone = null; // initially nothing selected

  // Function to update the LOCAL clock
  function updateLocalClock() {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: !is24Hour 
    };
    clockElement.textContent = now.toLocaleTimeString('en-US', options);
  }

  // Function to update the SELECTED timezone clock
  function updateSelectedClock() {
    if (!selectedTimeZone) return; // nothing chosen yet
    const now = new Date();
    const options = { 
      timeZone: selectedTimeZone, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: !is24Hour 
    };
    timeOutput.textContent = `${now.toLocaleTimeString('en-US', options)}`;
  }

  // Update both clocks every second
  updateLocalClock();
  setInterval(updateLocalClock, 1000);
  setInterval(updateSelectedClock, 1000);

  // Toggle 12/24 hour format (affects BOTH clocks)
  toggleButton.addEventListener("click", () => {
    is24Hour = !is24Hour;
    updateLocalClock();
    updateSelectedClock();
  });

  // Populate timezone dropdown
  const timeZones = Intl.supportedValuesOf("timeZone");
  timeZones.forEach(tz => {
    const option = document.createElement("option");
    option.value = tz;
    option.textContent = tz.replace("_", " "); // nicer display
    tzDropdown.appendChild(option);
  });

  // When user selects a timezone, update immediately
  tzDropdown.addEventListener("change", (event) => {
    selectedTimeZone = event.target.value;
    updateSelectedClock();
  });
});
