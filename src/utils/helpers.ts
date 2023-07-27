export function ISODateToDateAndTime(isoDate: string): {
  date: string
  time: string
} {
  const dateObj: Date = new Date(isoDate)

  const yyyy = dateObj.getFullYear()
  let mm = dateObj.getMonth() + 1
  let dd = dateObj.getUTCDate()
  let hr = dateObj.getUTCHours()
  let min = dateObj.getUTCMinutes()
  let sec = dateObj.getUTCSeconds()

  let _dd: string
  let _mm: string
  let _hr: string
  let _min: string
  let _sec: string

  if (dd < 10) {
    _dd = '0' + dd
  } else {
    _dd = dd.toString()
  }
  if (mm < 10) {
    _mm = '0' + mm
  } else {
    _mm = mm.toString()
  }
  if (hr < 10) {
    _hr = '0' + hr
  } else {
    _hr = hr.toString()
  }
  if (min < 10) {
    _min = '0' + min
  } else {
    _min = min.toString()
  }
  if (sec < 10) {
    _sec = '0' + sec
  } else {
    _sec = sec.toString()
  }

  const formattedDate = `${_dd}/${_mm}/${yyyy}`
  const formattedTime = `${_hr}:${_min}:${_sec}`

  return { date: formattedDate, time: formattedTime }
}

//returns an array of all dates between to and from dates.
export function getDatesArray(from: Date, to: Date) {
  const dateArray: Date[] = []

  from.setUTCHours(0, 0, 0)
  to.setUTCHours(0, 0, 0)

  let current = from

  while (current <= to) {
    current.setUTCHours(0, 0, 0)
    dateArray.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  // console.log(dateArray, dateArray.length)
  return dateArray
}

export function formatDateToDDMMMYYYY(date: Date): string {
  if (date !== undefined) {
    var myDate = new Date(date)
    var month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][myDate.getMonth()]
    var formattedDate: string =
      myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear()
    return formattedDate
  }
  return ''
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}
