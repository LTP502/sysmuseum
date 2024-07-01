// Define the object options for each room
const roomObjects = {
    entrance: ["Please Choose", "Entrance Design"],
    'drawing-room': ["Please Choose", "Chairs", "Tables", "Sculpture"],
    'meeting-hall': ["Please Choose", "Portraits", "Meeting Table", "The Safe"],
    'mid-section': ["Please Choose", "Desk", "Chairs"],
    'open-area': ["Please Choose", "Toolbox", "Bicycle", "Car"],
    kitchen: ["Please Choose", "Clay Pots", "Metal Pots & Pans", "Baskets"]
};

// Descriptions for objects
const descriptions = {

    //Drawing room descriptions
    "Chairs": "These are comfortable chairs suitable for any seating area.",
    "Tables": "Sturdy tables that can be used for dining or working.",
    "Sculpture": "An artistic sculpture that enhances the room's decor.",


    // meeting hall descriptions

    "Portraits": "Portraits of famous figures.",
    "Meeting Table": "A table that can be used for meeting purposes.",
    "The Safe": "A safe that can be used for storing important documents.",

    // mid section descriptions

    "Desk": "A desk that can be used for working or studying.",
    "Chairs": "These are comfortable chairs suitable for any seating area.",

    // open area descriptions

    "Toolbox": "A toolbox that can be used for storing tools.",
    "Bicycle": "A bicycle that can be used for transportation.",
    "Car": "A car that can be used for transportation.",

    // kitchen descriptions

    "Clay Pots": "Clay pots that can be used for decoration.",
    "Metal Pots & Pans": "Metal pots and pans that can be used for cooking.",
    "Baskets": "Baskets that can be used for storage.",
    "Battery": "A battery that can be used for powering electronic devices.",
};



// Select elements
const roomSelect = document.getElementById('roomSelect');
const objectSelect = document.getElementById('objectSelect');
const objectDescription = document.getElementById('objectDescription');
const infoCheckbox = document.getElementById('infoCheckbox');
const checkboxContainer = document.querySelector('.checkbox-container');
const infoContainer = document.querySelector('.info-container');

let selectedObject = ""; // Variable to store selected object
// Function to update object options based on selected room
function updateObjectOptions(selectedRoom) {
    const objects = roomObjects[selectedRoom] || [];

    // Clear existing options
    objectSelect.innerHTML = '';

    // Add new options
    objects.forEach(object => {
        const option = document.createElement('option');
        option.text = object;
        option.value = object;
        objectSelect.add(option);
    });

    // Update header text dynamically
    objectSelectHeader.textContent = `Select Object for the ${selectedRoom}`;
}

// Event listener for room select change
roomSelect.addEventListener('change', () => {
    const selectedRoom = roomSelect.value;
    updateObjectOptions(selectedRoom);
    resetObjectDescription();
    objectSelectHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Event listener for button clicks
const roomButtons = document.querySelectorAll('.room-button');
roomButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedRoom = this.getAttribute('data-value');
        updateObjectOptions(selectedRoom);
        resetObjectDescription();

        // Update combo box selection if needed
        roomSelect.value = selectedRoom;

        // Scroll to object selection
        objectSelectHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Function to display object description
function displayObjectDescription() {
    const selectedObject = objectSelect.value;
    infoContainer.style.display = 'block';

    // Check if the selected object has a description
    if (descriptions[selectedObject]) {
        objectDescription.textContent = descriptions[selectedObject];
    } else {
        objectDescription.textContent = "Description not available.";
    }
}

// Function to reset object description
function resetObjectDescription() {
    objectDescription.textContent = ""; // Clear description
    infoContainer.style.display = 'none';
    infoCheckbox.checked = false;
    checkboxContainer.style.backgroundColor = '#d4a373';
}

// Event listener for info checkbox change
infoCheckbox.addEventListener('change', () => {
    if (infoCheckbox.checked) {
        displayObjectDescription();
        checkboxContainer.style.backgroundColor = '#744c24';
    } else {
        resetObjectDescription();
        checkboxContainer.style.backgroundColor = '#d4a373';
        infoContainer.style.display = 'none';
    }
});

// Event listener for object select change
objectSelect.addEventListener('click', () => {
    resetObjectDescription();
});

// Initial update based on default room select value
const initialRoom = roomSelect.value;
updateObjectOptions(initialRoom);
