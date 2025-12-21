export function getMockupTranslator(language: string) {
  return (en: string, id: string, zh: string) => {
    if (language === "zh") return zh
    if (language === "id") return id
    return en
  }
}
