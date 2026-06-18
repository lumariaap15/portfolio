// Fondo ambiental de toda la página: círculos de gradiente y anillos punteados
// grandes, con transparencia. Estáticos (sin movimiento) para que sea ambiente
// calmo, no distractor.
const ACCENT_GRADIENT = "linear-gradient(135deg, #ffac41 0%, #ff1e56 100%)";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* círculos de color grandes (transparencia + blur suave) */}
      <div
        className="absolute -right-[12%] -top-[14%] h-[58vw] w-[58vw] rounded-full opacity-[0.13] blur-[50px]"
        style={{ backgroundImage: ACCENT_GRADIENT }}
      />
      <div
        className="absolute -left-[16%] bottom-[-12%] h-[46vw] w-[46vw] rounded-full opacity-[0.08] blur-[55px]"
        style={{ background: "#ffac41" }}
      />
      <div
        className="absolute right-[8%] bottom-[18%] h-[34vw] w-[34vw] rounded-full opacity-[0.07] blur-[60px]"
        style={{ background: "#ff1e56" }}
      />

      {/* anillos punteados grandes, estáticos */}
      <div className="absolute left-[18%] top-[8%] h-[62vw] w-[62vw] rounded-full border border-dashed border-(--color-line) opacity-90" />
      <div className="absolute -right-[8%] bottom-[2%] h-[42vw] w-[42vw] rounded-full border border-dashed border-(--color-line) opacity-70" />
    </div>
  );
}
