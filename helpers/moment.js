import moment from 'moment'

const format1 = 'YYYY-MM-DD HH:mm:ss'
const format2 = 'YYYY-MM-DD'
const format3 = 'LLL'

export default function (date) {
  const dateLocal = new Date(date)
  return moment(dateLocal).format(format3)
}
