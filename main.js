// Nexora Cinematic Experience Orchestrator
document.addEventListener('DOMContentLoaded', () => {
  const canvasEngine = new CinematicCanvas('cinematic-canvas');
  
  // Audio disabled mock
  window.synth = {
    startDrone: () => {},
    stopDrone: () => {},
    playGlitch: () => {},
    playImpact: () => {},
    playRiser: () => {},
    playSnap: () => {},
    toggleMute: () => false
  };
  
  // DOM Elements
  const loaderOverlay = document.getElementById('loader-overlay');
  const btnEnter = document.getElementById('btn-enter');
  const btnPlayPause = document.getElementById('btn-play-pause');
  // Audio disabled
  const btnModeToggle = document.getElementById('btn-mode-toggle');
  const timelineProgress = document.getElementById('timeline-progress');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const registrationSection = document.getElementById('registration-section');
  const registerForm = document.getElementById('register-form');
  const formChamber = document.getElementById('form-chamber');
  const formSuccess = document.getElementById('form-success');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  // Custom Cursor Elements
  const customCursor = document.getElementById('custom-cursor');
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  // Adding hover cursor expander
  const interactiveElements = document.querySelectorAll('button, input, select, .timeline-container');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  // State Variables
  let isPlaying = false;
  let isAutoplay = true; // false = Scroll-Driven Control
  let currentTime = 0; // seconds
  const totalDuration = 54; // seconds (matching plan)
  let lastFrameTime = performance.now();
  let timelineProgressPercentage = 0;

  // Scene Segment Timings
  const timelineCuts = [
    { t: 0, p: 0.0 },  // Start
    { t: 4, p: 1.0 },  // Scene 1 End
    { t: 9, p: 2.0 },  // Scene 2 End
    { t: 13, p: 3.0 }, // Scene 3 End
    { t: 17, p: 4.0 }, // Scene 4 End
    { t: 23, p: 5.0 }, // Scene 5 End
    { t: 28, p: 6.0 }, // Scene 6 End
    { t: 33, p: 7.0 }, // Scene 7 End
    { t: 43, p: 8.0 }, // Scene 8 End
    { t: 48, p: 9.0 }, // Scene 9 End
    { t: 54, p: 10.0 } // Scene 10 End
  ];

  // DOM Text Overlays Config
  const textOverlays = [
    { id: 'txt-awakening-1', pStart: 1.0, pEnd: 1.45 }, // THE FUTURE
    { id: 'txt-awakening-2', pStart: 1.55, pEnd: 2.0 }, // IS NOT WAITING.
    { id: 'txt-the-signal', pStart: 3.0, pEnd: 4.0 },   // THE SIGNAL
    { id: 'txt-build', pStart: 5.0, pEnd: 5.25 },
    { id: 'txt-break', pStart: 5.25, pEnd: 5.5 },
    { id: 'txt-rebuild', pStart: 5.5, pEnd: 5.75 },
    { id: 'txt-next-era', pStart: 5.75, pEnd: 6.0 },
    { id: 'txt-theme-ai', pStart: 7.0, pEnd: 7.2 },
    { id: 'txt-theme-health', pStart: 7.2, pEnd: 7.4 },
    { id: 'txt-theme-cyber', pStart: 7.4, pEnd: 7.6 },
    { id: 'txt-theme-robotics', pStart: 7.6, pEnd: 7.8 },
    { id: 'txt-theme-climate', pStart: 7.8, pEnd: 8.0 },
    { id: 'txt-ready-build', pStart: 9.2, pEnd: 10.0 }
  ];

  // Helper: map time to progress (piecewise linear interpolation)
  function getProgressFromTime(t) {
    if (t <= 0) return 0.0;
    if (t >= totalDuration) return 10.0;
    
    // Find matching segment
    for (let i = 0; i < timelineCuts.length - 1; i++) {
      const segStart = timelineCuts[i];
      const segEnd = timelineCuts[i+1];
      if (t >= segStart.t && t <= segEnd.t) {
        const factor = (t - segStart.t) / (segEnd.t - segStart.t);
        return segStart.p + factor * (segEnd.p - segStart.p);
      }
    }
    return 0.0;
  }

  // Helper: map progress to time
  function getTimeFromProgress(p) {
    if (p <= 0.0) return 0.0;
    if (p >= 10.0) return totalDuration;

    for (let i = 0; i < timelineCuts.length - 1; i++) {
      const segStart = timelineCuts[i];
      const segEnd = timelineCuts[i+1];
      if (p >= segStart.p && p <= segEnd.p) {
        const factor = (p - segStart.p) / (segEnd.p - segStart.p);
        return segStart.t + factor * (segEnd.t - segStart.t);
      }
    }
    return 0.0;
  }

  // Initialize Canvas after fonts load
  document.fonts.ready.then(() => {
    canvasEngine.init();
  });

  // Enter Button
  btnEnter.addEventListener('click', () => {
    loaderOverlay.style.opacity = '0';
    setTimeout(() => {
      loaderOverlay.style.visibility = 'hidden';
      startExperience();
    }, 1200);
  });

  function startExperience() {
    isPlaying = true;
    lastFrameTime = performance.now();
    
    // Start sub drone audio
    window.synth.startDrone();
    window.synth.playImpact(0.5); // Warm up sub drop
    
    btnPlayPause.innerHTML = 'PAUSE';
    
    requestAnimationFrame(updateLoop);
  }

  // Playback sound trigger logs to avoid duplicates
  let soundFlags = {
    awakening1: false,
    awakening2: false,
    fracture: false,
    riser: false,
    nexoraReveal: false,
    build: false,
    break: false,
    rebuild: false,
    nextEra: false,
    themeAI: false,
    themeHealth: false,
    themeCyber: false,
    themeRobotics: false,
    themeClimate: false,
    countdown3: false,
    countdown2: false,
    countdown1: false,
    portal: false
  };

  // Triggers cinematic sound synthesis based on sequence timeline
  function triggerAudioCues(t, p) {
    if (!isAutoplay) return; // Audio is best sync'd in autoplay mode

    // 1. Digital Awakening Text reveals
    if (p >= 1.0 && p < 1.1 && !soundFlags.awakening1) {
      window.synth.playGlitch();
      soundFlags.awakening1 = true;
    }
    if (p >= 1.55 && p < 1.65 && !soundFlags.awakening2) {
      window.synth.playGlitch();
      soundFlags.awakening2 = true;
    }

    // 2. Glass Fracture
    if (p >= 2.0 && p < 2.05 && !soundFlags.fracture) {
      window.synth.playImpact(0.85); // High metallic sweep
      canvasEngine.camera.shake = 25; // Screen shake
      soundFlags.fracture = true;
    }

    // 3. Riser for Nexora birth
    if (p >= 4.0 && p < 4.05 && !soundFlags.riser) {
      window.synth.playRiser(3.8); // 3.8s crescendo
      soundFlags.riser = true;
    }

    // 4. NEXORA Exploding reveal!
    if (p >= 4.65 && p < 4.7 && !soundFlags.nexoraReveal) {
      window.synth.playImpact(1.4); // Ultra sub bass drop & ring
      canvasEngine.camera.shake = 45; // Huge shake
      soundFlags.nexoraReveal = true;
    }

    // 5. Typography Cinematic Snaps
    if (p >= 5.0 && p < 5.05 && !soundFlags.build) {
      window.synth.playSnap();
      canvasEngine.camera.shake = 10;
      soundFlags.build = true;
    }
    if (p >= 5.25 && p < 5.3 && !soundFlags.break) {
      window.synth.playSnap();
      canvasEngine.camera.shake = 12;
      soundFlags.break = true;
    }
    if (p >= 5.5 && p < 5.55 && !soundFlags.rebuild) {
      window.synth.playSnap();
      canvasEngine.camera.shake = 10;
      soundFlags.rebuild = true;
    }
    if (p >= 5.75 && p < 5.8 && !soundFlags.nextEra) {
      window.synth.playImpact(1.1); // Strong metallic strike
      canvasEngine.camera.shake = 20;
      soundFlags.nextEra = true;
    }

    // 6. World reveals
    if (p >= 7.0 && p < 7.05 && !soundFlags.themeAI) {
      window.synth.playGlitch();
      soundFlags.themeAI = true;
    }
    if (p >= 7.2 && p < 7.25 && !soundFlags.themeHealth) {
      window.synth.playGlitch();
      soundFlags.themeHealth = true;
    }
    if (p >= 7.4 && p < 7.45 && !soundFlags.themeCyber) {
      window.synth.playGlitch();
      soundFlags.themeCyber = true;
    }
    if (p >= 7.6 && p < 7.65 && !soundFlags.themeRobotics) {
      window.synth.playGlitch();
      soundFlags.themeRobotics = true;
    }
    if (p >= 7.8 && p < 7.85 && !soundFlags.themeClimate) {
      window.synth.playGlitch();
      soundFlags.themeClimate = true;
    }

    // 7. Countdown snaps
    if (p >= 8.0 && p < 8.05 && !soundFlags.countdown3) {
      window.synth.playSnap();
      soundFlags.countdown3 = true;
    }
    if (p >= 8.33 && p < 8.38 && !soundFlags.countdown2) {
      window.synth.playSnap();
      soundFlags.countdown2 = true;
    }
    if (p >= 8.66 && p < 8.71 && !soundFlags.countdown1) {
      window.synth.playSnap();
      soundFlags.countdown1 = true;
    }

    // 8. Portal Hum
    if (p >= 9.0 && p < 9.05 && !soundFlags.portal) {
      window.synth.playImpact(0.9);
      soundFlags.portal = true;
    }
  }

  // Resets audio flags if time leaps backwards (e.g. scrubbing)
  function resetSoundFlagsAfterTime(t) {
    const p = getProgressFromTime(t);
    if (p < 1.0) soundFlags.awakening1 = false;
    if (p < 1.55) soundFlags.awakening2 = false;
    if (p < 2.0) soundFlags.fracture = false;
    if (p < 4.0) soundFlags.riser = false;
    if (p < 4.65) soundFlags.nexoraReveal = false;
    if (p < 5.0) soundFlags.build = false;
    if (p < 5.25) soundFlags.break = false;
    if (p < 5.5) soundFlags.rebuild = false;
    if (p < 5.75) soundFlags.nextEra = false;
    if (p < 7.0) soundFlags.themeAI = false;
    if (p < 7.2) soundFlags.themeHealth = false;
    if (p < 7.4) soundFlags.themeCyber = false;
    if (p < 7.6) soundFlags.themeRobotics = false;
    if (p < 7.8) soundFlags.themeClimate = false;
    if (p < 8.0) soundFlags.countdown3 = false;
    if (p < 8.33) soundFlags.countdown2 = false;
    if (p < 8.66) soundFlags.countdown1 = false;
    if (p < 9.0) soundFlags.portal = false;
  }

  // Update DOM typography overlays based on timeline progress
  function updateTextOverlays(progress) {
    textOverlays.forEach(overlay => {
      const el = document.getElementById(overlay.id);
      if (el) {
        if (progress >= overlay.pStart && progress < overlay.pEnd) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    // Reveal Registration Page at Scene 10
    if (progress >= 9.2) {
      registrationSection.classList.add('active');
    } else {
      registrationSection.classList.remove('active');
    }

    // Reveal Theme Sidebar at Scene 7 & 8 (progress 6.0 to 8.0)
    const themeSidebar = document.getElementById('theme-sidebar');
    if (themeSidebar) {
      if (progress >= 6.0 && progress < 8.0) {
        themeSidebar.classList.add('visible');
        
        // Determine active sidebar item based on progress
        const p = progress - 7.0; // active worlds from 7.0 to 8.0
        let activeIdx = -1;
        if (p >= 0) {
          const activeWorld = Math.floor(p * 5); // 0: AI, 1: Health, 2: Cyber, 3: Robotics, 4: Climate
          if (activeWorld === 0) activeIdx = 0; // Neural
          else if (activeWorld === 1) activeIdx = 1; // DNA
          else if (activeWorld >= 2) activeIdx = 2; // Cyber / Robotics / Climate highlight third module
        }
        
        document.querySelectorAll('.sidebar-item').forEach((item, idx) => {
          if (idx === activeIdx) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      } else {
        themeSidebar.classList.remove('visible');
      }
    }
  }

  // Main animation frame loop
  function updateLoop(now) {
    if (!isPlaying && isAutoplay) return;

    if (isAutoplay) {
      const delta = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      currentTime += delta;
      
      if (currentTime >= totalDuration) {
        currentTime = totalDuration;
        isPlaying = false;
        btnPlayPause.innerHTML = 'PLAY';
      }
      
      const progress = getProgressFromTime(currentTime);
      
      // Update canvas, audio cues, overlays
      canvasEngine.render(progress);
      triggerAudioCues(currentTime, progress);
      updateTextOverlays(progress);

      // Render timeline progress bar
      timelineProgressPercentage = (currentTime / totalDuration) * 100;
      timelineProgress.style.width = timelineProgressPercentage + '%';
      
      // Update Timer HUD
      timeCurrent.innerHTML = formatTime(currentTime);
    } else {
      // Scroll Driven Control
      const scrollPos = window.scrollY;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollMax > 0 ? scrollPos / scrollMax : 0;
      
      const progress = scrollPercent * 10.0;
      currentTime = scrollPercent * totalDuration;
      
      canvasEngine.render(progress);
      updateTextOverlays(progress);

      // Synced scrubber
      timelineProgressPercentage = scrollPercent * 100;
      timelineProgress.style.width = timelineProgressPercentage + '%';
      timeCurrent.innerHTML = formatTime(currentTime);
    }

    requestAnimationFrame(updateLoop);
  }

  // Helper: format seconds to 00:00 style
  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  timeTotal.innerHTML = formatTime(totalDuration);

  // Play/Pause Button
  btnPlayPause.addEventListener('click', () => {
    if (!isAutoplay) return; // Ignore in scroll mode
    
    isPlaying = !isPlaying;
    btnPlayPause.innerHTML = isPlaying ? 'PAUSE' : 'PLAY';
    
    if (isPlaying) {
      lastFrameTime = performance.now();
      window.synth.startDrone();
      requestAnimationFrame(updateLoop);
    } else {
      window.synth.stopDrone();
    }
  });

  // Audio controls removed

  // Autoplay vs Scroll Mode Toggle
  btnModeToggle.addEventListener('click', () => {
    isAutoplay = !isAutoplay;
    
    if (isAutoplay) {
      document.body.classList.remove('scroll-mode');
      scrollIndicator.style.display = 'none';
      btnPlayPause.style.display = 'block';
      
      // Resume from current percentage
      currentTime = (timelineProgressPercentage / 100) * totalDuration;
      lastFrameTime = performance.now();
      isPlaying = true;
      btnPlayPause.innerHTML = 'PAUSE';
      btnModeToggle.innerHTML = 'SWITCH TO SCROLL CONTROL';
      window.synth.startDrone();
      requestAnimationFrame(updateLoop);
    } else {
      document.body.classList.add('scroll-mode');
      scrollIndicator.style.display = 'flex';
      btnPlayPause.style.display = 'none';
      btnModeToggle.innerHTML = 'SWITCH TO MOVIE MODE';
      
      // Stop drone to avoid infinite loops in scroll mode unless interacting
      window.synth.stopDrone();
      
      // Sync scroll bar to current progress
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, (timelineProgressPercentage / 100) * scrollMax);
      
      // Run rendering cycle once
      isPlaying = false;
      requestAnimationFrame(updateLoop);
    }
  });

  // Handle manual timeline scrubber clicks
  const timelineContainer = document.querySelector('.timeline-container');
  timelineContainer.addEventListener('click', (e) => {
    if (!isAutoplay) return; // Only scrubber in Autoplay Mode
    
    const rect = timelineContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(1.0, Math.max(0, clickX / rect.width));
    
    currentTime = percent * totalDuration;
    resetSoundFlagsAfterTime(currentTime);
    
    if (!isPlaying) {
      // Render single frame to update visual immediately
      const progress = getProgressFromTime(currentTime);
      canvasEngine.render(progress);
      updateTextOverlays(progress);
      timelineProgress.style.width = (percent * 100) + '%';
      timeCurrent.innerHTML = formatTime(currentTime);
    }
  });

  // Window Resize
  window.addEventListener('resize', () => {
    canvasEngine.resize();
    canvasEngine.init(); // Re-scan texts coordinates for new resolution
  });

  // Registration Form handler
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate glowing submit impact
    window.synth.playImpact(1.2);
    canvasEngine.camera.shake = 30;
    
    // Hide form elements and reveal success screen
    formChamber.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Explode particles in canvas
    for (let i = 0; i < canvasEngine.maxParticles; i++) {
      const p = canvasEngine.particles[i];
      p.x = (Math.random() - 0.5) * 50;
      p.y = (Math.random() - 0.5) * 50;
      p.z = Math.random() * 200 + 400;
    }
  });
});
