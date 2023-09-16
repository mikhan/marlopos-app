// import { getCalendarEvents } from '$lib/database/calendar'
import { getPageLinks } from '$lib/services/api'
import { PseudoRandom } from '$lib/services/pseudo-random'
import { getLanguage } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)

  return {
    metadata: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
    // calendarEvents: getCalendarEvents({ language }),
    calendarEvents: [
      createEvents(
        'Nisi ullamco nulla ad non cupidatat exercitation.',
        'Deserunt nulla ad consequat do minim ullamco velit adipisicing irure id qui eiusmod irure aliquip. Ex esse ut cillum ipsum veniam labore occaecat fugiat voluptate nisi aliqua aliqua incididunt pariatur. Reprehenderit cillum incididunt veniam duis Lorem exercitation fugiat quis veniam in. Sint id adipisicing Lorem reprehenderit. Minim eiusmod proident commodo excepteur dolore dolor exercitation magna velit ut ex officia adipisicing.',
      ),
      createEvents(
        'Do duis eiusmod consequat occaecat sit.',
        'Ut occaecat anim ea cupidatat in ex occaecat occaecat. In id mollit nulla dolor tempor dolore laboris sunt velit ut. Nisi culpa qui cupidatat pariatur do irure fugiat sint nisi velit amet occaecat aute aliqua.',
      ),
      createEvents(
        'Consectetur excepteur occaecat ullamco aliqua est.',
        'Est culpa excepteur incididunt elit esse. Esse mollit nisi ullamco ex non labore ea velit sint pariatur sunt ut. Est veniam incididunt pariatur enim ex in adipisicing dolor laborum. Est do ipsum aute ad nostrud aliquip.',
      ),
      createEvents(
        'Aliquip reprehenderit quis nostrud amet anim nostrud.',
        'In ipsum sint magna aliquip. Voluptate ut aliqua officia id officia adipisicing elit cillum mollit mollit. Enim culpa reprehenderit velit fugiat.',
      ),
      createEvents(
        'Officia exercitation deserunt deserunt fugiat.',
        'Anim deserunt sit incididunt ullamco quis elit mollit culpa. Nostrud ex reprehenderit do irure exercitation officia. Irure ipsum velit pariatur dolor est ex. Aliquip esse ullamco irure excepteur mollit culpa occaecat et nostrud sit.',
      ),
      createEvents(
        'Adipisicing sint culpa irure ad excepteur pariatur.',
        'Dolore adipisicing reprehenderit laboris esse et pariatur. Et Lorem laboris ipsum officia magna mollit commodo ullamco enim proident qui. Officia aliquip fugiat Lorem ipsum labore voluptate pariatur pariatur. Sit enim tempor velit fugiat eu. Laboris officia ad voluptate id sint nisi et dolor aliqua in deserunt ea.',
      ),
      createEvents(
        'Pariatur eu do laborum culpa cupidatat amet cillum.',
        'Aute sint qui duis consectetur est eu proident dolore dolor excepteur ullamco ea. Id enim excepteur ea elit ut amet pariatur labore voluptate. Ipsum veniam eu dolor irure fugiat quis tempor nostrud aliquip consectetur cillum eiusmod. Cupidatat anim veniam ipsum qui reprehenderit dolore ipsum cupidatat culpa dolor Lorem. Id velit mollit quis pariatur ut deserunt. Aliquip et deserunt et id incididunt id eu anim quis cillum esse cillum. Pariatur ullamco exercitation amet ex enim nulla eu nostrud occaecat.',
      ),
      createEvents(
        'Sit laboris veniam dolor minim.',
        'Non ut cillum dolor irure proident. Et aute ullamco ipsum nulla dolore elit occaecat. Irure cupidatat anim do non eu.',
      ),
      createEvents(
        'Tempor aliqua culpa nostrud ad quis elit elit proident sunt.',
        'Ad labore excepteur incididunt id amet consequat. Anim cupidatat quis aute consequat tempor esse adipisicing. Laboris consectetur minim duis officia ut. Sunt qui voluptate voluptate minim esse proident cupidatat dolore. Mollit do officia cupidatat ipsum adipisicing.',
      ),
      createEvents(
        'Irure officia mollit proident ipsum ex nisi ipsum voluptate incididunt occaecat quis proident.',
        'Dolor aliquip est ipsum cillum elit nostrud exercitation. Magna aliquip aliqua cupidatat nisi reprehenderit dolor sint consectetur consectetur non. Minim quis commodo commodo magna aliqua.',
      ),
      createEvents(
        'Aliqua nostrud ea dolore qui aliquip nisi amet cillum et non ipsum proident.',
        'Minim cillum consequat voluptate cupidatat quis non mollit. Quis velit cillum minim labore voluptate aliquip nulla. Ex sunt sint eiusmod deserunt voluptate aliquip non velit sint. Dolore nostrud deserunt esse laborum exercitation Lorem Lorem proident dolore incididunt fugiat incididunt. Voluptate ipsum nisi et sint sunt duis eu nisi aliqua reprehenderit dolor. Nulla irure anim dolor magna aliquip tempor laborum tempor incididunt dolor fugiat.',
      ),
      createEvents(
        'Duis voluptate eu aliquip ipsum dolore et mollit do incididunt mollit.',
        'Nostrud incididunt consectetur amet eu enim magna esse minim minim duis ea Lorem. Consectetur eiusmod consectetur qui incididunt et deserunt incididunt magna tempor id. Enim qui non non sint.',
      ),
      createEvents(
        'Consectetur dolore irure voluptate id incididunt sit duis eu incididunt.',
        'Aute fugiat amet deserunt cupidatat pariatur ut excepteur commodo exercitation aliqua. Ea consectetur exercitation occaecat aliqua incididunt dolore proident veniam do laborum ullamco enim consequat. Sit Lorem ut tempor enim commodo eiusmod sunt velit irure.',
      ),
      createEvents(
        'Incididunt esse esse magna quis incididunt esse occaecat veniam sunt.',
        'Sit exercitation do ea in. Non fugiat anim est nisi et excepteur ut nisi consectetur quis pariatur. Aliquip qui consequat cillum aliquip ut veniam consectetur aliqua ipsum sit aute officia fugiat.',
      ),
      createEvents(
        'Commodo Lorem deserunt dolore pariatur est labore esse id proident cillum incididunt aliqua do.',
        'Elit ea et duis ipsum cupidatat ullamco nostrud dolore duis anim. Duis duis pariatur occaecat voluptate veniam aute duis irure cupidatat incididunt quis adipisicing magna. Nisi esse deserunt ipsum laboris pariatur ullamco labore irure Lorem adipisicing. Deserunt consequat elit est est ipsum dolor deserunt do occaecat occaecat incididunt nostrud nulla. Fugiat eiusmod non ut sit eiusmod aliquip non do excepteur irure nisi Lorem eu. Reprehenderit veniam sint qui qui enim nostrud qui.',
      ),
      createEvents(
        'Do eiusmod id nisi reprehenderit enim quis id ullamco dolor reprehenderit laboris.',
        'Id cillum dolor adipisicing commodo qui anim dolor excepteur velit. Cillum amet enim sit proident aliqua voluptate laboris pariatur eu do velit. Deserunt mollit id aute Lorem laborum irure. Reprehenderit id enim aliqua commodo irure ea culpa anim.',
      ),
      createEvents(
        'Deserunt deserunt velit amet laboris.',
        'Id mollit quis dolore proident irure tempor non adipisicing excepteur. Ullamco amet nostrud exercitation elit quis cupidatat velit aliquip irure. Nostrud minim quis ex cupidatat ullamco velit ipsum consequat. Laborum commodo do duis dolore. Do ad ullamco nisi velit qui aliqua magna nisi. Eu anim elit culpa velit duis dolore. Fugiat laborum ad deserunt nulla.',
      ),
      createEvents(
        'Qui officia quis ex ipsum officia minim incididunt irure laborum ad culpa anim minim.',
        'Tempor irure consectetur elit commodo et anim. Non eiusmod velit magna dolor consequat do dolor ea incididunt exercitation aute incididunt est occaecat. Nulla duis culpa irure culpa labore ut ut fugiat deserunt. Mollit ex do voluptate deserunt pariatur irure ex. Eu cupidatat elit eu in enim enim voluptate incididunt culpa nostrud aliqua. Culpa est esse laboris qui sint voluptate mollit enim amet labore culpa voluptate. Aliqua do commodo do dolore minim commodo.',
      ),
    ],
  }
}) satisfies PageServerLoad

const startDate = new Date().getTime()
const rnd = new PseudoRandom(5)
const dayMs = 1000 * 60 * 60 * 24
let id = 0
function createEvents(name: string, description: string): Api.CalendarEntry {
  const length = rnd.nextRange(4, 12)
  const eventDuration = rnd.nextRange(2, 15) * dayMs
  const eventGap = rnd.nextRange(4, 15) * dayMs
  let date = startDate + rnd.nextRange(0, 10) * dayMs

  return {
    id: (++id).toString(),
    name,
    description,
    events: Array.from({ length }, () => {
      const start = new Date(date)
      date += eventDuration
      const end = new Date(date)
      date += eventGap

      return { start, end }
    }),
  }
}
