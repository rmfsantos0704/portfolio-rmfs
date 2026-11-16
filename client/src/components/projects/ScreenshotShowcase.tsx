import { useState, type KeyboardEvent } from "react";
import { Icon } from "../ui/Icon";
import { DeviceMockup } from "./DeviceMockup";
import { deviceAddress } from "../../lib/projectUi";
import type { Project } from "../../types";

function Thumb({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="pd-thumb-fallback" aria-hidden="true" />;
  return <img src={encodeURI(src)} alt="" loading="lazy" draggable={false} onError={() => setFailed(true)} />;
}

/** Screenshot slideshow inside a device frame: arrows, arrow keys, thumbnails. */
export function ScreenshotShowcase({ project }: { project: Project }) {
  const shots = project.screenshots;
  const count = shots.length;
  const [index, setIndex] = useState(0);
  const multiple = count > 1;

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

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="pd-showcase" aria-roledescription="carousel" aria-label={`${project.name} screenshots`}>
      <div className="pd-inner">
        <div className="pd-section-head">
          <span className="pd-kicker">Interface</span>
          <h2>See it in action.</h2>
        </div>

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

          <div className={`pd-slide slide-${project.deviceType}`} key={index} aria-live="polite">
            <DeviceMockup
              device={project.deviceType}
              src={shots[index]}
              alt={`${project.name} screenshot ${index + 1} of ${Math.max(count, 1)}`}
              address={deviceAddress(project)}
              eager
            />
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
                  className={i === index ? `pd-thumb thumb-${project.deviceType} active` : `pd-thumb thumb-${project.deviceType}`}
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
    </section>
  );
}
