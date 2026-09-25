"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  text: string;
}

/** Índice lateral del artículo: marca el apartado que se está leyendo. «Introducción» apunta al inicio del texto. */
export default function TableOfContents({ items }: { items: Item[] }) {
  const todos: Item[] = [{ id: "inicio-articulo", text: "Introducción" }, ...items];
  const [activo, setActivo] = useState(todos[0].id);

  useEffect(() => {
    const elementos = todos.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!elementos.length) return;
    const calcular = () => {
      // El apartado activo es el último cuyo título ya ha pasado por la zona alta de la pantalla
      const limite = window.innerHeight * 0.3;
      let actual = elementos[0].id;
      for (const el of elementos) {
        if (el.getBoundingClientRect().top - limite <= 0) actual = el.id;
      }
      // Al llegar al final de la página, el último apartado queda activo aunque su título no llegue a la zona alta
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) actual = elementos[elementos.length - 1].id;
      setActivo(actual);
    };
    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Índice del artículo" className="blog-toc">
      <ol>
        {todos.map((i) => (
          <li key={i.id} data-active={activo === i.id}>
            <a href={`#${i.id}`} aria-current={activo === i.id ? "true" : undefined}>
              <span className="blog-toc-tick" aria-hidden="true" />
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
