# Roadmap

El esqueleto actual prioriza lo que tenés hoy: **experiencia laboral, skills con años,
y lo que estás aprendiendo**. Los proyectos y el blog están preparados pero livianos a
propósito — crecen cuando tengas material. Acá el orden sugerido.

## Fase 0 — Antes del primer deploy (30 min)

- [ ] Completar GitHub y LinkedIn en `src/lib/site.ts`
- [ ] Revisar los años por skill en `content/skills/*` (los estimé del CV — ajustá)
- [ ] Agregar una foto tuya al hero si querés el formato Sawad (hoy es solo tipográfico)
- [ ] Deploy a Vercel + dominio custom

## Fase 1 — Lo que mueve la aguja para AI engineering (semanas 1–4)

La pieza diferenciadora no es el diseño, son **demos vivas**. Prioridad alta.

- [ ] **Primera demo AI embebida** en un proyecto. ProfetAI ya tiene el slot.
      Empezá con algo chico: un normalizador de productos con embeddings, o un
      mini-RAG sobre tus propios docs. Que el visitante pueda *usarlo*.
- [ ] Para demos que llamen a un LLM: usá un route handler (`app/api/`) como proxy
      para no exponer la API key en el cliente.
- [ ] Segundo proyecto: algo que muestre "lógica determinista separada de tareas LLM"
      explícitamente — es tu tesis técnica, hacela visible.

## Fase 2 — Blog (cuando tengas algo que decir)

La infra ya está. Para activarlo:

- [ ] Crear el detalle de post: `src/app/blog/[slug]/page.tsx`
      (copiá el patrón de `projects/[slug]/page.tsx` — misma estructura)
- [ ] Agregar "Writing" al nav en `src/components/Nav.tsx`
- [ ] Primer post candidato: tu charla de i18n (ya la diste, el contenido existe),
      o "cómo separo lógica determinista de LLM". Reusá lo que ya tenés.

## Fase 3 — Client reviews / testimonials

Cuando tengas freelance bajo el nuevo posicionamiento.

- [ ] Nueva colección en `velite.config.ts`:
      ```ts
      const testimonials = defineCollection({
        name: "Testimonial",
        pattern: "testimonials/**/*.mdx",
        schema: s.object({
          author: s.string(),
          role: s.string(),       // "CTO, Empresa"
          quote: s.string(),
          avatar: s.string().optional(),
          order: s.number().default(0),
        }),
      });
      ```
- [ ] Sección en la home entre Projects y Footer
- [ ] Pedí los testimonios por escrito apenas cierres un proyecto (es el mejor momento)

## Fase 4 — Pulido

- [ ] Formulario de contacto real (estilo Sawad) con un route handler + Resend o similar
      en vez del `mailto:` actual
- [ ] OG image dinámica (`next/og`) para que los links se vean bien al compartir
- [ ] Versión ES/EN si apuntás a clientes LATAM + US (ya dominás i18n)
- [ ] Analytics (Vercel Analytics es un toggle)

## Decisiones de diseño tomadas (para que no las pierdas)

- **Paleta dark cálida con acento ámbar**, no el near-black con acid-green genérico.
- **Años por skill como dato monoespaciado**, no barras de progreso (más honesto, menos cursi).
- **Eyebrows numeradas (01–04)** porque la home *es* una secuencia narrativa.
- **Boldness concentrada en el hero**; el resto es disciplinado a propósito.
- Si algún día querés panel visual: migrar de Velite a Sanity/Payload es directo
  porque los schemas ya están definidos en `velite.config.ts`.
