import type { ReactNode } from "react";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  description: string;
  className?: string;
}

export function SectionHeading({ kicker, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`}>
      <div>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}
