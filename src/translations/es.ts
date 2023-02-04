// import type { Translations } from './translations'

const translations = {
  'param.packages': 'paquetes',
  'contactForm.field.email.label': 'Email',
  'contactForm.field.email.placeholder': 'usuario@email.com',
  'contactForm.field.subject.label': 'Asunto',
  'contactForm.field.subject.placeholder': '¿Cómo podemos ayudarle?',
  'contactForm.field.message.label': 'Mensaje',
  'contactForm.field.message.placeholder': 'Déjenos un mensaje',
  'contactForm.button.send': 'Enviar',
}

export type Translations = Record<keyof typeof translations, string>

export default translations
