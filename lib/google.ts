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
  const gsi = await loadGsi();

  console.log("gsi", gsi);

  return new Promise<string>((resolve, reject) => {
    const google = (window as any).google;

    if (!google?.accounts?.id) {
      reject(new Error("Google Identity is not available"));

      return;
    }

    let settled = false;

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp: { credential?: string }) => {
        console.log("Google ID callback", resp);
        if (settled) return;
        settled = true;
        if (resp?.credential) resolve(resp.credential);
        else reject(new Error("No Google credential returned"));
      },
      ux_mode: "popup",
    });

    // Show One Tap / popup. If user closes it, we reject after a short delay.
    try {
      google.accounts.id.prompt((notification: any) => {
        // If dismissed or not displayed, surface an error so UI can handle it
        if (
          notification?.isNotDisplayed?.() ||
          notification?.isSkippedMoment?.()
        ) {
          if (!settled) {
            settled = true;
            reject(new Error("Google sign-in was dismissed"));
          }
        }
      });
    } catch (e) {
      if (!settled) {
        settled = true;
        reject(e as Error);
      }
    }
  });
}
