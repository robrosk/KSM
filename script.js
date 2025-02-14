document.addEventListener("DOMContentLoaded", function () {
    const heart = document.getElementById("heart");
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");
  
    // Resize the canvas to fill the window
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    // Array of messages for floating text
    const messages = [
      "Kelly is amazing!",
      "Valentine!",
      ":))",
      "You're the best!",
      "Grateful for you!",
      "XOXO",
      "VDay 2025!"
    ];
  
    // Heart click event for pulse and floating elements
    heart.addEventListener("click", function (e) {
      // Generate several floating elements on each click
      for (let i = 0; i < 5; i++) {
        createFloatingElement();
      }
      heart.classList.add("pulse");
      setTimeout(() => {
        heart.classList.remove("pulse");
      }, 300);
    });
  
    // Function to create a floating element that originates around the heart
    function createFloatingElement() {
      const floatingEl = document.createElement("div");
      floatingEl.classList.add("floating");
      
      // Randomly decide to display text or a heart symbol
      const isMessage = Math.random() > 0.5;
      floatingEl.textContent = isMessage
        ? messages[Math.floor(Math.random() * messages.length)]
        : "♥";
      
      // Calculate heart's center position
      const heartRect = heart.getBoundingClientRect();
      const centerX = heartRect.left + heartRect.width / 2;
      const centerY = heartRect.top + heartRect.height / 2;
      
      // Determine a random starting point around the heart
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * (heartRect.width / 2);
      const startX = centerX + radius * Math.cos(angle);
      const startY = centerY + radius * Math.sin(angle);
      
      floatingEl.style.left = startX + "px";
      floatingEl.style.top = startY + "px";
      
      // Randomize horizontal movement
      const randomX = (Math.random() - 0.5) * 100;
      floatingEl.style.setProperty("--translateX", randomX + "px");
      
      document.body.appendChild(floatingEl);
      
      // Remove the floating element after the animation ends
      floatingEl.addEventListener("animationend", () => {
        floatingEl.remove();
      });
    }
  
    /* --- Interactive Background Particle System --- */
  
    // Array to store particle objects
    const particles = [];
    const maxParticles = 100;
  
    // Particle constructor
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1; // Particle radius
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.alpha = 1;
    }
  
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.01; // Fade out effect
    };
  
    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = "#8B0000"; // Deep red color
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  
    // Update and draw all particles
    function handleParticles() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  
    // Main animation loop for the background
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }
    animate();
  
    // Create particles on mouse move
    window.addEventListener("mousemove", function (e) {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
    });
  
    // Create particles on touch move for mobile devices
    window.addEventListener("touchmove", function (e) {
      const touch = e.touches[0];
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(touch.clientX, touch.clientY));
        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
    });
  });
  