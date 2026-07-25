// Nexora 3D Cinematic Particle and Rendering Engine
class CinematicCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // Offscreen canvas for scanning typography coordinates
    this.scanCanvas = document.createElement('canvas');
    this.scanCtx = this.scanCanvas.getContext('2d', { willReadFrequently: true });
    
    this.width = 0;
    this.height = 0;
    this.resize();

    // Camera settings
    this.camera = {
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
      pitch: 0,
      roll: 0,
      fov: 380,
      shake: 0
    };

    // Parallax mouse offsets
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      this.mouse.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    // Particle pool: we keep a constant pool of 1200 particles
    this.maxParticles = 1200;
    this.particles = [];
    
    // Theme environment pools
    this.neuralNetwork = [];
    this.dnaStrands = [];
    this.cyberVault = [];
    this.glassShards = [];
    
    // Predefined scan targets
    this.targets = {
      theFuture: [],
      isNotWaiting: [],
      nexora: [],
      num3: [],
      num2: [],
      num1: [],
      portal: [],
      buildText: [],
      breakText: [],
      rebuildText: [],
      nextEraText: []
    };

    this.initialized = false;
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  // Scanner: Draws text to offscreen canvas and grabs coordinate points
  scanTypography(text, fontSize, targetArray, scale = 1.0) {
    const w = 1200;
    const h = 400;
    this.scanCanvas.width = w;
    this.scanCanvas.height = h;
    
    this.scanCtx.fillStyle = '#000000';
    this.scanCtx.fillRect(0, 0, w, h);
    
    this.scanCtx.fillStyle = '#FFFFFF';
    this.scanCtx.font = `900 ${fontSize}px 'Montserrat', 'Syne', 'Orbitron', 'Outfit', sans-serif`;
    this.scanCtx.textAlign = 'center';
    this.scanCtx.textBaseline = 'middle';
    
    this.scanCtx.fillText(text, w / 2, h / 2);
    
    const imgData = this.scanCtx.getImageData(0, 0, w, h);
    const data = imgData.data;
    
    // Sweep pixels
    const step = 4; // Sub-sample step for particle counts
    targetArray.length = 0;
    
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const index = (y * w + x) * 4;
        if (data[index] > 128) {
          // Map to 3D space
          targetArray.push({
            x: (x - w / 2) * scale,
            y: (y - h / 2) * scale,
            z: 0
          });
        }
      }
    }
  }

  init() {
    // 1. Generate text particle coordinates
    this.scanTypography("THE FUTURE", 120, this.targets.theFuture, 1.8);
    this.scanTypography("IS NOT WAITING.", 95, this.targets.isNotWaiting, 1.8);
    this.scanTypography("NEXORA", 160, this.targets.nexora, 2.2);
    this.scanTypography("3", 260, this.targets.num3, 3.5);
    this.scanTypography("2", 260, this.targets.num2, 3.5);
    this.scanTypography("1", 260, this.targets.num1, 3.5);
    
    // Quick cinematic typography scans (Scene 6)
    this.scanTypography("BUILD.", 140, this.targets.buildText, 2.2);
    this.scanTypography("BREAK.", 140, this.targets.breakText, 2.2);
    this.scanTypography("REBUILD.", 130, this.targets.rebuildText, 2.2);
    this.scanTypography("THE NEXT ERA.", 90, this.targets.nextEraText, 1.9);

    // 2. Generate portal targets (whirlpool shape in 3D)
    this.targets.portal = [];
    for (let i = 0; i < this.maxParticles; i++) {
      const angle = (i / this.maxParticles) * Math.PI * 2 * 12; // Helix spirals
      const radius = 100 + (i / this.maxParticles) * 400;
      const pZ = -100 + (i / this.maxParticles) * 300;
      this.targets.portal.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: pZ
      });
    }

    // 3. Initialize active particle pool with random coordinates (representing Space Void stars)
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        z: Math.random() * 2500 + 100,
        color: 'rgba(255, 255, 255, 0.8)',
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.04 + 0.01,
        // Glitch state
        gx: 0, gy: 0, gz: 0,
        gLife: 0
      });
    }

    // 4. Generate glass shards for Time Fracture (Scene 3)
    this.glassShards = [];
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 400 + 100;
      const centerZ = Math.random() * 800 + 600;
      const shX = Math.cos(angle) * r;
      const shY = Math.sin(angle) * r;
      
      // Shape points (a random polygon centered around shX, shY, centerZ)
      const points = [];
      const numPoints = Math.floor(Math.random() * 3) + 3; // Triangles or quadrilaterals
      const size = Math.random() * 60 + 20;
      for (let j = 0; j < numPoints; j++) {
        const ptAngle = (j / numPoints) * Math.PI * 2 + Math.random() * 0.4;
        points.push({
          x: shX + Math.cos(ptAngle) * size,
          y: shY + Math.sin(ptAngle) * size,
          z: centerZ + (Math.random() - 0.5) * 20
        });
      }

      this.glassShards.push({
        center: { x: shX, y: shY, z: centerZ },
        points: points,
        opacity: Math.random() * 0.4 + 0.2,
        color: i % 2 === 0 ? 'rgba(0, 245, 255, 0.35)' : 'rgba(123, 47, 247, 0.35)',
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    // 5. Generate neural net nodes for Theme World - AI (Scene 8)
    this.neuralNetwork = [];
    for (let i = 0; i < 80; i++) {
      this.neuralNetwork.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 1500 + 500,
        size: Math.random() * 3 + 1,
        connections: []
      });
    }

    // Connect close neural network nodes
    for (let i = 0; i < this.neuralNetwork.length; i++) {
      const nodeA = this.neuralNetwork[i];
      for (let j = i + 1; j < this.neuralNetwork.length; j++) {
        const nodeB = this.neuralNetwork[j];
        const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y, nodeA.z - nodeB.z);
        if (dist < 280) {
          nodeA.connections.push(j);
        }
      }
    }

    // 6. Generate DNA helix coordinates (Healthcare)
    this.dnaStrands = [];
    for (let i = 0; i < 120; i++) {
      const theta = (i / 120) * Math.PI * 8; // Loops
      const radius = 100;
      const dnaY = (i / 120) * 1600 - 800;
      this.dnaStrands.push({
        theta: theta,
        radius: radius,
        y: dnaY,
        z: 1000 // Fixed z depth
      });
    }

    // 7. Generate Cybersecurity vault grid
    this.cyberVault = [];
    for (let i = -4; i <= 4; i++) {
      for (let j = 0; j < 15; j++) {
        this.cyberVault.push({
          x: i * 150,
          y: (Math.sin(j * 0.5) * 150),
          z: j * 120 + 400
        });
      }
    }

    this.initialized = true;
  }

  // 3D Projection math
  project(x, y, z) {
    // Camera transformations
    let tx = x - this.camera.x;
    let ty = y - this.camera.y;
    let tz = z - this.camera.z;

    // Apply camera shake (diminishing over time)
    if (this.camera.shake > 0.1) {
      tx += (Math.random() - 0.5) * this.camera.shake;
      ty += (Math.random() - 0.5) * this.camera.shake;
      this.camera.shake *= 0.95; // Decay
    }

    // Yaw (Y axis rotation)
    let cosY = Math.cos(this.camera.yaw);
    let sinY = Math.sin(this.camera.yaw);
    let rx1 = tx * cosY - tz * sinY;
    let rz1 = tx * sinY + tz * cosY;

    // Pitch (X axis rotation)
    let cosP = Math.cos(this.camera.pitch);
    let sinP = Math.sin(this.camera.pitch);
    let ry2 = ty * cosP - rz1 * sinP;
    let rz2 = ty * sinP + rz1 * cosP;

    // Roll (Z axis rotation)
    let cosR = Math.cos(this.camera.roll);
    let sinR = Math.sin(this.camera.roll);
    let rx3 = rx1 * cosR - ry2 * sinR;
    let ry3 = rx1 * sinR + ry2 * cosR;

    if (rz2 <= 1.0) return null; // Behind camera clipping

    const scale = this.camera.fov / rz2;
    const sx = this.width / 2 + rx3 * scale;
    const sy = this.height / 2 + ry3 * scale;

    return {
      x: sx,
      y: sy,
      scale: scale,
      depth: rz2
    };
  }

  // Main Render pipeline
  render(progress) {
    if (!this.initialized) return;

    // Smooth mouse parallax interpolation
    this.mouse.x += (this.mouse.targetX * 50 - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY * 50 - this.mouse.y) * 0.05;
    
    // Clear viewport depending on the active scene's lighting context
    if (progress >= 5.0 && progress < 6.0) {
      // Scene 6: Mission Statement (light grey-blue mist background)
      this.ctx.fillStyle = '#e8ecf2';
    } else if (progress >= 9.0) {
      // Scene 10: Registration (bright white chamber background)
      this.ctx.fillStyle = '#f5f7fa';
    } else {
      // Normal deep space
      this.ctx.fillStyle = '#050816';
    }
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Apply color journey base overlays based on progress
    this.renderAtmosphericGlow(progress);

    // Draw white room perspective grid for Scene 10
    if (progress >= 9.0) {
      this.renderWhiteChamber(progress);
    }

    // Draw grid floor if corridor or specific worlds
    if (progress > 6.0 && progress < 8.0) {
      this.renderPerspectiveCorridor(progress);
      this.renderFloatingIcons(progress);
    }

    // Delegate camera path calculations
    this.updateCameraPath(progress);
    
    if (progress >= 1.0 && progress < 2.0) {
      this.renderDigitalGlitchLines();
    }
    
    if (progress >= 3.0 && progress < 4.0) {
      this.renderOrbitingOrbAndRings(progress);
    }

    this.updateAndRenderParticles(progress);

    if (progress >= 2.0 && progress < 3.0) {
      this.renderShatteredScreen(progress);
      this.renderFracturedGlass(progress);
    }
    
    if (progress >= 5.0 && progress < 6.0) {
      this.renderVolumetricMist(progress);
    }
    
    if (progress >= 7.0 && progress < 8.0) {
      this.renderThemeWorld(progress);
    }
    
    if (progress >= 8.0 && progress < 9.0) {
      this.renderCockpitOverlay(progress);
    }

    // Volumetric center explosion flash
    if (progress >= 4.65 && progress < 5.0) {
      this.renderExplosionFlash(progress);
    }
  }

  // Camera Timeline mapping
  updateCameraPath(progress) {
    // 0 to 10 scale
    // Damp camera movement based on mouse parallax
    this.camera.x = this.mouse.x;
    this.camera.y = this.mouse.y;

    if (progress < 1.0) {
      // Scene 1: The Void
      // Slow dolly forward
      this.camera.z = progress * 600;
      this.camera.yaw = (progress * 0.03);
      this.camera.pitch = Math.sin(progress * Math.PI) * 0.02;
    } 
    else if (progress >= 1.0 && progress < 2.0) {
      // Scene 2: Digital Awakening
      const p = progress - 1.0;
      this.camera.z = 600 + p * 200;
      this.camera.yaw = 0.03 - p * 0.04;
      this.camera.pitch = (Math.sin(p * Math.PI) * 0.03);
    }
    else if (progress >= 2.0 && progress < 3.0) {
      // Scene 3: Time Fracture
      const p = progress - 2.0;
      // High speed camera plunge through the shards
      this.camera.z = 800 + p * 1200;
      this.camera.yaw = -0.01 + p * 0.08;
      this.camera.roll = p * 0.15;
    }
    else if (progress >= 3.0 && progress < 4.0) {
      // Scene 4: The Signal
      const p = progress - 3.0;
      this.camera.z = 2000 + p * 200;
      this.camera.yaw = 0.07 + Math.sin(p * Math.PI * 0.5) * 0.2;
      this.camera.pitch = 0.1;
    }
    else if (progress >= 4.0 && progress < 5.0) {
      // Scene 5: Nexora Reveal
      const p = progress - 4.0;
      // Zoom back, then explosive pull-in
      if (p < 0.65) {
        this.camera.z = 2200 - p * 400;
        this.camera.yaw = 0.27 - p * 0.27;
        this.camera.pitch = 0.1 - p * 0.1;
      } else {
        const ep = (p - 0.65) / 0.35;
        this.camera.z = 1940 - ep * 800; // Pull-in
        this.camera.yaw = 0;
        this.camera.pitch = 0;
      }
    }
    else if (progress >= 5.0 && progress < 6.0) {
      // Scene 6: Typography Cinematic
      const p = progress - 5.0;
      // Step movement for each word punch
      const step = Math.floor(p * 4); // 4 words
      this.camera.z = 1140 + (p * 500) - (step * 80);
      this.camera.yaw = Math.sin(p * Math.PI * 2) * 0.02;
    }
    else if (progress >= 6.0 && progress < 7.0) {
      // Scene 7: Infinite Corridor
      const p = progress - 6.0;
      // Travel forward
      this.camera.z = p * 1800;
      this.camera.yaw = 0;
      this.camera.pitch = 0;
    }
    else if (progress >= 7.0 && progress < 8.0) {
      // Scene 8: Theme Worlds
      const p = progress - 7.0;
      // Travel between coordinate locations
      this.camera.z = 1800 + p * 2400;
      this.camera.yaw = Math.sin(p * Math.PI * 3.5) * 0.12;
      this.camera.pitch = Math.cos(p * Math.PI * 3.5) * 0.06;
    }
    else if (progress >= 8.0 && progress < 9.0) {
      // Scene 9: Countdown
      const p = progress - 8.0;
      this.camera.z = 4200 - p * 1200; // drift backwards / rotate
      this.camera.yaw = (Math.sin(p * Math.PI) * 0.1);
      this.camera.pitch = -0.15 + (p * 0.15); // tilt down
    }
    else if (progress >= 9.0 && progress <= 10.0) {
      // Scene 10: Registration
      const p = progress - 9.0;
      this.camera.z = 3000 - p * 2400;
      this.camera.yaw = 0;
      this.camera.pitch = 0;
    }
  }

  // Renders beautiful lighting layers based on the color progression
  renderAtmosphericGlow(progress) {
    const w = this.width;
    const h = this.height;
    
    let colorStart = 'rgba(0, 87, 255, 0)';
    let colorEnd = 'rgba(0, 0, 0, 0.9)';
    
    // Lighting progression transitions
    if (progress < 1.0) {
      // Dark to Cold Blue
      const opacity = progress * 0.15;
      colorStart = `rgba(0, 87, 255, ${opacity})`;
    } else if (progress >= 1.0 && progress < 3.0) {
      // Blue to Purple
      const p = (progress - 1.0) / 2.0;
      const opacity = 0.15 + p * 0.12;
      const r = Math.round(p * 123);
      const g = Math.round(87 * (1 - p) + 47 * p);
      const b = 255;
      colorStart = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else if (progress >= 3.0 && progress < 5.0) {
      // Purple to Cyan
      const p = (progress - 3.0) / 2.0;
      const opacity = 0.27 + Math.sin(p * Math.PI) * 0.15;
      const r = Math.round(123 * (1 - p));
      const g = Math.round(47 * (1 - p) + 245 * p);
      const b = 255;
      colorStart = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else if (progress >= 5.0 && progress < 6.0) {
      // Flashing colors for typography cuts
      const p = progress - 5.0;
      const idx = Math.floor(p * 4);
      if (idx === 0) colorStart = 'rgba(0, 87, 255, 0.2)'; // Build: Blue
      if (idx === 1) colorStart = 'rgba(123, 47, 247, 0.2)'; // Break: Purple
      if (idx === 2) colorStart = 'rgba(0, 245, 255, 0.2)'; // Rebuild: Cyan
      if (idx === 3) colorStart = 'rgba(255, 255, 255, 0.25)'; // Next Era: White flash
    } else if (progress >= 6.0 && progress < 9.0) {
      // Deep Space / Cyan glow at vanishing point
      colorStart = 'rgba(0, 245, 255, 0.15)';
    } else if (progress >= 9.0) {
      // White Studio Glow (Scene 10)
      const p = progress - 9.0;
      const opacity = p * 0.25;
      colorStart = `rgba(255, 255, 255, ${opacity})`;
    }

    const grad = this.ctx.createRadialGradient(w/2, h/2, 20, w/2, h/2, w * 0.7);
    grad.addColorStop(0, colorStart);
    grad.addColorStop(1, colorEnd);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);
  }

  // Perspective Corridor Renderer for Scene 7
  renderPerspectiveCorridor(progress) {
    const p = progress - 6.0;
    const speed = p * 800; // Moving speed offset
    const zOffset = (speed) % 150; // Repeating loop segments
    
    this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.12)';
    this.ctx.lineWidth = 1;

    // Draw perspective rows
    for (let z = 1500; z > 10; z -= 150) {
      const curZ = z - zOffset;
      if (curZ <= 0) continue;

      // Draw grid rectangle at curZ
      const points = [
        this.project(-400, -300, curZ),
        this.project(400, -300, curZ),
        this.project(400, 300, curZ),
        this.project(-400, 300, curZ)
      ];

      if (points.every(pt => pt !== null)) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[1].x, points[1].y);
        this.ctx.lineTo(points[2].x, points[2].y);
        this.ctx.lineTo(points[3].x, points[3].y);
        this.ctx.closePath();
        this.ctx.stroke();

        // Highlight horizontal corridors
        if (z % 300 === 0) {
          this.ctx.fillStyle = 'rgba(0, 245, 255, 0.03)';
          this.ctx.fill();
        }
      }
    }

    // Draw longitudinal tunnel pipes
    const corners = [
      {x: -400, y: -300}, {x: 400, y: -300},
      {x: 400, y: 300}, {x: -400, y: 300}
    ];

    corners.forEach(c => {
      const pStart = this.project(c.x, c.y, 50);
      const pEnd = this.project(c.x, c.y, 1600);
      if (pStart && pEnd) {
        this.ctx.beginPath();
        this.ctx.moveTo(pStart.x, pStart.y);
        this.ctx.lineTo(pEnd.x, pEnd.y);
        this.ctx.stroke();
      }
    });
  }

  // Fragmented Shards drawing for Scene 3
  renderFracturedGlass(progress) {
    const p = progress - 2.0;

    this.glassShards.forEach((shard) => {
      // Slowly rotate points around center in 3D
      const rot = shard.rotSpeed * p * 1.5;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      const projPoints = [];
      shard.points.forEach((pt) => {
        // Translation relative to shard center
        const dx = pt.x - shard.center.x;
        const dy = pt.y - shard.center.y;
        
        // Z-axis rotation
        const rx = dx * cosR - dy * sinR;
        const ry = dx * sinR + dy * cosR;

        // Animate shards drifting apart radially
        const drift = p * 180;
        const shAngle = Math.atan2(shard.center.y, shard.center.x);
        
        const finalX = shard.center.x + rx + Math.cos(shAngle) * drift;
        const finalY = shard.center.y + ry + Math.sin(shAngle) * drift;
        // Float backwards/forwards
        const finalZ = pt.z - p * 200;

        const proj = this.project(finalX, finalY, finalZ);
        if (proj) projPoints.push(proj);
      });

      if (projPoints.length >= 3) {
        // Shard depth styling (draw wireframe with glowing semi-transparent gradients)
        this.ctx.beginPath();
        this.ctx.moveTo(projPoints[0].x, projPoints[0].y);
        for (let i = 1; i < projPoints.length; i++) {
          this.ctx.lineTo(projPoints[i].x, projPoints[i].y);
        }
        this.ctx.closePath();

        // Shard opacity fades out as they fly past camera
        const depth = projPoints[0].depth;
        const fade = Math.min(1.0, Math.max(0, (depth - 100) / 400));
        
        this.ctx.fillStyle = shard.color;
        this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.45)';
        this.ctx.lineWidth = 1;
        
        this.ctx.globalAlpha = shard.opacity * fade;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0;
      }
    });
  }

  // Theme World 3D elements for Scene 8 (Neural nets, DNA helixes)
  renderThemeWorld(progress) {
    const p = progress - 7.0; // 0 to 1
    const activeWorld = Math.floor(p * 5); // 5 themes
    const worldP = (p * 5) % 1.0;

    // AI WORLD: Neural Network Node Cloud
    if (activeWorld === 0) {
      // Connect nodes
      this.ctx.strokeStyle = 'rgba(0, 87, 255, 0.15)';
      this.ctx.lineWidth = 0.5;
      
      this.neuralNetwork.forEach((node) => {
        const projA = this.project(node.x, node.y, node.z - worldP * 300);
        if (!projA) return;

        node.connections.forEach((connIdx) => {
          const connNode = this.neuralNetwork[connIdx];
          const projB = this.project(connNode.x, connNode.y, connNode.z - worldP * 300);
          if (projB) {
            this.ctx.beginPath();
            this.ctx.moveTo(projA.x, projA.y);
            this.ctx.lineTo(projB.x, projB.y);
            this.ctx.stroke();
          }
        });

        // Draw node
        this.ctx.fillStyle = 'rgba(0, 245, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(projA.x, projA.y, node.size * (projA.scale / 10), 0, Math.PI * 2);
        this.ctx.fill();
      });
    }

    // HEALTHCARE WORLD: 3D DNA Helix
    else if (activeWorld === 1) {
      this.ctx.lineWidth = 1.5;
      const rot = worldP * Math.PI * 2;

      for (let i = 0; i < this.dnaStrands.length; i += 2) {
        const strand = this.dnaStrands[i];
        
        // Helix 1 coordinates
        const x1 = Math.cos(strand.theta + rot) * strand.radius;
        const z1 = strand.z + Math.sin(strand.theta + rot) * strand.radius;
        
        // Helix 2 coordinates (180 deg out of phase)
        const x2 = Math.cos(strand.theta + Math.PI + rot) * strand.radius;
        const z2 = strand.z + Math.sin(strand.theta + Math.PI + rot) * strand.radius;

        const p1 = this.project(x1, strand.y, z1);
        const p2 = this.project(x2, strand.y, z2);

        if (p1 && p2) {
          // Draw rungs
          this.ctx.strokeStyle = 'rgba(123, 47, 247, 0.2)';
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();

          // Draw beads
          this.ctx.fillStyle = '#00F5FF';
          this.ctx.beginPath();
          this.ctx.arc(p1.x, p1.y, 4 * (p1.scale / 10), 0, Math.PI * 2);
          this.ctx.fill();

          this.ctx.fillStyle = '#7B2FF7';
          this.ctx.beginPath();
          this.ctx.arc(p2.x, p2.y, 4 * (p2.scale / 10), 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }

    // CYBERSECURITY WORLD: Hexagonal nodes & grid vault
    else if (activeWorld === 2) {
      this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
      this.ctx.lineWidth = 0.8;

      for (let i = 0; i < this.cyberVault.length - 1; i++) {
        const ptA = this.cyberVault[i];
        const ptB = this.cyberVault[i+1];
        
        const pA = this.project(ptA.x, ptA.y, ptA.z - worldP * 250);
        const pB = this.project(ptB.x, ptB.y, ptB.z - worldP * 250);

        if (pA && pB && Math.hypot(ptA.x - ptB.x, ptA.y - ptB.y) < 200) {
          this.ctx.beginPath();
          this.ctx.moveTo(pA.x, pA.y);
          this.ctx.lineTo(pB.x, pB.y);
          this.ctx.stroke();
        }
      }
    }

    // ROBOTICS WORLD: Floating mechanical joints
    else if (activeWorld === 3) {
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      this.ctx.lineWidth = 1;
      
      const numLines = 15;
      const angleStep = (Math.PI * 2) / numLines;
      const radius = 250;
      const rot = worldP * Math.PI;

      for (let i = 0; i < numLines; i++) {
        const angle = i * angleStep + rot;
        const x1 = Math.cos(angle) * (radius * 0.4);
        const y1 = Math.sin(angle) * (radius * 0.4);
        const x2 = Math.cos(angle * 2) * radius;
        const y2 = Math.sin(angle * 2) * radius;

        const pA = this.project(x1, y1, 800);
        const pB = this.project(x2, y2, 850);

        if (pA && pB) {
          this.ctx.beginPath();
          this.ctx.moveTo(pA.x, pA.y);
          this.ctx.lineTo(pB.x, pB.y);
          this.ctx.stroke();

          // Joints
          this.ctx.fillStyle = '#00F5FF';
          this.ctx.beginPath();
          this.ctx.arc(pA.x, pA.y, 4, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }

    // CLIMATE ENVIRONMENT: Green swirl
    else if (activeWorld === 4) {
      // Drawn by swarming particles color-shifts
    }
  }

  // Heavy particle processing loop
  updateAndRenderParticles(progress) {
    let currentTargets = null;
    let targetMix = 0.0;
    
    // Check if typography targets are active
    if (progress >= 1.0 && progress < 2.0) {
      // Scene 2: THE FUTURE IS NOT WAITING.
      const p = progress - 1.0;
      if (p < 0.45) {
        currentTargets = this.targets.theFuture;
        targetMix = Math.min(1.0, p / 0.15); // Transition in
      } else if (p >= 0.45 && p < 0.55) {
        currentTargets = null; // Explosion dispersion
        targetMix = 0;
      } else {
        currentTargets = this.targets.isNotWaiting;
        targetMix = Math.min(1.0, (p - 0.55) / 0.15);
      }
    }
    else if (progress >= 4.0 && progress < 5.0) {
      // Scene 5: Birth of NEXORA
      const p = progress - 4.0;
      if (p >= 0.65) {
        // Words assembling after explosion
        currentTargets = this.targets.nexora;
        targetMix = Math.min(1.0, (p - 0.65) / 0.2);
      }
    }
    else if (progress >= 5.0 && progress < 6.0) {
      // Scene 6: Typography Cinematic cuts
      const p = progress - 5.0;
      const idx = Math.floor(p * 4);
      const subP = (p * 4) % 1.0;
      targetMix = Math.min(1.0, subP / 0.2);

      if (idx === 0) currentTargets = this.targets.buildText;
      if (idx === 1) currentTargets = this.targets.breakText;
      if (idx === 2) currentTargets = this.targets.rebuildText;
      if (idx === 3) currentTargets = this.targets.nextEraText;
    }
    else if (progress >= 8.0 && progress < 9.0) {
      // Scene 9: Countdown
      const p = progress - 8.0;
      const idx = Math.floor(p * 3); // 3, 2, 1
      const subP = (p * 3) % 1.0;
      
      // Interpolate countdown steps with explosion between shifts
      if (subP < 0.75) {
        targetMix = Math.min(1.0, subP / 0.2);
        if (idx === 0) currentTargets = this.targets.num3;
        if (idx === 1) currentTargets = this.targets.num2;
        if (idx === 2) currentTargets = this.targets.num1;
      } else {
        // Explosion drift
        currentTargets = null;
        targetMix = 0.0;
      }
    }
    else if (progress >= 9.0) {
      // Scene 10: Convergence to portal
      const p = progress - 9.0;
      currentTargets = this.targets.portal;
      targetMix = Math.min(1.0, p / 0.35);
    }

    // Render loop
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];

      // Update particle physics
      if (currentTargets && i < currentTargets.length) {
        const target = currentTargets[i];
        
        // Interpolate position from raw space towards scanned letter vectors
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dz = target.z - p.z;
        
        // Easing factor increases with targetMix
        const ease = 0.05 + targetMix * 0.15;
        p.x += dx * ease;
        p.y += dy * ease;
        p.z += dz * ease;
        
        // Shift particle colors to cyan/purple/white when constructing letters
        if (progress >= 9.0) {
          // Portal color (cyan rings)
          p.color = `rgba(0, 245, 255, ${0.45 + Math.random()*0.4})`;
        } else {
          p.color = i % 2 === 0 ? '#FFFFFF' : '#00F5FF';
        }
      } else {
        // Free orbital/space void movement
        if (progress >= 3.0 && progress < 4.0) {
          // Scene 4: The Signal (cyan data rain downwards)
          p.y += p.speed * 400;
          p.color = '#00F5FF';
          if (p.y > 1000) p.y = -1000;
        } 
        else if (progress >= 4.0 && progress < 5.0) {
          // Scene 5: Nexora Reveal sphere orbit or explosion
          const sp = progress - 4.0;
          
          if (sp < 0.65) {
            // High velocity orbits around compressed sphere
            const angle = sp * Math.PI * 18 + i * 0.05;
            const dist = 50 + (i % 50) * (1.0 - sp/0.65) * 5;
            p.x = Math.cos(angle) * dist;
            p.y = Math.sin(angle) * dist;
            p.z = Math.sin(angle * 0.5) * dist * 0.5 + 1500;
            
            p.color = i % 2 === 0 ? '#7B2FF7' : '#00F5FF';
          } else {
            // Enormous explosion shockwave push
            const ep = (sp - 0.65) / 0.35;
            const theta = (i / this.maxParticles) * Math.PI * 2;
            const phi = Math.acos((i % 100) / 50 - 1);
            const force = 1800 * ep * (1.0 - ep);
            
            p.x += Math.sin(phi) * Math.cos(theta) * force * p.speed;
            p.y += Math.sin(phi) * Math.sin(theta) * force * p.speed;
            p.z += Math.cos(phi) * force * p.speed;
            
            p.color = '#FFFFFF';
          }
        }
        else if (progress >= 7.0 && progress < 8.0 && Math.floor((progress - 7.0) * 5) === 4) {
          // Climate scene: swirl particles green
          const cp = ((progress - 7.0) * 5) % 1.0;
          const theta = cp * Math.PI * 4 + i * 0.1;
          const r = 180 + Math.sin(i) * 80;
          p.x = Math.cos(theta) * r;
          p.y = Math.sin(theta) * r;
          p.z = 1000 + Math.cos(theta * 0.5) * 200;
          p.color = 'rgba(0, 255, 128, 0.85)';
        }
        else {
          // Normal starfield drift
          p.z -= p.speed * 120;
          p.color = 'rgba(255,255,255,0.7)';
          if (p.z <= 10) {
            p.z = 2500;
            p.x = (Math.random() - 0.5) * 3000;
            p.y = (Math.random() - 0.5) * 3000;
          }
        }
      }

      // Project particle in 3D coordinate map
      const proj = this.project(p.x, p.y, p.z);
      if (proj) {
        // Draw particle with depth scaling
        this.ctx.fillStyle = p.color;
        const size = p.size * (proj.scale / 12);
        
        if (size > 0.05) {
          // Volumetric bloom for larger points
          if (size > 2.5) {
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 8;
          }
          
          this.ctx.fillRect(proj.x - size / 2, proj.y - size / 2, size, size);
          
          if (size > 2.5) {
            this.ctx.shadowBlur = 0; // reset
          }
        }
      }
    }
  }

  // -------------------------------------------------------------
  // STORYBOARD SCENE HELPERS
  // -------------------------------------------------------------

  renderDigitalGlitchLines() {
    this.ctx.fillStyle = 'rgba(123, 47, 247, 0.15)'; // purple glitch
    if (Math.random() > 0.6) {
      const h1 = Math.random() * this.height;
      this.ctx.fillRect(0, h1, this.width, Math.random() * 20 + 5);
    }
    this.ctx.fillStyle = 'rgba(0, 245, 255, 0.12)'; // cyan glitch
    if (Math.random() > 0.7) {
      const h2 = Math.random() * this.height;
      this.ctx.fillRect(0, h2, this.width, Math.random() * 40 + 10);
    }
  }

  renderShatteredScreen(progress) {
    const p = progress - 2.0; // 0 to 1
    if (p > 0.75) return; // Shattered and faded out
    
    this.ctx.strokeStyle = `rgba(0, 245, 255, ${0.45 * (1 - p / 0.75)})`;
    this.ctx.lineWidth = 1.5;
    
    const cx = this.width / 2;
    const cy = this.height / 2;
    
    // Radial cracks radiating from center
    const numRadials = 12;
    this.ctx.beginPath();
    for (let i = 0; i < numRadials; i++) {
      const angle = (i / numRadials) * Math.PI * 2 + (i % 2 === 0 ? 0.05 : -0.05);
      const length = Math.max(this.width, this.height) * (0.1 + 0.9 * (1 - p));
      
      this.ctx.moveTo(cx, cy);
      let currX = cx;
      let currY = cy;
      const steps = 6;
      for (let j = 1; j <= steps; j++) {
        const fract = j / steps;
        const targetX = cx + Math.cos(angle) * length * fract;
        const targetY = cy + Math.sin(angle) * length * fract;
        const nextX = targetX + (Math.random() - 0.5) * 20 * (1 - p);
        const nextY = targetY + (Math.random() - 0.5) * 20 * (1 - p);
        this.ctx.lineTo(nextX, nextY);
        currX = nextX;
        currY = nextY;
      }
    }
    this.ctx.stroke();
    
    // Concentric webbing cracks
    this.ctx.strokeStyle = `rgba(123, 47, 247, ${0.3 * (1 - p / 0.75)})`;
    this.ctx.beginPath();
    for (let r = 80; r < Math.min(this.width, this.height); r += 120) {
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const tx = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 8;
        const ty = cy + Math.sin(angle) * r + (Math.random() - 0.5) * 8;
        if (i === 0) this.ctx.moveTo(tx, ty);
        else this.ctx.lineTo(tx, ty);
      }
      this.ctx.closePath();
    }
    this.ctx.stroke();
  }

  renderOrbitingOrbAndRings(progress) {
    const p = progress - 3.0; // 0 to 1
    const orbZ = 1500;
    const projOrb = this.project(0, 0, orbZ);
    if (!projOrb) return;
    
    const baseRadius = 80;
    const scaleRad = baseRadius * (projOrb.scale / 12);
    
    // Orbiting 3D rings
    const numRings = 3;
    this.ctx.lineWidth = 1;
    
    for (let rIdx = 0; rIdx < numRings; rIdx++) {
      const R = 180 + rIdx * 110;
      const tiltX = 0.6 + rIdx * 0.4;
      
      this.ctx.strokeStyle = `rgba(0, 245, 255, ${0.12 + Math.sin(p * Math.PI) * 0.08})`;
      this.ctx.beginPath();
      
      const segments = 60;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cx = Math.cos(theta) * R;
        const cy = Math.sin(theta) * R;
        
        const rotX = cx;
        const rotY = cy * Math.cos(tiltX);
        const rotZ = orbZ + cy * Math.sin(tiltX);
        
        const projPt = this.project(rotX, rotY, rotZ);
        if (projPt) {
          if (i === 0) this.ctx.moveTo(projPt.x, projPt.y);
          else this.ctx.lineTo(projPt.x, projPt.y);
        }
      }
      this.ctx.stroke();
      
      // Orbiting UI dots
      const nodeTheta = (performance.now() * 0.001 * (1.5 - rIdx * 0.3)) % (Math.PI * 2);
      const nx = Math.cos(nodeTheta) * R;
      const ny = Math.sin(nodeTheta) * R;
      const nRotX = nx;
      const nRotY = ny * Math.cos(tiltX);
      const nRotZ = orbZ + ny * Math.sin(tiltX);
      
      const projNode = this.project(nRotX, nRotY, nRotZ);
      if (projNode) {
        this.ctx.fillStyle = '#00F5FF';
        this.ctx.shadowColor = '#00F5FF';
        this.ctx.shadowBlur = 8;
        this.ctx.beginPath();
        this.ctx.arc(projNode.x, projNode.y, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(projNode.x, projNode.y, 9, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }
    
    // Central dark orb with cyan glowing borders
    const grad = this.ctx.createRadialGradient(projOrb.x, projOrb.y, scaleRad * 0.3, projOrb.x, projOrb.y, scaleRad);
    grad.addColorStop(0, '#040713');
    grad.addColorStop(0.7, '#081432');
    grad.addColorStop(0.95, '#00b5ff');
    grad.addColorStop(1, 'rgba(0, 245, 255, 0)');
    
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(projOrb.x, projOrb.y, scaleRad, 0, Math.PI * 2);
    this.ctx.fill();
  }

  renderExplosionFlash(progress) {
    const p = (progress - 4.65) / 0.35; // 0 to 1
    let opacity = 0;
    if (p < 0.3) {
      opacity = p / 0.3; // fast fade in
    } else {
      opacity = 1 - (p - 0.3) / 0.7; // slow fade out
    }
    
    const grad = this.ctx.createRadialGradient(this.width/2, this.height/2, 10, this.width/2, this.height/2, Math.max(this.width, this.height) * p);
    grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    grad.addColorStop(0.4, `rgba(0, 245, 255, ${opacity * 0.65})`);
    grad.addColorStop(0.85, `rgba(123, 47, 247, ${opacity * 0.15})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  renderVolumetricMist(progress) {
    const p = progress - 5.0;
    this.ctx.save();
    this.ctx.globalAlpha = 0.25;
    
    for (let i = 0; i < 16; i++) {
      const seedX = Math.sin(i * 353 + p * 0.05);
      const seedY = Math.cos(i * 921 + p * 0.03);
      const x = this.width / 2 + seedX * this.width * 0.6;
      const y = this.height / 2 + seedY * this.height * 0.6;
      const size = 250 + Math.abs(Math.sin(i * 50)) * 250;
      
      const grad = this.ctx.createRadialGradient(x, y, 10, x, y, size);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.5, 'rgba(220, 228, 240, 0.2)');
      grad.addColorStop(1, 'rgba(220, 228, 240, 0)');
      
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  renderFloatingIcons(progress) {
    const p = progress - 6.0;
    const speed = p * 800;
    const zOffset = speed % 400;
    
    this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.22)';
    this.ctx.lineWidth = 1.2;
    
    for (let z = 1600; z > 10; z -= 400) {
      const curZ = z - zOffset;
      if (curZ <= 50) continue;
      
      // Left Wall Panels
      const pL1 = this.project(-400, -100, curZ);
      const pL2 = this.project(-400, 100, curZ);
      const pL3 = this.project(-400, 100, curZ + 150);
      const pL4 = this.project(-400, -100, curZ + 150);
      
      if (pL1 && pL2 && pL3 && pL4) {
        this.ctx.beginPath();
        this.ctx.moveTo(pL1.x, pL1.y);
        this.ctx.lineTo(pL2.x, pL2.y);
        this.ctx.lineTo(pL3.x, pL3.y);
        this.ctx.lineTo(pL4.x, pL4.y);
        this.ctx.closePath();
        this.ctx.stroke();
        
        const pLC = this.project(-400, 0, curZ + 75);
        if (pLC) {
          this.ctx.fillStyle = 'rgba(0, 245, 255, 0.15)';
          this.ctx.beginPath();
          this.ctx.arc(pLC.x, pLC.y, 8 * (pLC.scale / 10), 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
      
      // Right Wall Panels
      const pR1 = this.project(400, -100, curZ);
      const pR2 = this.project(400, 100, curZ);
      const pR3 = this.project(400, 100, curZ + 150);
      const pR4 = this.project(400, -100, curZ + 150);
      
      if (pR1 && pR2 && pR3 && pR4) {
        this.ctx.beginPath();
        this.ctx.moveTo(pR1.x, pR1.y);
        this.ctx.lineTo(pR2.x, pR2.y);
        this.ctx.lineTo(pR3.x, pR3.y);
        this.ctx.lineTo(pR4.x, pR4.y);
        this.ctx.closePath();
        this.ctx.stroke();
        
        const pRC = this.project(400, 0, curZ + 75);
        if (pRC) {
          this.ctx.fillStyle = 'rgba(0, 245, 255, 0.15)';
          this.ctx.beginPath();
          this.ctx.arc(pRC.x, pRC.y, 8 * (pRC.scale / 10), 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  renderCockpitOverlay(progress) {
    const h = this.height;
    const w = this.width;
    
    this.ctx.save();
    
    // Bottom dashboard console
    this.ctx.fillStyle = '#0a0d1a';
    this.ctx.strokeStyle = '#1d2342';
    this.ctx.lineWidth = 2;
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, h * 0.85);
    this.ctx.lineTo(w * 0.25, h * 0.85);
    this.ctx.lineTo(w * 0.35, h * 0.82);
    this.ctx.lineTo(w * 0.65, h * 0.82);
    this.ctx.lineTo(w * 0.75, h * 0.85);
    this.ctx.lineTo(w, h * 0.85);
    this.ctx.lineTo(w, h);
    this.ctx.lineTo(0, h);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Pillars
    this.ctx.fillStyle = '#080a14';
    this.ctx.beginPath();
    // Left
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(w * 0.08, 0);
    this.ctx.lineTo(w * 0.18, h * 0.82);
    this.ctx.lineTo(0, h * 0.85);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Right
    this.ctx.beginPath();
    this.ctx.moveTo(w, 0);
    this.ctx.lineTo(w * 0.92, 0);
    this.ctx.lineTo(w * 0.82, h * 0.82);
    this.ctx.lineTo(w, h * 0.85);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Dashboard status LEDs
    this.ctx.fillStyle = 'rgba(0, 245, 255, 0.7)';
    this.ctx.beginPath();
    this.ctx.arc(w * 0.38, h * 0.86, 3, 0, Math.PI * 2);
    this.ctx.arc(w * 0.40, h * 0.86, 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.fillStyle = 'rgba(255, 47, 123, 0.7)';
    this.ctx.beginPath();
    if (Math.random() > 0.3) {
      this.ctx.arc(w * 0.48, h * 0.85, 4, 0, Math.PI * 2);
    }
    this.ctx.fill();
    
    this.ctx.fillStyle = 'rgba(0, 255, 128, 0.7)';
    this.ctx.beginPath();
    this.ctx.arc(w * 0.60, h * 0.86, 3, 0, Math.PI * 2);
    this.ctx.arc(w * 0.62, h * 0.86, 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  renderWhiteChamber(progress) {
    const h = this.height;
    const w = this.width;
    
    this.ctx.strokeStyle = 'rgba(12, 16, 26, 0.08)';
    this.ctx.lineWidth = 1.5;
    
    const corners = [
      { x: -500, y: -400 }, { x: 500, y: -400 },
      { x: 500, y: 400 }, { x: -500, y: 400 }
    ];
    
    // Perspective segments
    for (let z = 2000; z >= 100; z -= 300) {
      const pts = corners.map(c => this.project(c.x, c.y, z));
      if (pts.every(pt => pt !== null)) {
        this.ctx.beginPath();
        this.ctx.moveTo(pts[0].x, pts[0].y);
        this.ctx.lineTo(pts[1].x, pts[1].y);
        this.ctx.lineTo(pts[2].x, pts[2].y);
        this.ctx.lineTo(pts[3].x, pts[3].y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }
    
    // Longitudinal lines
    corners.forEach(c => {
      const pStart = this.project(c.x, c.y, 50);
      const pEnd = this.project(c.x, c.y, 2000);
      if (pStart && pEnd) {
        this.ctx.beginPath();
        this.ctx.moveTo(pStart.x, pStart.y);
        this.ctx.lineTo(pEnd.x, pEnd.y);
        this.ctx.stroke();
      }
    });
    
    // Portal pad on floor
    const padCenter = this.project(0, 300, 700);
    if (padCenter) {
      const padW = 220 * (padCenter.scale / 10);
      const padH = 60 * (padCenter.scale / 10);
      
      this.ctx.shadowColor = '#00F5FF';
      this.ctx.shadowBlur = 20;
      
      this.ctx.fillStyle = 'rgba(0, 245, 255, 0.2)';
      this.ctx.strokeStyle = '#00F5FF';
      this.ctx.lineWidth = 3;
      
      this.ctx.beginPath();
      this.ctx.ellipse(padCenter.x, padCenter.y, padW, padH, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      
      this.ctx.shadowBlur = 0;
      
      // Vertical beam of light
      const beamGrad = this.ctx.createLinearGradient(padCenter.x, padCenter.y, padCenter.x, 0);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      beamGrad.addColorStop(0.15, 'rgba(0, 245, 255, 0.35)');
      beamGrad.addColorStop(0.8, 'rgba(0, 245, 255, 0.05)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      this.ctx.fillStyle = beamGrad;
      this.ctx.beginPath();
      this.ctx.moveTo(padCenter.x - padW * 0.7, padCenter.y);
      this.ctx.lineTo(padCenter.x - padW * 0.7, 0);
      this.ctx.lineTo(padCenter.x + padW * 0.7, 0);
      this.ctx.lineTo(padCenter.x + padW * 0.7, padCenter.y);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

window.CinematicCanvas = CinematicCanvas;
