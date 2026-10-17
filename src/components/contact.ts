export const PHONE_DISPLAY = "06 12345948";
export const PHONE_TEL = "tel:+31612345948";
export const EMAIL = "info@directautohulp.nl";
export const ADDRESS = "Coolsingel 139, 3012 AG Rotterdam";
export const MAPS_URL = "https://maps.google.com/?q=Coolsingel+139+3012+AG+Rotterdam";

export function whatsappUrl(text = "Hallo DirectAutoHulp, ik heb een vraag.") {
  return `https://wa.me/31612345948?text=${encodeURIComponent(text)}`;
}
