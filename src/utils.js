export const formatFileSizeDisplay = value => {
  if (value < 1024) {
    return `${value} KB`;
  }
  return `${parseFloat((value / 1024).toFixed(1))} MB`;
};

// --- Security helpers ---
// Prevents common issues like `javascript:` URLs and reverse-tabnabbing when
// opening external links.

export const sanitizeUrl = (rawUrl, allowedProtocols = ["http:", "https:"]) => {
  if (!rawUrl || typeof rawUrl !== "string") {
    return null;
  }
  try {
    const parsed = new URL(rawUrl, window.location.href);
    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
};

export const openExternalLink = (rawUrl, name = "link") => {
  const url = sanitizeUrl(rawUrl);
  if (!url) {
    // Avoid throwing in UI; just log a warning.
    // eslint-disable-next-line no-console
    console.warn(`Blocked opening unsafe/invalid URL for ${name}:`, rawUrl);
    return;
  }

  // `noopener,noreferrer` prevents reverse tabnabbing in browsers that support it.
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (win) {
    // Extra protection for browsers that don't fully honor the feature string.
    win.opener = null;
    win.focus();
  }
};
