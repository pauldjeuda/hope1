import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import { useT } from "../i18n/LocaleContext";

const DISMISS_KEY = "hope-bridge-pwa-dismiss";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIosSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const safari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return iOS && safari;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

export default function InstallPrompt() {
  const t = useT().pwa;
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    if (isIosSafari()) {
      setIos(true);
      const timer = window.setTimeout(() => setVisible(true), 1800);
      return () => window.clearTimeout(timer);
    }

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* ignore */
    }
    setDeferred(null);
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-3 z-[80] mx-auto max-w-md animate-[slideUp_0.35s_ease] sm:inset-x-auto sm:right-4"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      role="dialog"
      aria-label={t.installTitle}
    >
      <div className="rounded-2xl border border-forest/10 bg-white p-4 shadow-[0_12px_40px_rgba(31,36,24,0.18)]">
        <div className="flex items-start gap-3">
          <img
            src="/brand/logo-mark.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-forest">{t.installTitle}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{t.installText}</p>
            {ios && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <Share className="h-3.5 w-3.5 shrink-0" />
                {t.iosHint}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {!ios && deferred && (
                <button type="button" onClick={() => void install()} className="btn-mustard !min-h-9 !px-4 !text-sm">
                  <Download className="h-3.5 w-3.5" />
                  {t.installCta}
                </button>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-muted hover:bg-soft"
              >
                {t.dismiss}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full p-1 text-muted hover:bg-soft"
            aria-label={t.dismiss}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
