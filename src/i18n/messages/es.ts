import type { Messages } from "./en";

export const es: Messages = {
  nav: {
    services: "Servicios",
    process: "Proceso",
    work: "Trabajo",
    about: "Sobre mí",
    faq: "FAQ",
    contact: "Contacto",
  },
  cta: {
    bookCall: "Agenda una llamada gratuita de 20 minutos →",
    bookCallShort: "Agenda una llamada →",
    sendDetails: "Contame tu proyecto →",
    cv: "CV",
  },
  hero: {
    headline: "Más tecnología no significa mejor tecnología.",
    sub: "Software, automatizaciones, integraciones y soluciones con IA que realmente aportan valor a tu negocio.",
  },
  philosophy: {
    title: "No necesitas software a medida. A menos que realmente lo necesites.",
    body: [
      "Te ayudo a entender qué necesita realmente tu negocio para después mejorar, integrar o construir la solución adecuada.",
      "A veces significa aprovechar mejor lo que ya tienes. Otras, conectar sistemas o automatizar trabajo repetitivo. Y cuando construir algo nuevo es la mejor opción, puedo hacerlo.",
    ],
  },
  services: {
    title: "Tres formas en las que puedo ayudarte.",
    items: [
      {
        number: "01",
        category: "custom",
        label: "Software y Productos a Medida",
        headline: "Construye lo que importa.",
        body: [
          "¿Tienes una idea, un MVP por construir o una necesidad que las herramientas existentes no resuelven? Puedo llevarla desde la definición inicial hasta software funcionando en producción.",
          "Portales de clientes, productos SaaS, plataformas operativas, dashboards y MVPs construidos alrededor de necesidades reales.",
        ],
        tags: ["Software a medida", "SaaS", "Portales", "Dashboards", "MVPs"],
      },
      {
        number: "02",
        category: "integration",
        label: "Integraciones de APIs y Sistemas",
        headline: "Haz que lo que ya tienes funcione en conjunto.",
        body: [
          "Tus herramientas no deberían generar más trabajo. Conecto tus sistemas mediante APIs e integraciones confiables para que la información fluya donde la necesitas, sin reemplazar software que ya funciona bien.",
        ],
        tags: ["APIs", "Webhooks", "Pagos", "Autenticación", "Sincronización de datos", "Plataformas externas"],
      },
      {
        number: "03",
        category: "modernization",
        label: "Modernización y Rescate de Producto",
        headline: "Mejora antes de reconstruir.",
        body: [
          "El software existente no siempre necesita empezar de cero. Mejoro productos que se han vuelto lentos, frágiles, difíciles de mantener o que todavía no están preparados para su siguiente etapa.",
          "También puedo ayudarte a convertir un MVP construido rápidamente o con IA en software preparado para usuarios reales.",
        ],
        tags: ["Performance", "Arquitectura", "UX", "Accesibilidad", "Testing", "Observabilidad", "Producción"],
      },
    ],
  },
  ai: {
    title: "IA cuando aporta valor.",
    body: [
      "No todos los productos necesitan IA. Cuando existe un caso de uso real, la integro donde pueda mejorar de forma significativa el producto o el negocio.",
      "Búsqueda inteligente, procesamiento de documentos, asistentes, extracción estructurada y workflows con IA.",
    ],
    highlight: "El objetivo no es agregar IA. Es resolver mejor el problema.",
  },
  process: {
    title: "Del problema a producción.",
    subtitle: "Las decisiones importantes se toman antes de que el código se vuelva costoso.",
    steps: [
      {
        number: "01",
        label: "Hablar",
        title: "Entender el problema.",
        body: "Una llamada gratuita de 20 minutos para hablar de tu negocio, idea o producto, qué está pasando hoy y qué quieres lograr.",
        tags: ["Contexto", "Herramientas actuales", "Objetivos", "Restricciones"],
        cta: true,
      },
      {
        number: "02",
        label: "Definir",
        title: "Encontrar el camino más simple.",
        body: "Analizo el problema y lo que ya existe antes de decidir qué conviene mejorar, integrar, automatizar o construir.",
        tags: ["Definición del problema", "Workflow actual", "Opciones", "Alcance", "Estimación"],
        cta: false,
      },
      {
        number: "03",
        label: "Diseñar",
        title: "Tomar las decisiones importantes temprano.",
        body: "Definimos cómo debe funcionar la solución antes de comprometernos con semanas de desarrollo.",
        tags: ["Flujos de usuario", "Arquitectura", "Modelo de datos", "Contratos de API", "Milestones"],
        cta: false,
      },
      {
        number: "04",
        label: "Construir",
        title: "Construir en pasos visibles.",
        body: "El desarrollo avanza en entregas pequeñas, con software funcionando y feedback frecuente durante todo el proyecto.",
        tags: ["Entregas funcionales", "Tests automatizados", "Code review", "Documentación"],
        cta: false,
      },
      {
        number: "05",
        label: "Lanzar",
        title: "Producción es parte del desarrollo.",
        body: "El trabajo no termina cuando el software funciona localmente. Lo preparo para que sea confiable, observable y mantenible en producción.",
        tags: ["Deployment", "Monitoreo", "Error tracking", "Performance", "Handoff"],
        cta: false,
      },
    ],
  },
  work: {
    title: "Proyectos seleccionados.",
    intro: "Problemas reales. Decisiones de ingeniería. Mejoras medibles.",
    problemLabel: "Problema",
    approachLabel: "Solución",
    outcomeLabel: "Resultado",
    categoryLabels: {
      custom: "A medida & Producto",
      integration: "Integración",
      modernization: "Modernización",
    },
  },
  whyMe: {
    title: "Trabaja con quien lo construye.",
    intro: "Sin capas entre tu negocio y las decisiones de ingeniería. Trabajas directamente conmigo desde la primera conversación hasta la arquitectura, el desarrollo y el lanzamiento.",
    benefits: [
      { title: "Comunicación directa", body: "Menos se pierde entre el problema y la implementación." },
      { title: "Ownership técnico", body: "Entiendo el contexto detrás del código, no solo el próximo ticket." },
      { title: "Pequeño por diseño", body: "Cuando un proyecto necesita otra especialidad, colaboro con profesionales de confianza sin agregar estructura innecesaria." },
    ],
  },
  about: {
    title: "Hola, soy Luisa.",
    body: [
      "Soy ingeniera de software full-stack con más de 5 años de experiencia construyendo, integrando y mejorando software en producción.",
      "He trabajado en frontend, backend, APIs e infraestructura cloud, con un fuerte enfoque en la calidad del producto y en las personas que usan lo que construyo.",
      "Hoy trabajo directamente con empresas y equipos de producto que necesitan buen engineering sin la estructura de un gran equipo de desarrollo.",
    ],
    location: "Desde Argentina, trabajando con clientes en cualquier lugar.",
  },
  faq: {
    title: "Preguntas frecuentes.",
    items: [
      {
        q: "¿Necesito saber exactamente qué necesito?",
        a: "No. Empecemos por el problema. Te ayudaré a determinar si conviene mejorar, integrar, automatizar o construir.",
      },
      {
        q: "Tengo una idea o MVP. ¿Puedes ayudarme a construirlo?",
        a: "Sí. Puedo ayudarte a definir el alcance y el enfoque técnico y después llevarlo desde desarrollo hasta producción.",
      },
      {
        q: "¿Solo desarrollas software a medida?",
        a: "No. Si una herramienta existente, integración o cambio más pequeño resuelve mejor el problema, eso es lo que recomendaré.",
      },
      {
        q: "¿Puedes trabajar con nuestro software actual?",
        a: "Sí. Integrar, extender y modernizar sistemas existentes es una parte central de mi trabajo.",
      },
      {
        q: "¿Puedes trabajar con software construido con IA?",
        a: "Sí. Puedo revisar, estabilizar y preparar productos construidos rápidamente para un uso real en producción.",
      },
      {
        q: "¿Puedes integrar IA a nuestro producto?",
        a: "Sí, cuando existe un caso de uso que aporte valor. La IA debe mejorar el producto, no agregarse simplemente porque está disponible.",
      },
      {
        q: "¿Qué sucede después de la llamada gratuita?",
        a: "Si hay un buen fit, recomendaré el siguiente paso. Puede ser una propuesta o una fase corta de discovery para proyectos más complejos.",
      },
      {
        q: "¿Trabajas con clientes internacionales?",
        a: "Sí. Trabajo de forma remota en inglés y español.",
      },
    ],
  },
  finalCta: {
    title: "Veamos qué tiene sentido hacer.",
    body: "Cuéntame un problema de tu negocio, una idea que quieras construir o un software que no esté funcionando como debería.",
    noSolutionLine: "No necesitas tener definida la solución técnica.",
    note: "Sin compromiso. Una conversación para entender cuál puede ser el mejor camino.",
  },
  footer: {
    rights: "Todos los derechos reservados",
  },
  contactForm: {
    title: "Contame tu proyecto",
    name: "Nombre",
    email: "Email",
    company: "Empresa",
    companyOptional: "Empresa (opcional)",
    project: "¿Qué estás tratando de resolver/construir?",
    website: "Sitio web (opcional)",
    submit: "Enviar →",
    sending: "Enviando…",
    success: "Gracias — te voy a responder en un par de días.",
    error: "Algo salió mal al enviar esto. Por favor escribime directamente por email.",
  },
};

export default es;
