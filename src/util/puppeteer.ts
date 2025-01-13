import puppeteer from "puppeteer";
export async function openBrowser(url: string) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        // "--disable-features=IsolateOrigins",
        // "--disable-site-isolation-trials",
        // "--autoplay-policy=user-gesture-required",
        // "--disable-background-networking",
        // "--disable-background-timer-throttling",
        // "--disable-backgrounding-occluded-windows",
        // "--disable-breakpad",
        // "--disable-client-side-phishing-detection",
        // "--disable-component-update",
        // "--disable-default-apps",
        // "--disable-dev-shm-usage",
        // "--disable-domain-reliability",
        // "--disable-extensions",
        // "--disable-features=AudioServiceOutOfProcess",
        // "--disable-hang-monitor",
        // "--disable-ipc-flooding-protection",
        // "--disable-notifications",
        // "--disable-offer-store-unmasked-wallet-cards",
        // "--disable-popup-blocking",
        // "--disable-print-preview",
        // "--disable-prompt-on-repost",
        // "--disable-renderer-backgrounding",
        // "--disable-setuid-sandbox",
        // "--disable-speech-api",
        // "--disable-sync",
        // "--hide-scrollbars",
        // "--ignore-gpu-blacklist",
        // "--metrics-recording-only",
        // "--mute-audio",
        // "--no-default-browser-check",
        // "--no-first-run",
        // "--no-pings",
        // "--no-sandbox",
        // "--no-zygote",
        // "--password-store=basic",
        // "--use-gl=swiftshader",
        // "--use-mock-keychain",
        // "--font-render-hinting=none",
      ],
      // executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();
    console.log(puppeteer.executablePath());
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });
    await page.screenshot({ path: "test.png" });
  } catch (error) {
    console.log(error);
  } finally {
    if (browser) {
      browser.close();
    }
  }
}
