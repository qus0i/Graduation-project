document.addEventListener("DOMContentLoaded", function () {
    const interests = [
        "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller",
        "Historical Fiction", "Biography", "Science", "Business", "Self-Help",
        "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller",
     
    ];

    const interestList = document.getElementById("interest-list");
    const continueButton = document.querySelector(".continue-btn");
    const REQUIRED_SELECTIONS = 6; // Force 6 genres
    let selectedInterests = [];

    // Generate interest buttons
    interests.forEach(interest => {
        const button = document.createElement("button");
        button.textContent = interest;
        button.addEventListener("click", function() {
            toggleSelection(button, interest);
        });
        interestList.appendChild(button);
    });

    // Toggle selection logic
    function toggleSelection(button, interest) {
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
            selectedInterests = selectedInterests.filter(item => item !== interest);
        } else {
            if (selectedInterests.length < REQUIRED_SELECTIONS) {
                button.classList.add("selected");
                selectedInterests.push(interest);
            } else {
                alert(`You must select exactly ${REQUIRED_SELECTIONS} genres.`);
                return;
            }
        }
        
        // Update button text
        continueButton.textContent = selectedInterests.length === REQUIRED_SELECTIONS 
            ? "Save Preferences" 
            : `Select ${REQUIRED_SELECTIONS - selectedInterests.length} more`;
        
        continueButton.disabled = selectedInterests.length !== REQUIRED_SELECTIONS;
    }

    // Continue button action
    continueButton.addEventListener("click", function() {
        if (selectedInterests.length === REQUIRED_SELECTIONS) {
            saveGenresToDatabase(selectedInterests);
        }
    });

    // Send data to PHP
    async function saveGenresToDatabase(genres) {
        const continueBtn = document.querySelector('.continue-btn');
        continueBtn.disabled = true;
        continueBtn.textContent = 'Saving...';
    
        try {
            const response = await fetch("save_genres.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ genres })
            });
    
            // First check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Server returned: ${text.substring(0, 100)}`);
            }
    
            const result = await response.json();
            
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to save preferences');
            }
    
            // Successful save - redirect to index.php
            window.location.href = 'index.php';
            
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('status-message').textContent = error.message;
            continueBtn.disabled = false;
            continueBtn.textContent = 'Save Preferences';
        }
    }
});