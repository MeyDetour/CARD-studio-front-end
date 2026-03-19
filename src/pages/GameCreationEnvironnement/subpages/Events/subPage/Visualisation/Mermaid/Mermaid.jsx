import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import svgPanZoom from "svg-pan-zoom";

import "./style.css";
export function Mermaid({ chart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      flowchart: {
        htmlLabels: true,
        useMaxWidth: false,
        curve: "basis",
        rankSpacing: 100, // vertical
        nodeSpacing: 50, // horizontale
      },
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid.render(id, chart).then(({ svg }) => {
        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";

          svgPanZoom(svgElement, {
            zoomEnabled: true,
            controlIconsEnabled: true, // Affiche les boutons + et -
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 10,
          });
        }
      });
    }
  }, [chart]);

  return (
    <div
      className="mermaid"
      ref={containerRef}
      style={{
        width: "100%",
        height: "1400px",
        overflow: "hidden",
      }}
    />
  );
}
