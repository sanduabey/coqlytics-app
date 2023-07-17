import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = {
  name: string
}

const DateRangePicker = (props: DatePickerProps) => {
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
          selected={new Date()}
          onChange={(item) => {
            console.log(item)
          }}
        />
      </div>
      <div className="pt-3 pb-2 text-sm">to</div>
      <div className="p-2">
        <DatePicker
          className="text-center text-sm rounded-md"
          selected={new Date()}
          onChange={(item) => {
            console.log(item)
          }}
        />
      </div>
      {/* <DatePicker selected={new Date()}></DatePicker> */}
    </>
  )
}

export default DateRangePicker
