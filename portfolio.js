const { useState, useEffect, useRef } = React;

// Typing Effect Component with Error
const TypingEffect = ({ text, speed = 100, errorPosition = null }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [showError, setShowError] = useState(false);
	const [errorChar, setErrorChar] = useState("");
	const [isTyping, setIsTyping] = useState(true);

	useEffect(() => {
		let currentIndex = 0;
		let timeoutId;
		let hasMadeError = false;
		const errorPos = errorPosition !== null ? errorPosition : Math.floor(text.length * 0.6);

		const type = () => {
			if (currentIndex < text.length) {
				if (currentIndex === errorPos && !hasMadeError) {
					hasMadeError = true;
					const wrongChars = "qwertyyuioasdghjklzxcvbnm";
					const randomWrongChar = wrongChars[Math.floor(Math.random() * wrongChars.length)];
					setErrorChar(randomWrongChar);
					setShowError(true);

					timeoutId = setTimeout(() => {
						setShowError(false);
						timeoutId = setTimeout(() => {
							setDisplayedText(text.slice(0, currentIndex + 1));
							currentIndex++;
							timeoutId = setTimeout(type, speed);
						}, speed * 5);
					}, speed * 5);
				} else {
					setDisplayedText(text.slice(0, currentIndex + 1));
					currentIndex++;
					timeoutId = setTimeout(type, speed);
				}
			} else {
				// Typing complete - hide cursor
				setIsTyping(false);
			}
		};

		timeoutId = setTimeout(type, 1000);

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [text, speed, errorPosition]);

	return (
		<span>
			{displayedText}
			{showError && <span className="typing-error">{errorChar}</span>}
			{isTyping && <span className="typing-cursor">|</span>}
		</span>
	);
};

// Audio Player Component
const AudioPlayer = ({ onAudioData }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(null);
	const audioRef = useRef(null);
	const audioContextRef = useRef(null);
	const analyserRef = useRef(null);
	const dataArrayRef = useRef(null);
	const animationFrameRef = useRef(null);

	// Store MP3 files - add your MP3 files here
	const musicFiles = [
		"./music/mnmjd.mp3",
		"./music/ClairdeLune.mp3",
		"./music/tlj.mp3",
		// "./music/track2.mp3",
		// "./music/track3.mp3",
		// Add more tracks as needed
	];

	const togglePlay = async () => {
		if (!audioRef.current || !currentTrack) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			onAudioData({ amplitude: 0, bass: 0, mid: 0, treble: 0 });
		} else {
			initAudioContext();
			if (audioContextRef.current && audioContextRef.current.state === "suspended") {
				await audioContextRef.current.resume();
			}
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true);
					analyzeAudio();
				})
				.catch((error) => {
					console.error("Error playing audio:", error);
				});
		}
	};

	const initAudioContext = () => {
		if (!audioContextRef.current && audioRef.current) {
			audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
			analyserRef.current = audioContextRef.current.createAnalyser();
			analyserRef.current.fftSize = 256;
			dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

			const source = audioContextRef.current.createMediaElementSource(audioRef.current);
			source.connect(analyserRef.current);
			analyserRef.current.connect(audioContextRef.current.destination);
		}
	};

	const analyzeAudio = () => {
		if (analyserRef.current && audioRef.current && !audioRef.current.paused) {
			analyserRef.current.getByteFrequencyData(dataArrayRef.current);
			// Get average amplitude
			let sum = 0;
			for (let i = 0; i < dataArrayRef.current.length; i++) {
				sum += dataArrayRef.current[i];
			}
			const average = sum / dataArrayRef.current.length;
			const amplitude = Math.min(average / 255, 1);

			// Get bass, mid, treble ranges
			const bass = dataArrayRef.current.slice(0, 10).reduce((a, b) => a + b, 0) / 10 / 255;
			const mid = dataArrayRef.current.slice(10, 50).reduce((a, b) => a + b, 0) / 40 / 255;
			const treble = dataArrayRef.current.slice(50, 128).reduce((a, b) => a + b, 0) / 78 / 255;

			onAudioData({ amplitude, bass, mid, treble });
			animationFrameRef.current = requestAnimationFrame(analyzeAudio);
		} else {
			onAudioData({ amplitude: 0, bass: 0, mid: 0, treble: 0 });
		}
	};

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	const playRandom = async () => {
		if (musicFiles.length === 0) return;
		const randomIndex = Math.floor(Math.random() * musicFiles.length);
		const randomTrack = musicFiles[randomIndex];
		setCurrentTrack(randomTrack);
		if (audioRef.current) {
			audioRef.current.src = randomTrack;
			audioRef.current.load();
			initAudioContext();
			if (audioContextRef.current && audioContextRef.current.state === "suspended") {
				await audioContextRef.current.resume();
			}
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true);
					analyzeAudio();
				})
				.catch((error) => {
					console.error("Error playing audio:", error);
				});
		}
	};

	return (
		<div className="audio-player">
			<button className="play-button" onClick={togglePlay} disabled={!currentTrack}>
				{isPlaying ? "⏸" : "▶"}
			</button>
			<button className="random-button" onClick={playRandom}>
				++
			</button>
			<audio
				ref={audioRef}
				onPlay={() => {
					setIsPlaying(true);
					analyzeAudio();
				}}
				onPause={() => {
					setIsPlaying(false);
					if (animationFrameRef.current) {
						cancelAnimationFrame(animationFrameRef.current);
					}
					onAudioData({ amplitude: 0, bass: 0, mid: 0, treble: 0 });
				}}
				onEnded={() => {
					setIsPlaying(false);
					if (animationFrameRef.current) {
						cancelAnimationFrame(animationFrameRef.current);
					}
					onAudioData({ amplitude: 0, bass: 0, mid: 0, treble: 0 });
				}}
			/>
		</div>
	);
};

