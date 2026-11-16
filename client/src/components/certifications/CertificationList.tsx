import { useState } from "react";
import { CertificationItem } from "./CertificationItem";
import type { Certification } from "../../types";

/** Accordion: one certificate open at a time; clicking the open one closes it. */
export function CertificationList({ certifications }: { certifications: Certification[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="cert-list">
      {certifications.map((certification, index) => (
        <CertificationItem
          key={certification.slug}
          certification={certification}
          index={index}
          open={openSlug === certification.slug}
          onToggle={() => setOpenSlug(openSlug === certification.slug ? null : certification.slug)}
        />
      ))}
    </div>
  );
}
