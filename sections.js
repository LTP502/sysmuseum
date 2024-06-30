// Define the object options for each room
const roomObjects = {
    entrance: ["Entrance Design"],
    'drawing-room': ["Chairs", "Tables", "Sculpture"],
    'meeting-hall': ["Portraits", "Meeting Table", "The Safe"],
    'mid-section': ["Desk", "Chairs"],
    'open-area': ["Toolbox", "Bicycle", "Car"],
    kitchen: ["Clay Pots", "Metal Pots & Pans", "Baskets", "Battery"]
};

// Descriptions for objects
const descriptions = {
    "Chairs": "These are comfortable chairs suitable for any seating area.",
    "Tables": "Sturdy tables that can be used for dining or working.",
    "Sculpture": "An artistic sculpture that enhances the room's decor.",
    "Sphere": "A decorative spherical object made of marble.",
    // Add more descriptions as needed
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
function updateObjectOptions() {
    const selectedRoom = roomSelect.value;
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

// Event listener for room select change
roomSelect.addEventListener('change', () => {
    updateObjectOptions();
    resetObjectDescription();
});

// Event listener for object select change
objectSelect.addEventListener('change', () => {
    selectedObject = objectSelect.value;
    resetObjectDescription(); // Clear description when a new object is selected
});

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

// Function to reset object description
function resetObjectDescription() {
    objectDescription.textContent = ""; // Clear description
}

// Initial update based on default room select value
updateObjectOptions();
