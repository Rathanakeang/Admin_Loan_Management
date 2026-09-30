import { Checkbox, DatePicker, Segmented } from 'antd'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import { DAY_SLOT, MONTHS, REPORT_RANGE } from '@/utils/constants'

const SLOTS = [
  { value: DAY_SLOT.FULL, label: 'Full day' },
  { value: DAY_SLOT.MORNING, label: 'Morning (00:00–12:00)' },
  { value: DAY_SLOT.AFTERNOON, label: 'Afternoon (12:00–18:00)' },
  { value: DAY_SLOT.NIGHT, label: 'Night (18:00–00:00)' },
]

export default function ReportFilter({ value, onChange, showSlots = true, showMonths = true }) {
  const update = (patch) => onChange({ ...value, ...patch })

  return (
    <PanelCard className="mb-4">
      <p className="mt-0 mb-3 text-sm font-medium text-ink">Time period</p>
      <Segmented
        value={value.range}
        onChange={(range) => update({ range })}
        options={[
          { label: 'Day', value: REPORT_RANGE.DAY },
          { label: 'Week', value: REPORT_RANGE.WEEK },
          { label: 'Month', value: REPORT_RANGE.MONTH },
          { label: 'Year', value: REPORT_RANGE.YEAR },
        ]}
      />
      <div className="mt-4">
        <DatePicker
          value={value.date}
          allowClear={false}
          onChange={(date) => update({ date })}
          picker={value.range === REPORT_RANGE.YEAR ? 'year' : value.range === REPORT_RANGE.MONTH ? 'month' : 'date'}
        />
      </div>
      {showSlots && value.range === REPORT_RANGE.DAY && (
        <div className="mt-4 flex flex-col gap-2">
          {SLOTS.map((slot) => (
            <Checkbox
              key={slot.value}
              checked={value.slot === slot.value}
              onChange={() => update({ slot: slot.value })}
            >
              {slot.label}
            </Checkbox>
          ))}
        </div>
      )}
      {showMonths && value.range === REPORT_RANGE.YEAR && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <Checkbox
            checked={!value.months?.length}
            onChange={() => update({ months: [] })}
          >
            Full year {value.date?.year?.()}
          </Checkbox>
          {MONTHS.map((month, index) => (
            <Checkbox
              key={month}
              checked={value.months?.includes(index + 1)}
              onChange={(event) => {
                const current = value.months || []
                const next = event.target.checked
                  ? [...current, index + 1]
                  : current.filter((item) => item !== index + 1)
                update({ months: next })
              }}
            >
              {month}
            </Checkbox>
          ))}
        </div>
      )}
    </PanelCard>
  )
}
