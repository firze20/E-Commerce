type DatePickerProps = {
  /**
   * The starting date.
   */
  startDate: string;
  /**
   * The ending date.
   */
  endDate: string;
  /**
   * Callback to handle the starting date change.
   */
  onStartDateChange: (date: string) => void;
  /**
   * Callback to handle the ending date change.
   */
  onEndDateChange: (date: string) => void;

  className?: string;
};

const DatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className
}: DatePickerProps) => {
  return (
    <div className={`flex justify-center space-x-5 ${className}`}>
      <label htmlFor="startDate">
        Starting from:
        <input
          type="date"
          id="startDate"
          className="input max-w-xs"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </label>
      <label htmlFor="endDate">
        Ending from:
        <input
          type="date"
          id="endDate"
          className="input max-w-xs"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DatePicker;
