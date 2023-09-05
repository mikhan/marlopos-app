// import type { Translations } from './translations'

const translations = {
  'param.packages': 'paquetes',
  'contactForm.field.email.label': 'Email',
  'contactForm.field.email.placeholder': '',
  'contactForm.field.name.label': 'Nombre',
  'contactForm.field.name.placeholder': '',
  'contactForm.field.message.label': 'Mensaje',
  'contactForm.field.message.placeholder': '¿Cómo podemos ayudarle?',
  'contactForm.button.send': 'Enviar',
}

export type Translations = Record<keyof typeof translations, string>

export default translations
