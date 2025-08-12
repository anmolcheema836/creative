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
 setTimeout(() => {
        document.getElementById('whatsappButton').style.display = 'block';
    }, 3000);

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
window.addEventListener('scroll', () => {
  const man = document.querySelector('.man');
  if (!man) return;
  
  // The logic inside remains the same, but we get the scroll position
  // from the native 'window.scrollY' property instead of 'args.scroll.y'.
  const multiplier = window.innerWidth <= 768 ? 0.19 : 0.5;
  const newBottom = 10 + window.scrollY * multiplier;
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

    // Modal and Navigation Logic
const modal = document.getElementById("gameModal");
const playGameButton = document.getElementById("playGameButton");
const closeModal = document.querySelector(".close-modal");
const gameContent = document.getElementById("gameContent");

playGameButton.addEventListener("click", () => {
  modal.style.display = "block";
  showGameSelection();
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  gameContent.innerHTML = "";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    gameContent.innerHTML = "";
  }
});

// Game Selection Screen
function showGameSelection() {
  gameContent.innerHTML = `
    <div class="game-selection">
      <h2 style="text-align:center;">Select a Game</h2>
      <div class="game-grid">
        <div class="game-card" onclick="loadTicTacToe()">Tic Tac Toe</div>
        <div class="game-card" onclick="loadMinesweeper()">Minesweeper</div>
        <div class="game-card" onclick="loadWhackAMole()">Whack‑a‑Mole</div>
        <div class="game-card" onclick="loadFlappyBird()">Flappy Bird</div>
      </div>
    </div>
  `;
}
// Back Button
function addBackButton() {
  const backBtn = document.createElement("button");
  backBtn.className = "back-button";
  backBtn.textContent = "Back to Games";
  backBtn.onclick = showGameSelection;
  gameContent.appendChild(backBtn);
}
// Retry Button Template
function addRetryButton(retryFunction) {
  const container = document.createElement("div");
  container.className = "button-container";
  const retryBtn = document.createElement("button");
  retryBtn.className = "retry-button";
  retryBtn.title = "Retry Game";
  retryBtn.innerHTML = "&#x21bb; Retry";
  retryBtn.onclick = retryFunction;
  container.appendChild(retryBtn);
  gameContent.appendChild(container);
}

/* ===============================
   Tic Tac Toe Implementation
   Unbeatable AI with Minimax Algorithm
=============================== */
function loadTicTacToe() {
  gameContent.innerHTML = `
    <h2 style="text-align:center;">Tic Tac Toe</h2>
    <div class="ttt-board" id="tttBoard">
      ${Array(9)
        .fill(0)
        .map(
          (_, i) => `<div class="ttt-cell" data-index="${i}">
        <div class="ttt-cell-inner"></div>
      </div>`
        )
        .join('')}
    </div>
    <div id="tttStatus" style="text-align:center; margin:10px 0; font-size:1.2em;"></div>
  `;
  addBackButton();

  const board = Array(9).fill(null);
  const human = "X";
  const computer = "O";
  let gameActive = true;
  let currentTurn = human;
  const cells = document.querySelectorAll(".ttt-cell");
  const statusDisplay = document.getElementById("tttStatus");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function renderBoard() {
    board.forEach((mark, index) => {
      const cellInner = document.querySelector(
        `.ttt-cell[data-index="${index}"] .ttt-cell-inner`
      );
      cellInner.textContent = mark ? mark : "";
      cellInner.className =
        "ttt-cell-inner " + (mark ? (mark === human ? "x" : "o") : "");
    });
  }
  function checkWinner(bd) {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return bd[a];
    }
    return bd.every((cell) => cell) ? "draw" : null;
  }
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = cell.getAttribute("data-index");
      if (currentTurn !== human || !gameActive || board[index]) return;
      board[index] = human;
      renderBoard();
      let result = checkWinner(board);
      if (result) {
        endGame(result);
      } else {
        currentTurn = computer;
        setTimeout(computerMove, 300);
      }
    });
  });
  function computerMove() {
    let bestScore = -Infinity,
      move;
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
    } else {
      currentTurn = human;
    }
  }
  const scores = { [computer]: 10, [human]: -10, draw: 0 };
  function minimax(bd, depth, isMaximizing) {
    let result = checkWinner(bd);
    if (result !== null) return scores[result];
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < bd.length; i++) {
        if (!bd[i]) {
          bd[i] = computer;
          let score = minimax(bd, depth + 1, false);
          bd[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < bd.length; i++) {
        if (!bd[i]) {
          bd[i] = human;
          let score = minimax(bd, depth + 1, true);
          bd[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
  function endGame(result) {
    gameActive = false;
    if (result === human)
      statusDisplay.textContent = "You win! (Unexpected)";
    else if (result === computer)
      statusDisplay.textContent = "80% Discount! If someone wins and sends me the screenshot 😉.";
    else statusDisplay.textContent = "It's a draw!";
    addRetryButton(loadTicTacToe);
  }
  renderBoard();
}

/* ===============================
   Minesweeper Implementation
=============================== */
function loadMinesweeper() {
  const rows = 8,
    cols = 8,
    bombsCount = 10;
  let board = Array.from({ length: rows }, () => Array(cols).fill(0));
  let revealed = Array.from({ length: rows }, () => Array(cols).fill(false));
  let gameOver = false;
  let bombsPlaced = 0;
  while (bombsPlaced < bombsCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c] !== "B") {
      board[r][c] = "B";
      bombsPlaced++;
    }
  }
  function countBombs(r, c) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nr = r + i,
          nc = c + j;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === "B")
          count++;
      }
    }
    return count;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] !== "B") {
        board[r][c] = countBombs(r, c);
      }
    }
  }
  function renderMinesweeper() {
    let html = `<h2 style="text-align:center;">Minesweeper</h2>
      <div class="ms-status" id="msStatus"></div>
      <div class="ms-board">`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let cellClass = "ms-cell";
        if (revealed[r][c]) cellClass += " revealed";
        let content = "";
        if (revealed[r][c]) {
          if (board[r][c] === "B") {
            cellClass += " bomb";
            content = "💣";
          } else if (board[r][c] > 0) {
            content = board[r][c];
          }
        }
        html += `<div class="${cellClass}" data-row="${r}" data-col="${c}">
            <div class="ms-cell-inner">${content}</div>
          </div>`;
      }
    }
    html += `</div>`;
    gameContent.innerHTML = html;
    addBackButton();
    addRetryButton(loadMinesweeper);
    addMsListeners();
  }
  function addMsListeners() {
    const cells = document.querySelectorAll(".ms-cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const r = +cell.getAttribute("data-row");
        const c = +cell.getAttribute("data-col");
        if (revealed[r][c] || gameOver) return;
        revealed[r][c] = true;
        if (board[r][c] === "B") {
          document.getElementById("msStatus").textContent = "Game Over!";
          gameOver = true;
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              if (board[i][j] === "B") revealed[i][j] = true;
            }
          }
        } else {
          if (board[r][c] === 0) {
            revealEmpty(r, c);
          }
        }
        renderMinesweeper();
      });
    });
  }
  function revealEmpty(r, c) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nr = r + i,
          nc = c + j;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !revealed[nr][nc]) {
          revealed[nr][nc] = true;
          if (board[nr][nc] === 0) {
            revealEmpty(nr, nc);
          }
        }
      }
    }
  }
  renderMinesweeper();
}

