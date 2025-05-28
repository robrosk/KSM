document.addEventListener("DOMContentLoaded", function () {
    const heart = document.getElementById("heart");
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");
    const photoGallery = document.getElementById("photoGallery");
    const closeGallery = document.getElementById("closeGallery");
    const prevPhoto = document.getElementById("prevPhoto");
    const nextPhoto = document.getElementById("nextPhoto");
    const musicToggle = document.getElementById("musicToggle");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const daysCounter = document.getElementById("daysCounter");
  
    // Set your relationship start date here (YYYY, MM-1, DD) - Month is 0-indexed
    const relationshipStart = new Date(2025, 0, 4); // January 4, 2025
    
    // Calculate and display days together
    function updateDaysCounter() {
      const today = new Date();
      const timeDiff = today.getTime() - relationshipStart.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      daysCounter.textContent = daysDiff;
    }
    updateDaysCounter();
  
    // Resize the canvas to fill the window
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    // Enhanced array of personal messages
    const messages = [
      "Kelly is my everything! 💕",
      "You make every day brighter",
      "Forever grateful for you",
      "You're my favorite person",
      "My beautiful Kelly",
      "You're my happy place",
      "XOXO",
      "Best girlfriend ever!",
      "Lucky to love you 🍀",
    ];

    // Photo gallery functionality
    let currentPhotoIndex = 0;
    const photoSlides = document.querySelectorAll('.photo-slide');
    
    function showPhoto(index) {
      photoSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    function nextPhotoSlide() {
      currentPhotoIndex = (currentPhotoIndex + 1) % photoSlides.length;
      showPhoto(currentPhotoIndex);
    }
    
    function prevPhotoSlide() {
      currentPhotoIndex = (currentPhotoIndex - 1 + photoSlides.length) % photoSlides.length;
      showPhoto(currentPhotoIndex);
    }
    
    // Auto-advance photos every 4 seconds when gallery is open
    let photoInterval;
    
    function startPhotoSlideshow() {
      photoInterval = setInterval(nextPhotoSlide, 4000);
    }
    
    function stopPhotoSlideshow() {
      if (photoInterval) {
        clearInterval(photoInterval);
      }
    }

    // Music controls
    let isMusicPlaying = false;
    musicToggle.addEventListener("click", function() {
      if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = "🎵";
        musicToggle.style.opacity = "0.6";
      } else {
        backgroundMusic.play().catch(e => {
          console.log("Music play failed - user interaction required");
        });
        musicToggle.textContent = "🎶";
        musicToggle.style.opacity = "1";
      }
      isMusicPlaying = !isMusicPlaying;
    });

    // Heart click event - now opens photo gallery
    heart.addEventListener("click", function (e) {
      console.log("Heart clicked! Opening gallery...");
      
      // Show photo gallery
      photoGallery.style.display = "flex";
      console.log("Gallery display set to flex");
      
      setTimeout(() => {
        photoGallery.classList.add("show");
        console.log("Gallery show class added");
      }, 10);
      startPhotoSlideshow();
      
      // Generate floating elements
      for (let i = 0; i < 8; i++) {
        createFloatingElement();
      }
      heart.classList.add("pulse");
      setTimeout(() => {
        heart.classList.remove("pulse");
      }, 300);
    });

    // Gallery controls
    closeGallery.addEventListener("click", function() {
      photoGallery.classList.remove("show");
      stopPhotoSlideshow();
      setTimeout(() => {
        photoGallery.style.display = "none";
      }, 300);
    });

    nextPhoto.addEventListener("click", function() {
      nextPhotoSlide();
      stopPhotoSlideshow();
      startPhotoSlideshow(); // Restart timer
    });

    prevPhoto.addEventListener("click", function() {
      prevPhotoSlide();
      stopPhotoSlideshow();
      startPhotoSlideshow(); // Restart timer
    });

    // Close gallery when clicking outside
    photoGallery.addEventListener("click", function(e) {
      if (e.target === photoGallery) {
        closeGallery.click();
      }
    });
  
    // Enhanced floating element function
    function createFloatingElement() {
      const floatingEl = document.createElement("div");
      floatingEl.classList.add("floating");
      
      // More variety in floating elements
      const elementType = Math.random();
      if (elementType < 0.4) {
        floatingEl.textContent = messages[Math.floor(Math.random() * messages.length)];
      } else if (elementType < 0.7) {
        floatingEl.textContent = "♥";
        floatingEl.style.fontSize = Math.random() * 20 + 20 + "px";
      } else if (elementType < 0.85) {
        floatingEl.textContent = "✨";
      } else {
        const emojis = ["💕", "💖", "💝", "🌟", "💫", "🦋", "🌸", "💐"];
        floatingEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      }
      
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
      
      // Enhanced movement patterns
      const randomX = (Math.random() - 0.5) * 200;
      const randomRotation = (Math.random() - 0.5) * 360;
      floatingEl.style.setProperty("--translateX", randomX + "px");
      floatingEl.style.setProperty("--rotation", randomRotation + "deg");
      
      document.body.appendChild(floatingEl);
      
      // Remove the floating element after the animation ends
      floatingEl.addEventListener("animationend", () => {
        floatingEl.remove();
      });
    }
  
    /* --- Enhanced Interactive Background Particle System --- */
  
    // Array to store particle objects
    const particles = [];
    const maxParticles = 150;
    
    // Array to store cursor trail particles
    const trailParticles = [];
    const maxTrailParticles = 50;
  
    // Enhanced Particle constructor with more variety
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = (Math.random() - 0.5) * 3;
      this.alpha = 1;
      this.color = this.getRandomColor();
      this.shape = Math.random() > 0.8 ? 'heart' : 'circle';
    }
    
    // Cursor Trail Particle constructor
    function TrailParticle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 12 + 6; // Increased size for better visibility
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.alpha = 1;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.005; // Slower decay for longer trails
    }
    
    TrailParticle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.alpha = this.life;
      this.size *= 0.99; // Slower shrinking
    };
    
    TrailParticle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      
      // Create a brighter radial gradient for better visibility
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a solid white center for extra brightness
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.alpha * 0.8) + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };
    
    Particle.prototype.getRandomColor = function() {
      const colors = ["#ff69b4", "#ff1493", "#dc143c", "#ff6347", "#ffc0cb", "#ffb6c1"];
      return colors[Math.floor(Math.random() * colors.length)];
    };
  
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.008; // Slower fade for longer trails
    };
  
    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      
      if (this.shape === 'heart') {
        this.drawHeart();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };
    
    Particle.prototype.drawHeart = function() {
      const size = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + size/2);
      ctx.bezierCurveTo(this.x, this.y, this.x - size/2, this.y, this.x - size/2, this.y + size/4);
      ctx.bezierCurveTo(this.x - size/2, this.y + size/2, this.x, this.y + size, this.x, this.y + size);
      ctx.bezierCurveTo(this.x, this.y + size, this.x + size/2, this.y + size/2, this.x + size/2, this.y + size/4);
      ctx.bezierCurveTo(this.x + size/2, this.y, this.x, this.y, this.x, this.y + size/2);
      ctx.fill();
    };
  
    // Update and draw all particles
    function handleParticles() {
      // Handle regular particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      // Handle cursor trail particles
      for (let i = 0; i < trailParticles.length; i++) {
        trailParticles[i].update();
        trailParticles[i].draw();
        if (trailParticles[i].life <= 0) {
          trailParticles.splice(i, 1);
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
      // Create regular colored particles (fewer)
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
      
      // Create white trail particles (more for better trail effect)
      for (let i = 0; i < 10; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        trailParticles.push(new TrailParticle(e.clientX + offsetX, e.clientY + offsetY));
        if (trailParticles.length > maxTrailParticles) {
          trailParticles.shift();
        }
      }
    });
  
    // Create particles on touch move for mobile devices
    window.addEventListener("touchmove", function (e) {
      const touch = e.touches[0];
      
      // Create regular colored particles
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(touch.clientX, touch.clientY));
        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
      
      // Create white trail particles
      for (let i = 0; i < 6; i++) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        trailParticles.push(new TrailParticle(touch.clientX + offsetX, touch.clientY + offsetY));
        if (trailParticles.length > maxTrailParticles) {
          trailParticles.shift();
        }
      }
    });

    // Add some ambient particles that float around
    function createAmbientParticles() {
      if (particles.length < maxParticles - 20) {
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particles.push(new Particle(x, y));
        }
      }
    }
    
    // Create ambient particles every few seconds
    setInterval(createAmbientParticles, 3000);
  });
  