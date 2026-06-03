// Navigation for the single-page layout.
class NavigationController {
    constructor() {
        this.toggle = document.getElementById('menuToggle');
        this.nav = document.getElementById('siteNav');
        this.links = [...document.querySelectorAll('.site-nav a')];
    }

    init() {
        this.toggle?.addEventListener('click', () => {
            const isOpen = this.nav.classList.toggle('is-open');
            this.toggle.setAttribute('aria-expanded', String(isOpen));
        });

        this.links.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (!target) return;

                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                this.nav.classList.remove('is-open');
                this.toggle?.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Three.js scene inspired by premium portfolio backgrounds: restrained, monochrome, spatial.
class PortfolioScene {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = null;
        this.group = null;
        this.pointer = { x: 0, y: 0 };
        this.scrollProgress = 0;
        this.wave = null;
        this.particles = null;
        this.model = null;
        this.floatGroup = null;
    }

    init() {
        if (!this.canvas || !window.THREE) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 9);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.clock = new THREE.Clock();
        this.group = new THREE.Group();
        this.floatGroup = new THREE.Group();

        this.addLights();
        this.addWaveMesh();
        this.addParticles();
        this.addModel();
        this.group.add(this.floatGroup);
        this.scene.add(this.group);

        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (event) => this.onPointerMove(event), { passive: true });
        window.addEventListener('touchmove', (event) => this.onTouchMove(event), { passive: true });
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        this.animate();
    }

    addLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.55);
        const key = new THREE.PointLight(0xffffff, 1.1, 28);
        const fill = new THREE.PointLight(0xa8a8a8, 0.6, 28);

        key.position.set(4, 3, 8);
        fill.position.set(-5, -2, 5);

        this.scene.add(ambient, key, fill);
    }

    addWaveMesh() {
        const geometry = new THREE.PlaneGeometry(10, 10, 60, 60);
        const material = new THREE.MeshBasicMaterial({
            color: 0xf5f1ea,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });

        this.wave = new THREE.Mesh(geometry, material);
        this.wave.rotation.x = -1.15;
        this.wave.rotation.z = -0.35;
        this.wave.position.set(1.8, -0.2, -1.6);
        this.floatGroup.add(this.wave);
    }

    addParticles() {
        const count = 240;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i += 1) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xf5f1ea,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
        });

        this.particles = new THREE.Points(geometry, material);
        this.floatGroup.add(this.particles);
    }

    addModel() {
        if (!THREE.GLTFLoader) return;

        const loader = new THREE.GLTFLoader();
        loader.load(
            'https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(2.2, 2.2, 2.2);
                this.model.position.set(0.8, 0.3, 1.2);
                this.model.rotation.set(0.2, -0.55, 0.05);
                this.floatGroup.add(this.model);
                this.setupScrollStages();
            },
            undefined,
            () => {
                this.model = null;
            }
        );
    }

    setupScrollStages() {
        if (!this.model || !window.gsap || !window.ScrollTrigger) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
            },
        });

        timeline
            .to(this.model.position, { x: 2.2, y: 0.7, z: 0.8, duration: 1 }, 0)
            .to(this.model.rotation, { x: 0.35, y: 0.55, z: -0.1, duration: 1 }, 0)
            .to(this.model.scale, { x: 2.8, y: 2.8, z: 2.8, duration: 1 }, 0)
            .to(this.model.position, { x: -2.1, y: -0.1, z: 0.2, duration: 1 }, 1)
            .to(this.model.rotation, { x: 0.85, y: 1.8, z: 0.35, duration: 1 }, 1)
            .to(this.model.scale, { x: 2.1, y: 2.1, z: 2.1, duration: 1 }, 1)
            .to(this.model.position, { x: 1.6, y: -1.1, z: -0.4, duration: 1 }, 2)
            .to(this.model.rotation, { x: 1.2, y: 3.3, z: 0.1, duration: 1 }, 2)
            .to(this.model.scale, { x: 3.1, y: 3.1, z: 3.1, duration: 1 }, 2)
            .to(this.model.position, { x: 0.2, y: -0.3, z: 1.1, duration: 1 }, 3)
            .to(this.model.rotation, { x: 0.4, y: 4.2, z: -0.25, duration: 1 }, 3)
            .to(this.model.scale, { x: 2.4, y: 2.4, z: 2.4, duration: 1 }, 3);
    }

    onResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onPointerMove(event) {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onTouchMove(event) {
        if (!event.touches[0]) return;
        this.onPointerMove(event.touches[0]);
    }

    onScroll() {
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = limit > 0 ? window.scrollY / limit : 0;
    }

    animateWave(elapsed) {
        if (!this.wave) return;

        const { position } = this.wave.geometry.attributes;
        for (let i = 0; i < position.count; i += 1) {
            const x = position.getX(i);
            const y = position.getY(i);
            const z = Math.sin((x * 0.9) + elapsed * 0.8) * 0.22 + Math.cos((y * 1.1) + elapsed * 0.65) * 0.16;
            position.setZ(i, z);
        }

        position.needsUpdate = true;
    }

    animate() {
        if (!this.scene || !this.camera || !this.renderer || !this.clock || !this.group) return;

        const elapsed = this.clock.getElapsedTime();
        this.animateWave(elapsed);

        this.group.rotation.y += 0.0009;
        this.group.position.x += ((this.pointer.x * 0.2) - this.group.position.x) * 0.03;
        this.group.position.y += ((this.pointer.y * 0.12) - this.group.position.y) * 0.026;

        this.camera.position.y += (((-this.scrollProgress * 2.1) + 0.15) - this.camera.position.y) * 0.03;
        this.camera.position.x += ((this.pointer.x * 0.45) - this.camera.position.x) * 0.025;
        this.camera.lookAt(0, 0, 0);

        if (this.particles) {
            this.particles.rotation.y = elapsed * 0.03;
            this.particles.rotation.x = elapsed * 0.015;
        }

        if (this.model) {
            this.model.rotation.y += 0.004;
            this.model.rotation.x += this.pointer.y * 0.002;
            this.model.rotation.z += this.pointer.x * 0.0015;
            this.model.position.y += Math.sin(elapsed * 0.85) * 0.0028;
        }

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => this.animate());
    }
}

