import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = {
  name: string
  onDateRangeChange: (from: Date, to: Date) => void

  initFrom: Date
  initTo: Date
}
// const initialToDate = new Date()
// const initialFromDate = new Date()
// initialFromDate.setDate(initialToDate.getDate() - 30)

const DateRangePicker = (props: DatePickerProps) => {
  const [fromDate, setFromDate] = useState(props.initFrom)
  const [toDate, setToDate] = useState(props.initTo)

  return (
    <>
      <div className="p-2">
        <label className="text-sm">
          <span className="pr-2">Range:</span>
          <select name={props.name} className="rounded-md pl-4 pr-2">
            <option value="7days">last 7 days</option>
            <option value="1month">last month</option>
            <option value="3months">last 3 months</option>
            <option value="6months">last 6 months</option>
            <option value="1year">last year</option>
            <option value="custom">custom</option>
          </select>
        </label>
      </div>
      <div className="p-2">
        <DatePicker
          className="text-center text-sm rounded-md"
          selected={fromDate}
          onChange={(selectedFromDate: Date) => {
            console.log('from:', selectedFromDate)
            setFromDate(selectedFromDate)
            props.onDateRangeChange(selectedFromDate, toDate)
          }}
        />
      </div>
      <div className="pt-3 pb-2 text-sm">to</div>
      <div className="p-2">
        <DatePicker
          className="text-center text-sm rounded-md"
          selected={toDate}
          onChange={(selectedToDate: Date) => {
            console.log('to:', selectedToDate)
            setToDate(selectedToDate)
            props.onDateRangeChange(fromDate, selectedToDate)
          }}
        />
      </div>
      {/* <DatePicker selected={new Date()}></DatePicker> */}
    </>
  )
}

export default DateRangePicker
