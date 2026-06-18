// Datos del sitio — editá acá tu info de contacto, headline, etc.
export const site = {
	name: "Luisa Alzate",
	role: "Full-Stack Software Engineer",
	// ← REEMPLAZÁ por tu dominio real de producción (sin barra final).
	// Se usa para metadataBase, sitemap, canonical y URLs de Open Graph.
	url: "https://luisaalzate.example.com",
	// El headline de tu CV, reformulado para la web
	headline:
		"Full-Stack Software Engineer building cutting-edge, people-centered solutions — now expanding into AI engineering.",
	location: "Córdoba, Argentina",
	email: "lumariaap15@gmail.com",
	yearsExperience: "5+",
	links: {
		github: "https://github.com/lumariaap15", // ← completá
		linkedin: "https://www.linkedin.com/in/luisa-mar%C3%ADa-alzate-89a88a17a/", // ← completá
		cv: "/Luisa_Alzate_CV_2026.pdf",
	},
	// Stats del hero (estilo Sawad, pero con datos reales y honestos)
	stats: [
		{ value: "5+", label: "Years building software" },
		{ value: "3", label: "Companies & freelance clients" },
		{ value: "Fintech", label: "Current domain" },
	],
	// ── Contacto: presets para los CTAs (mailto + WhatsApp) ──
	whatsapp: {
		number: "5491171897196", // ← reemplazá: solo dígitos, formato internacional sin "+", ej "5493511234567"
		message: {
			en: "Hi Luisa! I saw your portfolio and I'd love to talk.",
			es: "¡Hola Luisa! Vi tu portfolio y me encantaría conversar.",
		},
	},
	contact: {
		subject: {
			en: "Let's work together",
			es: "Trabajemos juntos",
		},
		body: {
			en: "Hi Luisa,\n\nI saw your portfolio and wanted to reach out about...",
			es: "Hola Luisa,\n\nVi tu portfolio y quería escribirte sobre...",
		},
	},

	// ── Dato curioso + hobbies (hardcodeado, editá libremente) ──
	funFact: {
		en: "Outside of code, you'll usually find me here:",
		es: "Fuera del código, normalmente me encontrás acá:",
	},
	hobbies: {
		en: [
			{ emoji: "🎸", text: "Music & playing guitar" },
			{ emoji: "☕", text: "Specialty coffee" },
			{ emoji: "📚", text: "Reading" },
			{ emoji: "✈️", text: "Travel" },
		],
		es: [
			{ emoji: "🎸", text: "Música y tocar la guitarra" },
			{ emoji: "☕", text: "Café de especialidad" },
			{ emoji: "📚", text: "Lectura" },
			{ emoji: "✈️", text: "Viajar" },
		],
	},
};