// Scroll reveals keep the content movement restrained and premium.
class MotionController {
    init() {
        if (!window.gsap || !window.ScrollTrigger) {
            this.fallback();
            this.enableHoverTilt();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.reveal').forEach((element) => {
            const delay = Number(element.dataset.revealDelay || 0);
            gsap.fromTo(
                element,
                { autoAlpha: 0, y: 26 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.95,
                    ease: 'power3.out',
                    delay,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 86%',
                        once: true,
                    },
                }
            );
        });

        gsap.to('.hero-copy', {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        gsap.to('.bg-video', {
            scale: 1.14,
            opacity: 0.42,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                scrub: 1.2,
                start: 'top top',
                end: 'bottom bottom',
            },
        });

        gsap.to('.hero-visual', {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                scrub: 1,
                start: 'top top',
                end: 'bottom top',
            },
        });

        gsap.utils.toArray('.project-item').forEach((item) => {
            const image = item.querySelector('.project-thumb img');
            if (!image) return;

            gsap.fromTo(
                image,
                { scale: 1.18, yPercent: -6 },
                {
                    scale: 1,
                    yPercent: 6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            );
        });

        this.enableHoverTilt();
    }

    fallback() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    }

    enableHoverTilt() {
        document.querySelectorAll('.tilt-card').forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) - 0.5;
                const y = ((event.clientY - rect.top) / rect.height) - 0.5;
                card.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// Existing Formspree integration kept intact.
class ContactFormController {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.feedback = document.getElementById('formFeedback');
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.setState('Sending message...', 'pending');

            try {
                const response = await fetch(this.form.action, {
                    method: 'POST',
                    body: new FormData(this.form),
                    headers: { Accept: 'application/json' },
                });

                if (!response.ok) throw new Error('Request failed');

                this.form.reset();
                this.setState('Message sent successfully. I will get back to you soon.', 'success');
            } catch (error) {
                this.setState('Message failed to send. Please try again or email me directly.', 'error');
            }
        });
    }

    setState(message, state) {
        this.feedback.textContent = message;
        this.feedback.dataset.state = state;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavigationController().init();
    new PortfolioScene().init();
    new MotionController().init();
    new ContactFormController().init();
});
