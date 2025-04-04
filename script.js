window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    // Optional fade-out effect
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = '0';
    
    // After the transition, set display to 'none'
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 500); // matches the CSS transition duration
  }
});


const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

const container = document.querySelector('.container');
// Outer circle dimensions: 700px x 700px, so radius = 350px.
const circleRadius = 350;

// Return a random number between min and max.
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnPlane() {
  // Recalculate container dimensions for responsive layouts.
  const containerRect = container.getBoundingClientRect();
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;
  
  // Create a wrapper that will animate the flight path.
  const wrapper = document.createElement('div');
  wrapper.classList.add('plane-wrapper');
  
  // Create the plane element.
  const plane = document.createElement('div');
  plane.classList.add('paper-plane');
  
  // Random size between 60 and 150px.
  const size = randomBetween(60, 150);
  wrapper.style.width = size + 'px';
  wrapper.style.height = size + 'px';
  
  // Random starting position within the outer circle (using polar coordinates for uniform distribution).
  const r = Math.sqrt(Math.random()) * circleRadius;
  const theta = Math.random() * 2 * Math.PI;
  const startX = centerX + r * Math.cos(theta);
  const startY = centerY + r * Math.sin(theta);
  // Center the wrapper at the starting position.
  wrapper.style.left = (startX - size / 2) + 'px';
  wrapper.style.top = (startY - size / 2) + 'px';
  
  // Append the plane element to its wrapper.
  wrapper.appendChild(plane);
  container.appendChild(wrapper);
  
  // Compute a random flight direction.
  const flightAngle = Math.random() * 2 * Math.PI;
  const flightAngleDeg = flightAngle * (180 / Math.PI);
  
  // Set CSS variables on the plane so its oscillation rotates around the base flight angle.
  plane.style.setProperty('--base-rotate', flightAngleDeg + "deg");
  // Random oscillation amplitude between 2 and 10 degrees.
  const amplitude = randomBetween(2, 10);
  plane.style.setProperty('--amplitude', amplitude + "deg");
  
  // Calculate how far the plane must travel to exit the outer circle.
  const dx = startX - centerX;
  const dy = startY - centerY;
  const b = 2 * (dx * Math.cos(flightAngle) + dy * Math.sin(flightAngle));
  const c = dx * dx + dy * dy - circleRadius * circleRadius;
  let tEdge = 0;
  const discriminant = b * b - 4 * c;
  if (discriminant >= 0) {
    tEdge = (-b + Math.sqrt(discriminant)) / 2;
  }
  // Extra distance (between 160 and 340px) so the plane flies a bit outside the circle.
  const extraDistance = randomBetween(160, 340);
  const totalDistance = tEdge + extraDistance;
  
  // Compute translation offsets for the wrapper.
  const translateX = totalDistance * Math.cos(flightAngle);
  const translateY = totalDistance * Math.sin(flightAngle);
  
  // Choose a fast flight duration between 1 and 3 seconds and a short random delay.
  const duration = randomBetween(1, 3);
  const delay = randomBetween(0, 0.5);
  
  // Animate the wrapper (translation and fade-out).
  wrapper.style.transition = `transform ${duration}s linear ${delay}s, opacity ${duration}s linear ${delay}s`;
  
  // Force reflow so the transition applies.
  wrapper.offsetWidth;
  
  // Start the animation: move along the flight path and fade out.
  wrapper.style.transform = `translate(${translateX}px, ${translateY}px)`;
  wrapper.style.opacity = 0;
  
  // Remove the wrapper (and its plane) after the animation completes.
  setTimeout(() => {
    wrapper.remove();
  }, (duration + delay) * 1000);
}

// Continuously spawn a new plane every 300ms.
setInterval(spawnPlane, 200);

// Adjust scroll effect for the man element.
scroll.on('scroll', (args) => {
  const man = document.querySelector('.man');
  if (!man) return;
  
  // Use a different multiplier on mobile vs PC.
  const multiplier = window.innerWidth <= 768 ? 0.19 : 0.5;
  const newBottom = 10 + args.scroll.y * multiplier;
  man.style.bottom = `${newBottom}px`;
});


