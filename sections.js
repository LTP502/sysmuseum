// Define the object options for each room
const roomObjects = {
    entrance: ["Please Choose", "Welcome"],
    'drawing-room': ["Please Choose", "Chairs", "Sculpture"],
    'meeting-hall': ["Please Choose", "Portraits", "Meeting Table", "The Safe", "Lacquerware"],
    'mid-section': ["Please Choose", "Chairs"],
    kitchen: ["Please Choose", "Clay Pots", "Metal Pots & Pans", "Baskets"]
};

// Descriptions for objects
const descriptions = {

    //Pick an object description
    "Please Choose": "Please choose an object from the 'Select Object' dropdown.",

    //Entrance descriptions
    "Welcome": "Welcome to Sun Yat Sen Museum Penang. This museum holds history of Sun Yat Sen when he was in Penang, gathering supporters for his revolution. This is the house that Sun Yat Sen held his meeting! So come on in and learn more about what he did around the world. ",

    //First Hall descriptions
    "Chairs": "These are comfortable chairs suitable for any seating area.",
    "Sculpture": "Sculpture of Sun Yat Sen.",

    //Second hall descriptions

    "Portraits": " A portrait of Sun Yat Sen's family member.",
    "Meeting Table": "The meeting table that Sun Yat Sen had his revolution speech on. Took place in Penang.",
    "The Safe": "Personal and confidential items used to be kept in it. Now it is but a huge heavy block of solid metal, displaying its sturdiness in the face of time and wear. Property of the previous house owner.",
    "Lacquerware": "Lacquerwares that can be used for decoration and storing items. Property of the previous house owners.",

    //Stair Well descriptions
    "Chairs": "These are comfortable chairs suitable for any seating area.",

    //Kitchen descriptions

    "Clay Pots": "Clay pots that can be used for decoration.",
    "Metal Pots & Pans": "Metal pots and pans that can be used for cooking.",
    "Baskets": "Baskets that can be used for storage. A property of the previous house owners.",
};



// Select elements
const roomSelect = document.getElementById('roomSelect');
const objectSelect = document.getElementById('objectSelect');
const objectDescription = document.getElementById('objectDescription');
const infoCheckbox = document.getElementById('infoCheckbox');
const checkboxContainer = document.querySelector('.checkbox-container');
const infoContainer = document.querySelector('.info-container');
const container3D = document.querySelector('.container3D');

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
}

// Event listener for room select change
roomSelect.addEventListener('change', () => {
    const selectedRoom = roomSelect.value;
    updateObjectOptions(selectedRoom);
    resetObjectDescription();
    
    container3D.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        container3D.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
