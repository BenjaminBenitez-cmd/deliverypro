import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "redux/schedules/ScheduleSlice";

//a hook used to dispatch a filter type the values to dispatch
//are determined by the event passed on to the filterItems function

const useFilterDays = () => {
  const schedule = useSelector((state) => state.schedule);
  const distpatch = useDispatch();

  const deliveryDayToText = (id) => {
    let day = schedule.dates.find((day) => day.id === id.toString());
    if (day === undefined) return "Not found";
    return day.name;
  };

  const deliveryUniqueDays = () => {
    return schedule.days
      .filter(
        (
          (set) => (f) =>
            !set.has(f.name) && set.add(f.name)
        )(new Set())
      )
      .map((days) => {
        return {
          name: days.name,
          id: days.name_of_day_id,
        };
      });
  };

  const deliveryTimeToText = (id) => {
    if (!id) return "no ID provided";
    let { time_start, time_end } = schedule.days.find(
      (time) => time.id === id.toString()
    );
    return time_start + " - to - " + time_end;
  };

  useEffect(() => {
    distpatch(getSchedules());
  }, [distpatch]);

  return {
    deliveryDayToText,
    deliveryTimeToText,
    deliveryUniqueDays,
    days: schedule.days,
  };
};

export default useFilterDays;
