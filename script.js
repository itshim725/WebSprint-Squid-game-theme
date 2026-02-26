const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.getElementById('themeToggle');
const hero3D = document.getElementById('hero3D');

const registrationForm = document.getElementById('registrationForm');
const formStatus = document.getElementById('formStatus');
const leaderboardBody = document.getElementById('leaderboardBody');
const simulateRoundButton = document.getElementById('simulateRound');

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const gameCards = document.querySelectorAll('.game-card');
const gameModal = document.getElementById('gameModal');
const gameModalTitle = document.getElementById('gameModalTitle');
const gameModalImage = document.getElementById('gameModalImage');
const closeGameModalButton = document.getElementById('closeGameModal');
const gameModalRound = document.getElementById('gameModalRound');
const gameModalDesc = document.getElementById('gameModalDesc');
const gameModalRule = document.getElementById('gameModalRule');
const gameModalObjective = document.getElementById('gameModalObjective');
const gameModalElimination = document.getElementById('gameModalElimination');

const gameDetails = {
	'Red Light, Green Light': {
		round: 'ROUND 01 · RED LIGHT, GREEN LIGHT',
		description: 'Contestants sprint toward the finish line and must freeze instantly when the command flips.',
		rule: 'Move only during GREEN LIGHT. Any motion during RED LIGHT is tracked.',
		objective: 'Reach the finish area before timer expiry.',
		elimination: 'Detected movement during RED LIGHT causes immediate elimination.'
	},
	Honeycomb: {
		round: 'ROUND 03 · HONEYCOMB',
		description: 'A fragile sugar disk must be carved cleanly along the chosen symbol path under pressure.',
		rule: 'Trace the marked shape without cracking outside the outline.',
		objective: 'Extract the complete shape intact within the time window.',
		elimination: 'Any major crack or broken symbol results in elimination.'
	},
	'Danger Dodge': {
		round: 'ROUND 02 · DANGER DODGE',
		description: 'A high-stakes dodgeball round where players must evade rapid throws in a shrinking court.',
		rule: 'If struck by a live throw you are out, but a direct catch can revive one teammate.',
		objective: 'Keep your side alive until the opposing team is fully eliminated.',
		elimination: 'Any direct body hit from an active ball causes immediate elimination.'
	},
	'Tug of War': {
		round: 'ROUND 04 · TUG OF WAR',
		description: 'Two teams clash on elevated platforms where rhythm and timing matter more than raw strength.',
		rule: 'Pull in coordinated bursts and maintain team balance.',
		objective: 'Drag the opponent beyond the center drop marker.',
		elimination: 'Losing side falls and is eliminated.'
	},
	'Glass Bridge': {
		round: 'ROUND 05 · GLASS BRIDGE',
		description: 'Players cross a suspended bridge by choosing tempered panels while avoiding fragile glass.',
		rule: 'Step only on stable panels and advance before time runs out.',
		objective: 'Reach the final platform by making correct panel choices.',
		elimination: 'A wrong step shatters glass and eliminates the player.'
	}
};

const leaderboard = [
	{ name: 'Player 101', mode: 'solo', score: 1420 },
	{ name: 'Player 067', mode: 'squad', score: 1360 },
	{ name: 'Player 218', mode: 'speed', score: 1295 },
	{ name: 'Player 456', mode: 'solo', score: 1210 }
];

function renderLeaderboard() {
	leaderboard.sort((first, second) => second.score - first.score);
	leaderboardBody.innerHTML = leaderboard
		.map((player, index) => {
			return `
				<tr>
					<td>#${index + 1}</td>
					<td>${player.name}</td>
					<td>${player.mode}</td>
					<td>${player.score}</td>
				</tr>
			`;
		})
		.join('');
}

function setError(field, message) {
	const errorNode = document.querySelector(`.error[data-for="${field}"]`);
	if (errorNode) {
		errorNode.textContent = message;
	}
}

function clearErrors() {
	document.querySelectorAll('.error').forEach((node) => {
		node.textContent = '';
	});
}

function validateRegistration(values) {
	let valid = true;

	if (!/^[a-zA-Z ]{3,40}$/.test(values.name.trim())) {
		setError('name', 'Enter a valid full name (letters and spaces only).');
		valid = false;
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
		setError('email', 'Enter a valid email address.');
		valid = false;
	}

	const ageValue = Number(values.age);
	if (!Number.isInteger(ageValue) || ageValue < 18 || ageValue > 99) {
		setError('age', 'Age must be a whole number between 18 and 99.');
		valid = false;
	}

	if (!values.mode) {
		setError('mode', 'Select a preferred mode.');
		valid = false;
	}

	if (!values.consent) {
		setError('consent', 'You must accept the game rules.');
		valid = false;
	}

	return valid;
}

