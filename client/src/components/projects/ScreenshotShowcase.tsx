import { useEffect, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../ui/Icon";
import { DeviceMockup } from "./DeviceMockup";
import { deviceAddress } from "../../lib/projectUi";
import type { DeviceType, Project } from "../../types";

type Mode = "main" | "mobile";

function Thumb({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="pd-thumb-fallback" aria-hidden="true" />;
  return <img src={encodeURI(src)} alt="" loading="lazy" draggable={false} onError={() => setFailed(true)} />;
}

/**
 * Screenshot slideshow inside a device frame: arrows, arrow keys, thumbnails, click to enlarge.
 * When a project also has `mobileScreenshots`, a Desktop / Mobile switch appears and the phone
 * shots are shown in a phone frame.
 */
export function ScreenshotShowcase({ project }: { project: Project }) {
  const mobileShots = project.mobileScreenshots ?? [];
  const hasMobile = mobileShots.length > 0 && project.deviceType !== "mobile";

  const [mode, setMode] = useState<Mode>("main");
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const showingMobile = hasMobile && mode === "mobile";
  const shots = showingMobile ? mobileShots : project.screenshots;
  const device: DeviceType = showingMobile ? "mobile" : project.deviceType;
  const mainLabel = project.deviceType === "terminal" ? "Terminal" : "Desktop";

  const count = shots.length;
  const multiple = count > 1;
  const current = shots[index];

  const switchMode = (next: Mode) => {
    setMode(next);
    setIndex(0);
    setZoomed(false);
  };

  const go = (next: number) => {
    if (count > 0) setIndex(((next % count) + count) % count);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  // Full-size viewer: Esc closes, arrows change slide, page scroll is locked while open.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      else if (e.key === "ArrowRight" && count > 1) setIndex((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft" && count > 1) setIndex((i) => (i - 1 + count) % count);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [zoomed, count]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="pd-showcase" aria-roledescription="carousel" aria-label={`${project.name} screenshots`}>
      <div className="pd-inner">
        <div className="pd-section-head">
          <span className="pd-kicker">Interface</span>
          <h2>See it in action.</h2>
        </div>

        {hasMobile && (
          <div className="pd-modes" role="group" aria-label="Choose screenshot device">
            <button type="button" className="pd-mode" aria-pressed={!showingMobile} onClick={() => switchMode("main")}>
              {mainLabel}
            </button>
            <button type="button" className="pd-mode" aria-pressed={showingMobile} onClick={() => switchMode("mobile")}>
              Mobile
            </button>
          </div>
        )}

        <div
          className="pd-stage"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={multiple ? "Screenshot viewer. Use the left and right arrow keys to change slides." : "Screenshot viewer"}
        >
          <span className="pd-stage-watermark" aria-hidden="true">
            {project.watermark ?? project.name}
          </span>

          {multiple && (
            <button type="button" className="pd-arrow prev" onClick={() => go(index - 1)} aria-label="Previous screenshot">
              <Icon name="arrow" size={20} />
            </button>
          )}

          <div className={`pd-slide slide-${device}`} key={`${device}-${index}`} aria-live="polite">
            <DeviceMockup
              key={current}
              device={device}
              src={current}
              alt={`${project.name} ${showingMobile ? "mobile " : ""}screenshot ${index + 1} of ${Math.max(count, 1)}`}
              address={deviceAddress(project)}
              eager
            />
            {current && (
              <button type="button" className="pd-zoom" onClick={() => setZoomed(true)} aria-label="View screenshot full size" />
            )}
          </div>

          {multiple && (
            <button type="button" className="pd-arrow next" onClick={() => go(index + 1)} aria-label="Next screenshot">
              <Icon name="arrow" size={20} />
            </button>
          )}
        </div>

        {multiple && (
          <div className="pd-controls">
            <span className="pd-counter" aria-hidden="true">
              {pad(index + 1)} / {pad(count)}
            </span>
            <div className="pd-thumbs">
              {shots.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  className={i === index ? `pd-thumb thumb-${device} active` : `pd-thumb thumb-${device}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index}
                >
                  <Thumb src={src} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portal to <body>: the page's entrance animation would otherwise trap position: fixed. */}
      {zoomed &&
        current &&
        createPortal(
          <div
            className="pd-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} screenshot ${index + 1} of ${count}, full size`}
            onClick={() => setZoomed(false)}
          >
            <button type="button" className="pd-lightbox-close" onClick={() => setZoomed(false)} aria-label="Close full-size view" autoFocus>
              ×
            </button>
            <img src={encodeURI(current)} alt={`${project.name} screenshot ${index + 1}, full size`} onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </section>
  );
}