// Particle System Component
const ParticleSystem = ({ audioData = { amplitude: 0, bass: 0, mid: 0, treble: 0 } }) => {
	const canvasRef = useRef(null);
	const particlesRef = useRef([]);
	const animationFrameRef = useRef(null);
	const smoothedAudioRef = useRef({ amplitude: 0, bass: 0, mid: 0, treble: 0 });
	const audioDataRef = useRef(audioData);
	const cursorRef = useRef({ x: 0, y: 0, active: false });

	useEffect(() => {
		audioDataRef.current = audioData;
	}, [audioData]);

	useEffect(() => {
		const handleMove = (event) => {
			cursorRef.current = { x: event.clientX, y: event.clientY, active: true };
		};

		const handleLeave = () => {
			cursorRef.current = { ...cursorRef.current, active: false };
		};

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseleave", handleLeave);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseleave", handleLeave);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		const particleCount = 60;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Create particles
		const createParticles = () => {
			particlesRef.current = [];
			for (let i = 0; i < particleCount; i++) {
				const baseX = Math.random() * canvas.width;
				const baseY = Math.random() * canvas.height;
				particlesRef.current.push({
					x: baseX,
					y: baseY,
					radius: Math.random() * 300,
					currentRadius: Math.random() * 300,
					baseX,
					baseY,
					speed: Math.random() * 0.01 + 0.2,
					opacity: Math.random() * 0.5 + 0.1,
					index: i, // Store index for consistent music movement
				});
			}
		};

		createParticles();

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Smooth audio data
			const smoothingFactor = 0.08;
			const latestAudio = audioDataRef.current;
			smoothedAudioRef.current = {
				amplitude: smoothedAudioRef.current.amplitude * (1 - smoothingFactor) + latestAudio.amplitude * smoothingFactor,
				bass: smoothedAudioRef.current.bass * (1 - smoothingFactor) + latestAudio.bass * smoothingFactor,
				mid: smoothedAudioRef.current.mid * (1 - smoothingFactor) + latestAudio.mid * smoothingFactor,
				treble: smoothedAudioRef.current.treble * (1 - smoothingFactor) + latestAudio.treble * smoothingFactor,
			};

			const cursor = cursorRef.current;
			const influenceRadius = Math.min(canvas.width, canvas.height) * 0.4;

			particlesRef.current.forEach((particle) => {
				const { baseX, baseY } = particle;
				let targetX = baseX;
				let targetY = baseY;
				let radiusBoost = smoothedAudioRef.current.amplitude * 0.25;

				if (cursor.active) {
					const dx = baseX - cursor.x;
					const dy = baseY - cursor.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < influenceRadius) {
						const influence = 1 - distance / influenceRadius;
						const directionX = dx / (distance || 1);
						const directionY = dy / (distance || 1);
						const maxOffset = 80;
						targetX = baseX + directionX * influence * maxOffset;
						targetY = baseY + directionY * influence * maxOffset;
						radiusBoost += influence * 0.3;
					}
				}

				const easing = 0.08;
				particle.x += (targetX - particle.x) * easing;
				particle.y += (targetY - particle.y) * easing;
				particle.currentRadius = particle.radius * (1 + radiusBoost);

				// Draw particle with glass effect
				ctx.save();
				ctx.globalAlpha = particle.opacity;

				const currentRadius = particle.currentRadius || particle.radius;

				// Calculate color based on audio data
				const { amplitude, bass, mid, treble } = smoothedAudioRef.current;
				// Make the palette swing dramatically with the music
				const r = Math.min(255, 120 + bass * 220);
				const g = Math.min(255, 60 + mid * 220);
				const b = Math.min(255, 30 + treble * 220);
				const outerAlpha = 0.05 + amplitude * 0.25;
				const innerAlpha = 0.4 + amplitude * 2;

				// Create gradient for glass effect with dynamic colors
				const gradient = ctx.createRadialGradient(
					particle.x - currentRadius * 0.8,
					particle.y - currentRadius * 0.6,
					0,
					particle.x,
					particle.y,
					currentRadius
				);
				gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${innerAlpha})`);
				gradient.addColorStop(0.5, `rgba(${r * 0.8}, ${g * 0.8}, ${b * 0.8}, ${0.2 + amplitude * 0.2})`);
				gradient.addColorStop(1, `rgba(${r * 0.6}, ${g * 0.6}, ${b * 0.6}, ${outerAlpha})`);

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
				ctx.fill();

				// Add glass highlight
				ctx.globalAlpha = particle.opacity * 0.5;
				ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
				ctx.beginPath();
				// ctx.arc(
				// 	particle.x - currentRadius * 0.3,
				// 	particle.y - currentRadius * 0.3,
				// 	currentRadius * 0.4,
				// 	0,
				// 	Math.PI * 2
				// );
				ctx.fill();

				ctx.restore();
			});

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	return <canvas ref={canvasRef} className="particle-canvas" />;
};

// Main App Component
const App = () => {
	const [audioData, setAudioData] = useState({ amplitude: 0, bass: 0, mid: 0, treble: 0 });

	return (
		<div className="app">
			<AudioPlayer onAudioData={setAudioData} />
			<ParticleSystem audioData={audioData} />
			<section className="hero">
				<div className="hero-content">
					<p className="hero-name">Yuhan's Portfolio</p>
					<p className="hero-subtitle">
						<TypingEffect
							text="Data Visualization • Interactive Design • Creative Coding"
							speed={50}
							errorPosition={15}
						/>
					</p>
				</div>
			</section>
		</div>
	);
};

// Render App
ReactDOM.render(<App />, document.getElementById("root"));
