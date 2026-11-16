import { useState } from "react";
import { Icon } from "../ui/Icon";
import type { DeviceType } from "../../types";

interface DeviceMockupProps {
  device: DeviceType;
  /** Path under client/public, e.g. "/SnowEd/calendar.jpeg". Spaces are fine. */
  src?: string;
  alt: string;
  /** Text for the browser / terminal title bar. */
  address?: string;
  eager?: boolean;
}

/**
 * Wraps a screenshot in a browser, phone or terminal frame.
 * If the image is missing it shows a placeholder, so pages work before the files are added.
 * Give it a `key` that changes with `src` so a failed image does not stick.
 */
export function DeviceMockup({ device, src, alt, address, eager = false }: DeviceMockupProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  const screen = (
    <div className="device-screen">
      {showImage ? (
        <img
          src={encodeURI(src as string)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="device-placeholder" role="img" aria-label={`${alt} (screenshot not added yet)`}>
          <Icon name="image" size={30} />
          <strong>Screenshot coming soon</strong>
          {import.meta.env.DEV && src && <small>{src}</small>}
        </div>
      )}
    </div>
  );

  if (device === "mobile") {
    return (
      <div className="device device-mobile">
        <span className="device-notch" aria-hidden="true" />
        {screen}
      </div>
    );
  }

  return (
    <div className={`device device-${device}`}>
      <div className="device-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        {address && <span className="device-url">{address}</span>}
      </div>
      {screen}
    </div>
  );
}