function activateNavBySection() {
	const sections = [...document.querySelectorAll('main section[id]')];
	const topOffset = window.scrollY + 120;
	const activeSection = sections.findLast((section) => topOffset >= section.offsetTop);

	if (!activeSection) {
		return;
	}

	document.querySelectorAll('.nav-links a').forEach((link) => {
		link.classList.toggle('active', link.getAttribute('href') === `#${activeSection.id}`);
	});
}

menuToggle.addEventListener('click', () => {
	navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
	link.addEventListener('click', () => {
		navLinks.classList.remove('open');
	});
});

themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('neon-theme');
	const isNeon = document.body.classList.contains('neon-theme');
	themeToggle.textContent = isNeon ? 'Default Theme' : 'Neon Theme';
});

window.addEventListener('scroll', activateNavBySection);
activateNavBySection();

if (hero3D) {
	hero3D.addEventListener('mousemove', (event) => {
		const bounds = hero3D.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 22;
		const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -18;
		const bridge = hero3D.querySelector('.bridge-3d');
		if (bridge) {
			bridge.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
		}
	});

	hero3D.addEventListener('mouseleave', () => {
		const bridge = hero3D.querySelector('.bridge-3d');
		if (bridge) {
			bridge.style.transform = '';
		}
	});
}

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			}
		});
	},
	{
		threshold: 0.18
	}
);

document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

function openGameModal(gameName, imagePath) {
	if (!gameModal || !gameModalTitle || !gameModalImage) {
		return;
	}

	const details = gameDetails[gameName] || {
		round: 'ROUND INFO',
		description: 'Survival game preview.',
		rule: 'Follow round instructions.',
		objective: 'Complete the challenge.',
		elimination: 'Failure leads to elimination.'
	};

	gameModalTitle.textContent = gameName;
	gameModalImage.src = imagePath;
	gameModalImage.alt = `${gameName} preview`;
	if (gameModalRound) {
		gameModalRound.textContent = details.round;
	}
	if (gameModalDesc) {
		gameModalDesc.textContent = details.description;
	}
	if (gameModalRule) {
		gameModalRule.textContent = details.rule;
	}
	if (gameModalObjective) {
		gameModalObjective.textContent = details.objective;
	}
	if (gameModalElimination) {
		gameModalElimination.textContent = details.elimination;
	}
	gameModal.classList.add('open');
	gameModal.setAttribute('aria-hidden', 'false');
	document.body.classList.add('modal-open');
}

function closeGameModal() {
	if (!gameModal) {
		return;
	}

	gameModal.classList.remove('open');
	gameModal.setAttribute('aria-hidden', 'true');
	document.body.classList.remove('modal-open');
	if (gameModalImage) {
		gameModalImage.src = '';
	}
}

gameCards.forEach((card) => {
	card.addEventListener('click', () => {
		const gameName = card.dataset.game || card.querySelector('h3')?.textContent || 'Game Preview';
		const imagePath = card.dataset.image || '';
		if (!imagePath) {
			return;
		}
		openGameModal(gameName, imagePath);
	});
});

if (closeGameModalButton) {
	closeGameModalButton.addEventListener('click', closeGameModal);
}

if (gameModal) {
	gameModal.addEventListener('click', (event) => {
		if (event.target === gameModal) {
			closeGameModal();
		}
	});
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && gameModal?.classList.contains('open')) {
		closeGameModal();
	}
});

registrationForm.addEventListener('submit', (event) => {
	event.preventDefault();
	clearErrors();
	formStatus.textContent = '';

	const formData = new FormData(registrationForm);
	const values = {
		name: formData.get('name')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		age: formData.get('age')?.toString() || '',
		mode: formData.get('mode')?.toString() || '',
		consent: registrationForm.consent.checked
	};

	const isValid = validateRegistration(values);
	if (!isValid) {
		formStatus.textContent = 'Please fix the highlighted fields.';
		return;
	}

	const starterScore = Math.floor(900 + Math.random() * 500);
	leaderboard.push({
		name: values.name.trim(),
		mode: values.mode,
		score: starterScore
	});

	renderLeaderboard();
	formStatus.textContent = `Registration successful. Starter score: ${starterScore}`;
	registrationForm.reset();
});

simulateRoundButton.addEventListener('click', () => {
	leaderboard.forEach((player) => {
		player.score += Math.floor(Math.random() * 150);
	});
	renderLeaderboard();
});

contactForm.addEventListener('submit', (event) => {
	event.preventDefault();
	contactStatus.textContent = 'Message sent. Our game design crew will contact you soon.';
	contactForm.reset();
});

renderLeaderboard();

