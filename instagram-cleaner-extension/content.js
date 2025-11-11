const blockUnwantedFeatures = () => {
  try {
    // Remove Reels and Explore buttons
    document.querySelectorAll(`
      a[href*="/reels/"],
      [aria-label="Reels"],
      svg[aria-label="Reels"],
      a[href="/reels/"],
      a[href="/explore/"],
      [aria-label="Explore"],
      svg[aria-label="Explore"]
    `).forEach(el => el.remove());

    const path = window.location.pathname;
    if (path.startsWith("/reels")) {
      document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Reels Blocked</h2>";
      return;
    }
    if (path.startsWith("/explore")) {
      document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Explore Blocked</h2>";
      return;
    }

    if (path === "/") {
      document.querySelectorAll('article, div[role="presentation"]').forEach(el => el.remove());
      const msgId = 'no-feed-msg';
      if (!document.getElementById(msgId)) {
        const message = document.createElement('div');
        message.id = msgId;
        message.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>🧘‍♀️ Feed Blocked – Time to touch grass</h2>";
        document.body.appendChild(message);
      }
    }
  } catch (e) {
    console.error("Blocker error:", e);
  }
};

// Initial run
blockUnwantedFeatures();

// Observe DOM changes (for React updates)
const observer = new MutationObserver(blockUnwantedFeatures);
observer.observe(document.body, { childList: true, subtree: true });
