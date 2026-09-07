/**
 * Central configuration for every external destination on the site.
 *
 * This is the ONLY file you need to edit when you publish a release.
 *
 * APK URLs: leave `null` until the asset actually exists on a GitHub
 * release. While a URL is `null`, the download button shows an
 * "unavailable" state and points people to the releases page instead.
 *
 * The release workflow (.github/workflows/release.yml) produces assets named
 *   Harmony-v1.0.0-arm64-v8a.apk
 *   Harmony-v1.0.0-x86_64.apk
 * so once the v1.0.0 release is published, the URLs will look like
 *   https://github.com/R4duQ/HarmonyApp/releases/download/v1.0.0/Harmony-v1.0.0-arm64-v8a.apk
 * Copy the exact link from the release page rather than typing it by hand.
 */
export const APP_VERSION = '1.0.0';
export const MIN_ANDROID = 'Android 10';

export const GITHUB_URL = 'https://github.com/R4duQ/HarmonyApp';
export const RELEASES_URL = 'https://github.com/R4duQ/HarmonyApp/releases';
export const RELEASE_NOTES_URL = 'https://github.com/R4duQ/HarmonyApp/releases';
export const SUPPORT_URL = 'https://github.com/R4duQ/HarmonyApp/issues';

export const APK_ARM64_URL: string | null =
  'https://github.com/R4duQ/HarmonyApp/releases/download/v1.0.0/Harmony-v1.0.0-arm64-v8a.apk';
export const APK_X86_64_URL: string | null =
  'https://github.com/R4duQ/HarmonyApp/releases/download/v1.0.0/Harmony-v1.0.0-x86_64.apk';
/** Third-party destinations referenced in copy and attribution. */
export const SHFL_URL = 'https://theshfl.com';
export const SOULSEEK_URL = 'https://www.slsknet.org';
export const DEEZER_URL = 'https://www.deezer.com';
