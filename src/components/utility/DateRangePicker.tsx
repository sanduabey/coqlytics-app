type DatePickerProps = {
  name: string
}

const DateRangePicker = (props: DatePickerProps) => {
  return (
    <label>
      Dates:
      <select name={props.name}>
        <option value="7days">Last 7 days</option>
        <option value="1month">Last month</option>
        <option value="3months">Last 3 months</option>
        <option value="6months">Last 6 months</option>
        <option value="1year">Last year</option>
        <option value="custom">Custom</option>
      </select>
    </label>
  )
}

export default DateRangePicker
