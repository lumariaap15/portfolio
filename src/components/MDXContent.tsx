"use client";

import * as runtime from "react/jsx-runtime";
import { DemoSlot } from "./DemoSlot";

// Componentes disponibles dentro de cualquier .mdx
const components = {
  DemoSlot,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose-portfolio">
      <Component components={components} />
    </div>
  );
}