/* ===============================
   Whack‑a‑Mole Implementation
=============================== */
function loadWhackAMole() {
  const moleImageURL = "assets/mole.png";
  gameContent.innerHTML = `
    <h2 style="text-align:center;">Whack‑a‑Mole</h2>
    <div class="wam-info" id="wamScore">Score: 0</div>
    <div class="wam-info" id="wamTimer">Time: 30</div>
    <div class="wam-board">
      ${Array(9)
        .fill(0)
        .map((_, i) => `<div class="wam-cell" data-index="${i}"></div>`)
        .join('')}
    </div>
  `;
  addBackButton();
  let score = 0;
  let timeLeft = 30;
  const scoreDisplay = document.getElementById("wamScore");
  const timerDisplay = document.getElementById("wamTimer");
  const cells = document.querySelectorAll(".wam-cell");
  let moleInterval, countdownInterval;
  function showMole() {
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.onclick = null;
    });
    const randIndex = Math.floor(Math.random() * cells.length);
    if (moleImageURL) {
      const moleImg = document.createElement("img");
      moleImg.src = moleImageURL;
      moleImg.style.width = "100%";
      moleImg.style.height = "100%";
      moleImg.style.objectFit = "contain";
      cells[randIndex].appendChild(moleImg);
    } else {
      const moleDiv = document.createElement("div");
      moleDiv.className = "wam-mole";
      cells[randIndex].appendChild(moleDiv);
    }
    cells[randIndex].onclick = () => {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      cells[randIndex].innerHTML = "";
    };
  }
  moleInterval = setInterval(showMole, 1000);
  countdownInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(moleInterval);
      clearInterval(countdownInterval);
      timerDisplay.textContent = "Game Over! Final Score: " + score;
      cells.forEach((cell) => (cell.onclick = null));
    }
  }, 1000);
  addRetryButton(loadWhackAMole);
}

