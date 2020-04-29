import { TimeRange } from "./@generated/types";
import moment from "moment";
interface TimeRangeStamps {
  from: number;
  to: number;
}
export const timeRangeToTimeStamp = (timeRange: TimeRange): TimeRangeStamps => {
  let from: number = 0;
  console.log(timeRange);
  if (typeof timeRange === "number") {
    const now = new Date();
    now.setDate(now.getDate() - timeRange);
    from = Math.round(now.getTime() / 1000); // convert into seconds
  }
  if (timeRange === "MAX") {
    from = 0;
  } else if (timeRange === "YTD") {
    from = new Date(new Date().getFullYear(), 0, 1).getTime();
  }
  return {
    to: 9999999999, //To current time
    from: from,
  };
};
