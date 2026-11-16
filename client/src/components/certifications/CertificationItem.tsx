import { useState } from "react";
import { Icon } from "../ui/Icon";
import type { Certification } from "../../types";

interface CertificationItemProps {
  certification: Certification;
  index: number;
  open: boolean;
  onToggle: () => void;
}

function CertificateImage({ certification }: { certification: Certification }) {
  const [failed, setFailed] = useState(false);

  if (certification.imageUrl && !failed) {
    return (
      <img
        className="cert-image"
        src={certification.imageUrl}
        alt={`${certification.title} certificate`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="cert-placeholder" role="img" aria-label={`${certification.title} certificate placeholder`}>
      <Icon name="image" size={34} />
      <strong>Certificate image</strong>
      <small>
        Add <code>client/public/certificates/{certification.slug}.png</code>
      </small>
    </div>
  );
}

export function CertificationItem({ certification, index, open, onToggle }: CertificationItemProps) {
  const panelId = `cert-panel-${certification.slug}`;
  const buttonId = `cert-button-${certification.slug}`;
  const issuer = [certification.issuer, certification.program].filter(Boolean).join(" · ");

  return (
    <div className={open ? "cert-item open" : "cert-item"}>
      <h3>
        <button
          id={buttonId}
          type="button"
          className="cert-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="cert-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="cert-title">{certification.title}</span>
          <span className="cert-issuer">{issuer}</span>
          <span className="cert-chevron">
            <Icon name="chevron" size={18} />
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} className="cert-panel">
        <div className="cert-panel-clip">
          <div className="cert-panel-inner">
            <CertificateImage certification={certification} />
            <div className="cert-details">
              <span className="cert-meta">
                <Icon name="award" size={15} /> {issuer}
              </span>
              <p>{certification.description}</p>
              {certification.highlights.length > 0 && (
                <ul>
                  {certification.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Icon name="check" size={15} /> {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {certification.credentialUrl && (
                <a className="text-link" href={certification.credentialUrl} target="_blank" rel="noreferrer">
                  Verify credential <Icon name="external" size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
