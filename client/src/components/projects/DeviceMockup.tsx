import { useState, type CSSProperties } from "react";
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
 *
 * The screen takes the image's own aspect ratio once it has loaded, and the image is drawn with
 * object-fit: contain, so screenshots are never cropped, zoomed or stretched, whatever their size.
 * Until the image loads (or if it is missing) the frame falls back to a sensible default ratio.
 */
export function DeviceMockup({ device, src, alt, address, eager = false }: DeviceMockupProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [dims, setDims] = useState<{ src: string; w: number; h: number } | null>(null);

  const showImage = Boolean(src) && failedSrc !== src;
  const natural = dims && dims.src === src ? dims : null;

  const defaultRatio = device === "mobile" ? "9 / 19.5" : "16 / 10";
  const screenStyle: CSSProperties = {
    aspectRatio: natural ? `${natural.w} / ${natural.h}` : defaultRatio,
    height: "auto", // let the ratio decide the height, not a fixed CSS height
  };
  const imgStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
  };

  const screen = (
    <div className="device-screen" style={screenStyle}>
      {showImage ? (
        <img
          src={encodeURI(src as string)}
          alt={alt}
          style={imgStyle}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          onLoad={(e) =>
            setDims({ src: src as string, w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
          }
          onError={() => setFailedSrc(src ?? null)}
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