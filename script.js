// Game state
let gameState = {
    targetNumber: 0,
    currentTries: 0,
    maxTries: 8,
    gameWon: false,
    gameOver: false
};

// LocalStorage keys
const STORAGE_KEYS = {
    BEST_SCORE: 'numbur_best_score',
    GAMES_PLAYED: 'numbur_games_played'
};

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    updateStatsDisplay();
});

// Initialize a new game
function initializeGame() {
    gameState = {
        targetNumber: generateTargetNumber(),
        currentTries: 0,
        maxTries: 8,
        gameWon: false,
        gameOver: false
    };
    
    // Clear all guess boxes
    for (let i = 1; i <= 8; i++) {
        const guessBox = document.getElementById(`guess${i}`);
        guessBox.className = 'guess-box';
        guessBox.innerHTML = '';
    }
    
    // Reset input circle
    const inputCircle = document.getElementById('inputCircle');
    inputCircle.className = 'input-circle';
    
    // Reset input
    const numberInput = document.getElementById('numberInput');
    numberInput.value = '';
    numberInput.disabled = false;
    numberInput.focus();
    
    // Update current tries display
    updateCurrentTriesDisplay();
    
    console.log('Target number:', gameState.targetNumber);
}

// Generate a target number (10-99, not prime)
function generateTargetNumber() {
    let number;
    do {
        number = Math.floor(Math.random() * 90) + 10; // 10-99
    } while (isPrime(number));
    
    return number;
}

// Check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num % 2 === 0 && num > 2) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
        }
        return true;
      }

// Setup event listeners
function setupEventListeners() {
    const numberInput = document.getElementById('numberInput');
    
    numberInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });
    
    // Only allow numbers
    numberInput.addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    });
}

// Handle user guess
function handleGuess() {
    if (gameState.gameOver) return;
    
    const numberInput = document.getElementById('numberInput');
    const guess = parseInt(numberInput.value);
    
    // Validate input
    if (!guess || guess < 1 || guess > 99) {
        showMessage('Please enter a number between 10 and 99');
        return;
    }
    
    gameState.currentTries++;
    updateCurrentTriesDisplay();
    
    const guessBox = document.getElementById(`guess${gameState.currentTries}`);
    guessBox.innerHTML = `<span class="guess-number">${guess}</span>`;
    guessBox.classList.add('filled');
    
    // Check if correct
    if (guess === gameState.targetNumber) {
        handleCorrectGuess();
    } else if (gameState.targetNumber % guess === 0) {
        // Guess is a factor
        handleFactorGuess(guessBox);
    } else {
        // Guess is not a factor
        handleIncorrectGuess(guessBox);
    }
    
    // Check if game is over
    if (gameState.currentTries >= gameState.maxTries && !gameState.gameWon) {
        handleGameOver();
    }
    
    numberInput.value = '';
}

// Handle correct guess
function handleCorrectGuess() {
    gameState.gameWon = true;
    gameState.gameOver = true;
    
    const inputCircle = document.getElementById('inputCircle');
    const numberInput = document.getElementById('numberInput');
    
    inputCircle.classList.add('success');
    numberInput.value = gameState.targetNumber;
    numberInput.disabled = true;
    
    // Update best score
    updateBestScore();
    
    // Show success message
    setTimeout(() => {
        showMessage(`🎉 Congratulations! You found it in ${gameState.currentTries} tries!`, 'success');
    }, 500);
    
    // Start new game after delay
    setTimeout(() => {
        initializeGame();
    }, 3000);
}

// Handle factor guess
function handleFactorGuess(guessBox) {
    guessBox.classList.add('correct');
    showMessage('🟢 Good! That number is a factor of the target.', 'info');
}

// Handle incorrect guess
function handleIncorrectGuess(guessBox) {
    guessBox.classList.add('incorrect');
    showMessage('🔴 That number is not a factor of the target.', 'info');
}

// Handle game over
function handleGameOver() {
    gameState.gameOver = true;
    
    const inputCircle = document.getElementById('inputCircle');
    const numberInput = document.getElementById('numberInput');
    
    inputCircle.classList.add('hint');
    numberInput.value = gameState.targetNumber;
    numberInput.disabled = true;
    
    showMessage(`Game Over! The number was ${gameState.targetNumber}. Try again!`, 'error');
    
    // Start new game after delay
    setTimeout(() => {
        initializeGame();
    }, 3000);
}

// Update best score in localStorage
function updateBestScore() {
    const currentBest = getBestScore();
    const gamesPlayed = getGamesPlayed();
    
    if (currentBest === null || gameState.currentTries < currentBest) {
        localStorage.setItem(STORAGE_KEYS.BEST_SCORE, gameState.currentTries.toString());
    }
    
    localStorage.setItem(STORAGE_KEYS.GAMES_PLAYED, (gamesPlayed + 1).toString());
    updateStatsDisplay();
}

// Get best score from localStorage
function getBestScore() {
    const score = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
    return score ? parseInt(score) : null;
}

// Get games played from localStorage
function getGamesPlayed() {
    const games = localStorage.getItem(STORAGE_KEYS.GAMES_PLAYED);
    return games ? parseInt(games) : 0;
}

// Update stats display
function updateStatsDisplay() {
    const bestScoreElement = document.getElementById('bestScore');
    const currentTriesElement = document.getElementById('currentTries');
    const gamesPlayedElement = document.getElementById('gamesPlayed');
    
    const bestScore = getBestScore();
    const gamesPlayed = getGamesPlayed();
    
    bestScoreElement.textContent = bestScore !== null ? bestScore : '-';
    currentTriesElement.textContent = gameState.currentTries;
    gamesPlayedElement.textContent = gamesPlayed;
}

// Update current tries display
function updateCurrentTriesDisplay() {
    const currentTriesElement = document.getElementById('currentTries');
    currentTriesElement.textContent = gameState.currentTries;
}

// Show message to user
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal functions
function toggleHelp() {
    const modal = document.getElementById('helpModal');
    modal.classList.toggle('show');
    
    // Close stats modal if open
    const statsModal = document.getElementById('statsModal');
    statsModal.classList.remove('show');
}

function toggleStats() {
    const modal = document.getElementById('statsModal');
    modal.classList.toggle('show');
    
    // Close help modal if open
    const helpModal = document.getElementById('helpModal');
    helpModal.classList.remove('show');
}

function closeHelp() {
    const modal = document.getElementById('helpModal');
    modal.classList.remove('show');
}

function closeStats() {
    const modal = document.getElementById('statsModal');
    modal.classList.remove('show');
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const helpModal = document.getElementById('helpModal');
    const statsModal = document.getElementById('statsModal');
    const helpIcon = document.querySelector('.help-icon');
    const statsIcon = document.querySelector('.stats-icon');
    
    // Close help modal if clicking outside
    if (helpModal.classList.contains('show') && 
        !helpIcon.contains(event.target) && 
        !helpModal.querySelector('.popuptext').contains(event.target)) {
        helpModal.classList.remove('show');
    }
    
    // Close stats modal if clicking outside
    if (statsModal.classList.contains('show') && 
        !statsIcon.contains(event.target) && 
        !statsModal.querySelector('.popuptext').contains(event.target)) {
        statsModal.classList.remove('show');
    }
});

// Close modals with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeHelp();
        closeStats();
    }
});