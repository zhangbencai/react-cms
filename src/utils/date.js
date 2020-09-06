import moment from 'moment'
export function toDate(stamp){
  return moment(stamp).format('YYY-MM-DD')
}