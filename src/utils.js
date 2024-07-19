export function sanitizeText(text) {
  return text ? text.replace(/\s+/g, ' ').trim() : '';
}