/* ===============================
   Flappy Bird Implementation
   Game begins only when the canvas is tapped.
   Easier parameters: lower gravity, reduced flap power, wider gap and slower pipes.
=============================== */
function loadFlappyBird() {
  const birdImageURL = "assets/flappy.gif";
  gameContent.innerHTML = `
    <h2 style="text-align:center;">Flappy Bird</h2>
    <canvas id="flappyCanvas" width="300" height="400"></canvas>
    <div class="fb-info" id="fbStatus"></div>
    <div class="fb-start" id="fbStartMessage">Tap the canvas to start</div>
  `;
  addBackButton();
  const canvas = document.getElementById("flappyCanvas");
  const ctx = canvas.getContext("2d");
  let bird = { x: 50, y: canvas.height / 2, radius: 10, velocity: 0, width: 30, height: 30 };
  const gravity = 0.3,
    flapPower = -7;
  let pipes = [];
  let frameCount = 0;
  let gameOver = false;
  let gameStarted = false;
  const pipeGap = 120;
  const pipeWidth = 40;
  const pipeSpeed = 1.5;
  let birdImage = null;
  if (birdImageURL) {
    birdImage = new Image();
    birdImage.src = birdImageURL;
  }
  canvas.addEventListener("click", startGame);
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !gameStarted) startGame();
  });
  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      document.getElementById("fbStartMessage").style.display = "none";
      canvas.removeEventListener("click", startGame);
      window.removeEventListener("keydown", startGame);
      canvas.addEventListener("click", flap);
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") flap();
      });
      updateFlappy();
    }
  }
  function flap() {
    if (!gameOver) bird.velocity = flapPower;
  }
  function createPipe() {
    const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 80)) + 40;
    pipes.push({
      x: canvas.width,
      top: topHeight,
      bottom: canvas.height - topHeight - pipeGap,
    });
  }
  function updateFlappy() {
    frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.velocity += gravity;
    bird.y += bird.velocity;
    if (birdImage) {
      ctx.drawImage(birdImage, bird.x - bird.width / 2, bird.y - bird.height / 2, bird.width, bird.height);
    } else {
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffeb3b";
      ctx.fill();
    }
    if (frameCount % 90 === 0) createPipe();
    for (let i = 0; i < pipes.length; i++) {
      let p = pipes[i];
      p.x -= pipeSpeed;
      ctx.fillStyle = "#4caf50";
      ctx.fillRect(p.x, 0, pipeWidth, p.top);
      ctx.fillRect(p.x, canvas.height - p.bottom, pipeWidth, p.bottom);
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + pipeWidth) {
        if (bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom) {
          gameOver = true;
        }
      }
    }
    if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0)
      gameOver = true;
    if (!gameOver) {
      requestAnimationFrame(updateFlappy);
    } else {
      document.getElementById("fbStatus").textContent = "Game Over! Click Retry to play again.";
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      addRetryButton(loadFlappyBird);
    }
  }
  function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (birdImage) {
      ctx.drawImage(birdImage, bird.x - bird.width / 2, bird.y - bird.height / 2, bird.width, bird.height);
    } else {
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffeb3b";
      ctx.fill();
    }
  }
  drawStartScreen();
}
console.log(
  "%c 🚀 Designed and Developed by Anmol Cheema ",
  "background: linear-gradient(90deg, #0f2027, #2c5364); color: #ffffff; font-weight: bold; font-size: 1rem; padding: 10px 20px; border-radius: 6px; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);"
);
console.log(
  "%c 💻 Designed and Developed by Anmol Cheema ",
  "background: linear-gradient(90deg, #00c9ff, #92fe9d); color: #000000; font-weight: bold; font-size: 1rem; padding: 10px 20px; border-radius: 6px; text-shadow: 1px 1px 2px rgba(255,255,255,0.5);"
);
