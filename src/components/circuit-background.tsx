const traces = Array.from({ length: 28 }, (_, index) => {
  const y = 80 + index * 22;
  const start = 530 + ((index * 53) % 310);
  const bend = 980 + (index % 5) * 32;
  const offset = (index % 2 === 0 ? 1 : -1) * (35 + (index % 4) * 19);
  return {
    y,
    start,
    path: `M ${start} ${y} H ${bend - 75} L ${bend} ${y + offset} H 1510`,
    heavy: index % 6 === 1,
  };
});

export function CircuitBackground() {
  return (
    <div className="circuit-background" aria-hidden="true">
      <div className="circuit-cloud" />
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="circuit-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#008EFF" stopOpacity=".1" />
            <stop offset=".45" stopColor="#008EFF" stopOpacity=".75" />
            <stop offset="1" stopColor="#008EFF" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="circuit-fade">
            <stop offset="0" stopColor="black" />
            <stop offset=".32" stopColor="black" />
            <stop offset=".62" stopColor="white" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <mask id="circuit-mask">
            <rect width="1440" height="800" fill="url(#circuit-fade)" />
          </mask>
          <radialGradient id="circuit-light">
            <stop offset="0" stopColor="white" />
            <stop offset=".14" stopColor="#008EFF" stopOpacity=".4" />
            <stop offset="1" stopColor="#008EFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g mask="url(#circuit-mask)">
          <g fill="none" stroke="#008EFF" strokeWidth=".65" opacity=".16">
            {Array.from({ length: 37 }, (_, index) => (
              <path
                key={index}
                d={`M ${780 + index * 19} 0 V ${80 + (index % 8) * 45} L ${850 + index * 19} ${150 + (index % 8) * 45} V 800`}
              />
            ))}
            {Array.from({ length: 35 }, (_, index) => (
              <path key={index} d={`M 640 ${index * 23} H 1440`} />
            ))}
          </g>
          <g fill="none" stroke="url(#circuit-ink)" strokeLinejoin="round">
            {traces.map((trace, index) => (
              <g key={index}>
                <path
                  d={trace.path}
                  strokeWidth={trace.heavy ? 8 : 1.6}
                  opacity={trace.heavy ? 0.6 : 0.75}
                />
                {trace.heavy && (
                  <path
                    d={trace.path}
                    stroke="white"
                    strokeWidth="1"
                    opacity=".8"
                  />
                )}
                <circle
                  cx={trace.start}
                  cy={trace.y}
                  r={trace.heavy ? 5 : 3}
                  fill="#f6fbff"
                  stroke="#008EFF"
                  strokeWidth="1.4"
                />
              </g>
            ))}
          </g>
          <g
            className="circuit-flow"
            fill="none"
            stroke="#008EFF"
            strokeWidth="2"
            strokeDasharray="12 240"
          >
            {traces
              .filter((_, index) => index % 5 === 0)
              .map((trace, index) => (
                <path key={index} d={trace.path} />
              ))}
          </g>
          <g fill="#008EFF">
            {Array.from({ length: 72 }, (_, index) => (
              <circle
                key={index}
                cx={470 + ((index * 97) % 930)}
                cy={35 + ((index * 71) % 730)}
                r={index % 9 === 0 ? 3.2 : 1.2}
                opacity={0.08 + (index % 5) * 0.045}
              />
            ))}
          </g>
          <g fill="none" stroke="#008EFF" opacity=".25">
            <path d="M 905 162 H 1050 L 1130 242 H 1440" strokeWidth="2" />
            <path d="M 715 585 H 960 L 1038 507 H 1440" strokeWidth="3" />
            <path d="M 810 666 H 1000 L 1080 586 H 1440" strokeWidth="1.5" />
            <circle cx="905" cy="162" r="9" />
            <circle cx="715" cy="585" r="7" />
            <circle cx="810" cy="666" r="6" />
          </g>
          <circle
            className="circuit-spark"
            cx="1285"
            cy="570"
            r="130"
            fill="url(#circuit-light)"
          />
          <circle
            className="circuit-spark circuit-spark-secondary"
            cx="1090"
            cy="185"
            r="80"
            fill="url(#circuit-light)"
          />
        </g>
      </svg>
    </div>
  );
}