const toggle = document.getElementById('toggle');
    const video = document.getElementById('video');
    const videoSource = document.getElementById('videoSource');

    toggle.addEventListener('change', () => {
      // Toggle the source based on the checkbox state
      if (toggle.checked) {
        videoSource.src = 'assets/2.mp4';
      } else {
        videoSource.src = 'assets/1.mp4';
      }
      // Reload the video to apply the new source
      video.load();
      video.play();
    });
    document.addEventListener('DOMContentLoaded', () => {
      const impressionDiv = document.getElementById('impression');
      if (!impressionDiv) return;
      
      // Ensure the impression container is positioned
      if (getComputedStyle(impressionDiv).position === 'static') {
        impressionDiv.style.position = 'relative';
      }
      
      impressionDiv.addEventListener('click', function(e) {
        // Get click coordinates relative to the impression container
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Spawn 10 particles
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('img');
          particle.src = 'assets/light.png'; // Ensure this path is correct
          particle.className = 'particle';
          particle.style.zIndex = '9999';
          
          // Set faster transition on the particle
          particle.style.transition = "transform 1s ease-out, opacity 1s ease-out";
          
          // Position the particle at the click location (centered, assuming 20px size)
          particle.style.left = (clickX - 10) + 'px';
          particle.style.top = (clickY - 10) + 'px';
          
          this.appendChild(particle);
          
          // Calculate random movement: angle (0 to 2π) and distance (100 to 300px)
          const angle = Math.random() * 2 * Math.PI;
          const distance = 100 + Math.random() * 200;
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;
          
          // Trigger the CSS transition after a short delay
          setTimeout(() => {
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = '0';
          }, 10);
          
          // Remove the particle after 1 second (the duration of the transition)
          setTimeout(() => {
            if (particle && particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 1000);
        }
      });
    });
    document.addEventListener('DOMContentLoaded', () => {
      const video = document.querySelector('video');
      if (!video) return;
      
      // Ensure necessary attributes are set
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      // Function to attempt to play the video
      function attemptPlay() {
        video.play().then(() => {
          // Video is playing successfully
        }).catch((error) => {
          console.error('Playback attempt failed:', error);
        });
      }
      
      // Try to play on load
      attemptPlay();
      
      // In case autoplay was blocked, listen for the first user interaction
      document.addEventListener('click', function onUserInteraction() {
        attemptPlay();
        document.removeEventListener('click', onUserInteraction);
      }, { once: true });
      
      document.addEventListener('touchstart', function onUserInteraction() {
        attemptPlay();
        document.removeEventListener('touchstart', onUserInteraction);
      }, { once: true });
    });

    document.getElementById("quoteForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent actual form submission
      
      // Get input values
      var name = document.getElementById("name").value;
      var message = document.getElementById("message").value;
  
      // Format message
      var whatsappMessage = `Hello, my name is *${name}*.\n\n` +
                            `*Question:* ${message}\n\n`;
  
      // WhatsApp URL
      var phoneNumber = "918360552306"; // Replace with your number (with country code, no + sign)
      var whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
      // Open WhatsApp
      window.open(whatsappURL, "_blank");
    });
    
    // Modal logic
    const modal = document.getElementById("gameModal");
    const playGameButton = document.getElementById("playGameButton");
    const closeModal = document.querySelector(".close-modal");
    const retryButton = document.getElementById("retryButton");
    const statusDisplay = document.getElementById("gameStatus");

    playGameButton.addEventListener("click", () => {
      modal.style.display = "block";
      resetGame();
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    retryButton.addEventListener("click", () => {
      resetGame();
    });

    // Tic Tac Toe Game Logic
    const board = Array(9).fill(null);
    const human = "X";
    const computer = "O";
    let gameActive = true;
    const cells = document.querySelectorAll(".cell");

    // Winning combinations
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Render the board on screen
    function renderBoard() {
      board.forEach((mark, index) => {
        const cellInner = document.querySelector(`.cell[data-index="${index}"] .cell-inner`);
        cellInner.textContent = mark ? mark : "";
        cellInner.classList.remove("x", "o");
        if (mark === human) cellInner.classList.add("x");
        else if (mark === computer) cellInner.classList.add("o");
      });
    }

    // Check winner or draw
    function checkWinner(newBoard) {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          return newBoard[a];
        }
      }
      return newBoard.every(cell => cell) ? "draw" : null;
    }

    // Handle human move
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (!board[index] && gameActive) {
          board[index] = human;
          renderBoard();
          let result = checkWinner(board);
          if (result) {
            endGame(result);
          } else {
            // Let computer take its turn after a slight delay
            setTimeout(computerMove, 200);
          }
        }
      });
    });

    // Computer move using minimax for unbeatable play
    function computerMove() {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = computer;
          let score = minimax(board, 0, false);
          board[i] = null;
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      board[move] = computer;
      renderBoard();
      let result = checkWinner(board);
      if (result) {
        endGame(result);
      }
    }

    // Scoring for minimax
    const scores = {
      [computer]: 10,
      [human]: -10,
      draw: 0
    };

    // Minimax algorithm for move selection
    function minimax(newBoard, depth, isMaximizing) {
      let result = checkWinner(newBoard);
      if (result !== null) {
        return scores[result];
      }
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
          if (!newBoard[i]) {
            newBoard[i] = computer;
            let score = minimax(newBoard, depth + 1, false);
            newBoard[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
          if (!newBoard[i]) {
            newBoard[i] = human;
            let score = minimax(newBoard, depth + 1, true);
            newBoard[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    // End game and show status
    function endGame(result) {
      gameActive = false;
      if (result === human) {
        statusDisplay.textContent = "You win!";
        retryButton.style.display = "none";
      } else if (result === computer) {
        statusDisplay.textContent = "Sorry! Anmol Cheema never loses.";
        retryButton.style.display = "block";
      } else if (result === "draw") {
        statusDisplay.textContent = "It's a draw!";
        retryButton.style.display = "block";
      }
    }

    // Reset game board for a new game
    function resetGame() {
      for (let i = 0; i < board.length; i++) {
        board[i] = null;
      }
      gameActive = true;
      statusDisplay.textContent = "";
      retryButton.style.display = "none";
      renderBoard();
    }