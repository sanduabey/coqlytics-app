import { useState } from 'react'
import DateRangePicker from '../util-components/DateRangePicker'
import FarmlandVolChart from './FarmlandVolChart'

const initialToDate = new Date()
const initialFromDate = new Date()
initialFromDate.setDate(initialToDate.getDate() - 30)

const FarmlandVolChartSection = () => {
  const [fromDate, setFromDate] = useState(initialFromDate)
  const [toDate, setToDate] = useState(initialToDate)

  const dateRangeChangeHander = (from: Date, to: Date) => {
    // console.log('FROM', from, 'TO', to)
    setFromDate(from)
    setToDate(to)
  }

  return (
    <section className="bg-gray-200">
      <div className="flex justify-end max-w-6xl p-6 ml-auto mr-auto">
        <DateRangePicker
          name="farmlandVolDateRange"
          onDateRangeChange={dateRangeChangeHander}
          initFrom={fromDate}
          initTo={toDate}
        ></DateRangePicker>
      </div>
      <div className="flex justify-center">
        <FarmlandVolChart fromDate={fromDate} toDate={toDate} />
      </div>
    </section>
  )
}

export default FarmlandVolChartSection
