let gsiLoaded = false;
let loadPromise: Promise<void> | null = null;

function loadGsi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (gsiLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if ((window as any).google?.accounts?.id) {
      gsiLoaded = true;
      resolve();

      return;
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gsiLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Google Identity"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function requestGoogleIdToken(clientId: string): Promise<string> {
  await loadGsi();

  return new Promise<string>((resolve, reject) => {
    const google = (window as any).google;

    if (!google?.accounts?.id)
      return reject(new Error("Google Identity is not available"));

    let settled = false;

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp: { credential?: string }) => {
        if (settled) return;
        settled = true;
        if (resp?.credential) resolve(resp.credential);
        else reject(new Error("No Google credential returned"));
      },
      // важные флаги для стабильности
      itp_support: true, // Safari/ITP
      use_fedcm_for_prompt: true, // современный путь в Chrome
    });

    // 1) вариант через кнопку (надёжнее, чем prompt):
    const btn = document.createElement("div");

    btn.style.position = "fixed";
    btn.style.pointerEvents = "none"; // невидимо для пользователя
    btn.style.opacity = "0";
    document.body.appendChild(btn);

    google.accounts.id.renderButton(btn, {
      type: "standard",
      shape: "rectangular",
      size: "large",
    });
    // имитируем клик
    setTimeout(() => (btn.querySelector("div") as HTMLElement)?.click(), 0);

    // 2) необязательный fallback: если FedCM/кнопка не сработали — пробуем One Tap
    setTimeout(() => {
      if (!settled) {
        try {
          google.accounts.id.prompt((n: any) => {
            if ((n?.isNotDisplayed?.() || n?.isSkippedMoment?.()) && !settled) {
              settled = true;
              reject(new Error("Google sign-in was dismissed"));
            }
          });
        } catch (e) {
          if (!settled) {
            settled = true;
            reject(e as Error);
          }
        }
      }
    }, 400);
  });
}
