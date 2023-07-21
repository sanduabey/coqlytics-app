import { BaseSyntheticEvent, useState } from 'react'
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

const GetNowMinusXDate = (x: number): Date => {
  let now = new Date()
  let previous = new Date()

  previous.setDate(now.getDate() - x)

  return previous
}

const DateRangePicker = (props: DatePickerProps) => {
  const [fromDate, setFromDate] = useState(props.initFrom)
  const [toDate, setToDate] = useState(props.initTo)

  const [selectedDropdownOption, setSelectedDropdownOption] = useState('1month')
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false)

  const dropdownChangeHandler = (event: BaseSyntheticEvent) => {
    console.log(event.target.value)
    let selectedOption = event.target.value
    setSelectedDropdownOption(selectedOption)

    switch (selectedOption) {
      case '7days':
        setIsDatePickerEnabled(false)
        let previous7Date = GetNowMinusXDate(7)
        setFromDate(previous7Date)
        setToDate(new Date())
        props.onDateRangeChange(previous7Date, new Date())
        break

      case '1month':
        setIsDatePickerEnabled(false)
        let previous30Date = GetNowMinusXDate(30)
        setFromDate(previous30Date)
        setToDate(new Date())
        props.onDateRangeChange(previous30Date, new Date())
        break

      case '3months':
        setIsDatePickerEnabled(false)
        let previous90Date = GetNowMinusXDate(90)
        setFromDate(previous90Date)
        setToDate(new Date())
        props.onDateRangeChange(previous90Date, new Date())
        break

      case '6months':
        setIsDatePickerEnabled(false)
        let previous180Date = GetNowMinusXDate(180)
        setFromDate(previous180Date)
        setToDate(new Date())
        props.onDateRangeChange(previous180Date, new Date())
        break

      // case '1year':
      //   setIsDatePickerEnabled(false)
      //   let previous365Date = GetNowMinusXDate(365)
      //   setFromDate(previous365Date)
      //   setToDate(new Date())
      //   props.onDateRangeChange(previous365Date, new Date())
      //   break

      case 'custom':
        setIsDatePickerEnabled(true)
    }

    // if (selectedOption === 'custom') {
    //   setIsDatePickerEnabled(true)
    // } else {
    //   setIsDatePickerEnabled(false)
    // }
  }

  return (
    <>
      <div className="p-2">
        <label className="text-sm">
          <span className="pr-2">Range:</span>
          <select
            name={props.name}
            className="rounded-md pl-4 pr-2"
            onChange={dropdownChangeHandler}
            value={selectedDropdownOption}
          >
            <option value="7days">last 7 days</option>
            <option value="1month">last month</option>
            <option value="3months">last 3 months</option>
            <option value="6months">last 6 months</option>
            {/* <option value="1year">last year</option> */}
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
          disabled={!isDatePickerEnabled}
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
          disabled={!isDatePickerEnabled}
        />
      </div>
      {/* <DatePicker selected={new Date()}></DatePicker> */}
    </>
  )
}

export default DateRangePicker
