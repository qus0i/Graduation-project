// Add your JavaScript functionality here
document.querySelector('.explore-btn').addEventListener('click', function() {
    alert('Exploring more!');
});
// Interest categories
const interests = [
    "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller",
    "Historical Fiction", "Biography", "Science", "Business", "Self-Help"
];

// DOM elements
const interestsContainer = document.querySelector('.interests-container');
const counter = document.querySelector('.selection-counter');
const continueBtn = document.querySelector('.continue-btn');

// Selected interests array
let selectedInterests = [];

// Create interest buttons
interests.forEach(interest => {
    const button = document.createElement('button');
    button.className = 'interest-btn';
    button.textContent = interest;
    
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            // Deselect
            button.classList.remove('selected');
            selectedInterests = selectedInterests.filter(item => item !== interest);
        } else {
            // Select (if less than 6)
            if (selectedInterests.length < 6) {
                button.classList.add('selected');
                selectedInterests.push(interest);
            }
        }
        
        // Update counter
        counter.textContent = `${selectedInterests.length}/6 selected`;
        
        // Enable/disable continue button
        continueBtn.disabled = selectedInterests.length === 0;
    });
    
    interestsContainer.appendChild(button);
});

// Button event listeners
document.querySelector('.back-btn').addEventListener('click', () => {
    alert('Back button clicked - would navigate to previous page');
});

document.querySelector('.continue-btn').addEventListener('click', () => {
    alert(`Selected interests: ${selectedInterests.join(', ')} - would proceed to next step`);
});
