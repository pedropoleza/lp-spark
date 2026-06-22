/**
 * Auto-resize de iframes do GHL (booking, order/payment forms).
 *
 * O GHL hospeda o `form_embed.js`, que expõe `window.iFrameResize` (lib
 * iframe-resizer). Quando a página DENTRO do iframe roda o companion do GHL,
 * ela posta a altura do conteúdo via postMessage e a lib ajusta a altura do
 * iframe — assim o conteúdo aparece inteiro, SEM scroll interno.
 *
 * O script não usa MutationObserver: ele varre o DOM só no load. Como nossos
 * iframes são renderizados pelo React (depois disso), nós carregamos o script
 * uma vez e chamamos `iFrameResize` explicitamente quando o iframe monta.
 */

const SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

type IFrameResize = (opts: Record<string, unknown>, target: HTMLIFrameElement) => void;
type WinWithResize = Window & { iFrameResize?: IFrameResize };

let loadPromise: Promise<void> | null = null;

/** Injeta o form_embed.js do GHL uma única vez e resolve quando `iFrameResize` existe. */
export function loadFormEmbed(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as WinWithResize).iFrameResize) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve) => {
    const done = () => resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if ((window as WinWithResize).iFrameResize) done();
      else existing.addEventListener("load", done, { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.addEventListener("load", done, { once: true });
    s.addEventListener("error", done, { once: true }); // não trava a UI se o script falhar
    document.body.appendChild(s);
  });
  return loadPromise;
}

/**
 * Liga o auto-resize num iframe do GHL. Sem efeito (e sem erro) se o conteúdo
 * do iframe não suportar o handshake — nesse caso vale a altura do CSS.
 */
export function autoResizeGhlIframe(iframe: HTMLIFrameElement): void {
  const w = window as WinWithResize;
  if (!w.iFrameResize) return;
  try {
    w.iFrameResize(
      {
        log: false,
        checkOrigin: false,
        enablePublicMethods: true,
        heightCalculationMethod: "offset",
        autoResize: true,
        sizeWidth: false,
        sizeHeight: true,
        scrolling: false,
      },
      iframe,
    );
  } catch {
    /* conteúdo cross-origin sem companion: mantém a altura do CSS */
  }
}

/** Carrega o script e aplica o auto-resize quando o iframe estiver disponível. */
export function attachGhlAutoResize(iframe: HTMLIFrameElement | null): void {
  if (!iframe) return;
  loadFormEmbed().then(() => autoResizeGhlIframe(iframe));
}
