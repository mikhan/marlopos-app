export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-')
}

export function removeDiacritics(text: string) {
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
}
