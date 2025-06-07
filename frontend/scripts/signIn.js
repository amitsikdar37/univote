import {BACKEND_URL} from "../config.js";

window.addEventListener('error', (e) => {
  console.error('Script error:', e.message);
});


document.getElementById("signinForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };

  try{
    const response = await fetch(`${BACKEND_URL}/api/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    document.getElementById('loadingMessage').style.display = 'none';

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data.message);

      // Show success message
      document.getElementById('successMessage').style.display = 'block';

      // Redirect after short delay
      setTimeout(() => {
          window.location.href = './about2.html';
      }, 1000); // 1 seconds delay
    }
    else {
      const data = await response.json();
      const errors = data.errors || [];

      ['email', 'password'].forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) errorElement.textContent = '';
      });

      errors.forEach(err => {
        const field = err.param || err.path;
        const message = err.msg;
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.textContent = message;

        } else if (field === 'form') {
            const formError = document.getElementById('formError');
            if (formError) formError.textContent = message;

        } else {
            console.error(`${field}: ${message}`);
        }
      });
      console.log(data.errors); // Show them as alerts or in the DOM
    }
  } catch (error) {
    console.error('Error:', error);
    document.open();
    console.error('Error:', error);
    document.close();
  }
});



try {
  // Three.js Animated Background
  const canvas = document.getElementById('scene-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.set(0, 0, 40);

  // Particle System
  const particleCount = 500;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    colors[i * 3] = 0.15;
    colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
    colors[i * 3 + 2] = 1.0;
    velocities[i * 3] = (Math.random() - 0.5) * 0.03;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particles);

  // Gradient Background
  const bgGeometry = new THREE.PlaneGeometry(150, 150, 16, 16);
  const bgMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;
      float noise(vec2 uv) {
        return fract(sin(dot(uv, vec2(127.1, 311.7))) * 43758.5453);
      }
      void main() {
        vec2 uv = vUv;
        float n = noise(uv * 1.5 + time * 0.03);
        float dist = distance(uv, mouse);
        float glow = 0.015 / (dist + 0.25);
        vec3 color = vec3(0.05, 0.15 + n * 0.1, 0.4 + n * 0.2);
        color += glow * vec3(0.0, 0.7, 1.0);
        gl_FragColor = vec4(color, 0.4);
      }
    `,
    uniforms: {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector2(0, 0) }
    },
    transparent: true
  });

  const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
  bgPlane.position.z = -10;
  scene.add(bgPlane);

  // Subtle Pulse Effect
  const pulseGeometry = new THREE.SphereGeometry(1, 16, 16);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0x00bfff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  pulse.position.z = -5;
  scene.add(pulse);

  // Mouse Interaction
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    bgMaterial.uniforms.mouse.value.set(x, y);
    pulse.position.x = x * 30;
    pulse.position.y = y * 30;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    bgMaterial.uniforms.time.value += 0.01;

    // Animate Particles
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Gentle Flow
      positions[i * 3] += Math.sin(bgMaterial.uniforms.time.value + positions[i * 3 + 1]) * 0.01;
      positions[i * 3 + 1] += Math.cos(bgMaterial.uniforms.time.value + positions[i * 3]) * 0.01;

      // Boundary Check
      if (Math.abs(positions[i * 3]) > 60 || Math.abs(positions[i * 3 + 1]) > 60 || Math.abs(positions[i * 3 + 2]) > 60) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Pulse Animation
    pulse.scale.set(1 + Math.sin(bgMaterial.uniforms.time.value * 0.3) * 0.08, 1 + Math.sin(bgMaterial.uniforms.time.value * 0.3) * 0.08, 1);

    renderer.render(scene, camera);
  }
  animate();

  // Handle Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} catch (error) {
  console.error('Three.js animation failed:', error);
  document.getElementById('scene-canvas').style.background = 'linear-gradient(135deg, #0a0a0a, #1a2a3a)';
}try {
  // Three.js Animated Background
  const canvas = document.getElementById('scene-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.set(0, 0, 40);

  // Particle System
  const particleCount = 500;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    colors[i * 3] = 0.15;
    colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
    colors[i * 3 + 2] = 1.0;
    velocities[i * 3] = (Math.random() - 0.5) * 0.03;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particles);

  // Gradient Background
  const bgGeometry = new THREE.PlaneGeometry(150, 150, 16, 16);
  const bgMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;
      float noise(vec2 uv) {
        return fract(sin(dot(uv, vec2(127.1, 311.7))) * 43758.5453);
      }
      void main() {
        vec2 uv = vUv;
        float n = noise(uv * 1.5 + time * 0.03);
        float dist = distance(uv, mouse);
        float glow = 0.015 / (dist + 0.25);
        vec3 color = vec3(0.05, 0.15 + n * 0.1, 0.4 + n * 0.2);
        color += glow * vec3(0.0, 0.7, 1.0);
        gl_FragColor = vec4(color, 0.4);
      }
    `,
    uniforms: {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector2(0, 0) }
    },
    transparent: true
  });

  const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
  bgPlane.position.z = -10;
  scene.add(bgPlane);

  // Subtle Pulse Effect
  const pulseGeometry = new THREE.SphereGeometry(1, 16, 16);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0x00bfff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  pulse.position.z = -5;
  scene.add(pulse);

  // Mouse Interaction
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    bgMaterial.uniforms.mouse.value.set(x, y);
    pulse.position.x = x * 30;
    pulse.position.y = y * 30;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    bgMaterial.uniforms.time.value += 0.01;

    // Animate Particles
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Gentle Flow
      positions[i * 3] += Math.sin(bgMaterial.uniforms.time.value + positions[i * 3 + 1]) * 0.01;
      positions[i * 3 + 1] += Math.cos(bgMaterial.uniforms.time.value + positions[i * 3]) * 0.01;

      // Boundary Check
      if (Math.abs(positions[i * 3]) > 60 || Math.abs(positions[i * 3 + 1]) > 60 || Math.abs(positions[i * 3 + 2]) > 60) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Pulse Animation
    pulse.scale.set(1 + Math.sin(bgMaterial.uniforms.time.value * 0.3) * 0.08, 1 + Math.sin(bgMaterial.uniforms.time.value * 0.3) * 0.08, 1);

    renderer.render(scene, camera);
  }
  animate();

  // Handle Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} catch (error) {
  console.error('Three.js animation failed:', error);
  document.getElementById('scene-canvas').style.background = 'linear-gradient(135deg, #0a0a0a, #1a2a3a)';
}