import { useEffect, useRef, useState, type ReactNode } from "react";
import { copyToClipboard } from "../../lib/clipboard";
import { Icon } from "./Icon";

interface CopyButtonProps {
  /** The text that ends up on the clipboard. */
  text: string;
  className?: string;
  /** What the button normally shows. */
  children: ReactNode;
  /** Short message shown for a moment after copying, e.g. "Email copied". */
  copiedLabel?: string;
  /** Accessible name, e.g. "Copy email address". */
  label: string;
}

/**
 * A button that copies `text` instead of opening a mail/phone app.
 * After a click it swaps its content for a confirmation and announces it to screen readers.
 */
export function CopyButton({ text, className, children, copiedLabel = "Copied", label }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = async () => {
    const ok = await copyToClipboard(text);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <button
      type="button"
      className={`${className ?? ""} copy-button${state === "copied" ? " is-copied" : ""}`.trim()}
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      {children}
      <span className="copy-toast" aria-hidden="true">
        {state === "failed" ? (
          "Couldn’t copy"
        ) : (
          <>
            <Icon name="check" size={12} /> {copiedLabel}
          </>
        )}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? copiedLabel : state === "failed" ? "Couldn’t copy" : ""}
      </span>
    </button>
  );
}
