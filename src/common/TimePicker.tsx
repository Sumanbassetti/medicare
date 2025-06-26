import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Appointment, Time } from "../types";
import { getMinutes, isValidTime, MAX_TIME, minutesToTime, pad, parseTime } from "../utils/shared";

interface TimePickerProps {
  selectedDate: string;
  appointments: Appointment[];
  setStartTime: (val: string) => void;
  setEndTime: (val: string) => void;
  setIsBooked: (val: boolean) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedDate,
  appointments,
  setStartTime,
  setEndTime,
  setIsBooked,
}) => {
  const [localStartTime, setLocalStartTime] = useState<Time>({
    hour: 12,
    minute: 30,
    ampm: "AM",
  });

  const [localEndTime, setLocalEndTime] = useState<Time>({
    hour: 1,
    minute: 0,
    ampm: "AM",
  });

  const [endManuallyChanged, setEndManuallyChanged] = useState(false);

  // When start time changes, auto-set end time 30 minutes later (if not manually updated)
  useEffect(() => {
    if (!endManuallyChanged) {
      const newEndMins = Math.min(getMinutes(localStartTime) + 30, MAX_TIME);
      const newEnd = minutesToTime(newEndMins);
      setLocalEndTime(newEnd);
    }

    const format = (t: Time) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;
    setStartTime(format(localStartTime));
  }, [localStartTime]);

  useEffect(() => {
    const format = (t: Time) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;
    setEndTime(format(localEndTime));
  }, [localEndTime]);

  useEffect(() => {
    setIsBooked(isTimeRangeBooked(localStartTime, localEndTime, selectedDate));
  }, [localStartTime, localEndTime, selectedDate, appointments]);

  const isTimeRangeBooked = (
    start: Time,
    end: Time,
    dateStr: string
  ): boolean => {
    const startMins = getMinutes(start);
    const endMins = getMinutes(end);

    return appointments.some((app) => {
      if (app.date !== dateStr) return false;
      const appStart = getMinutes(parseTime(app.startTime));
      const appEnd = getMinutes(parseTime(app.endTime));
      return (
        (startMins >= appStart && startMins < appEnd) ||
        (endMins > appStart && endMins <= appEnd) ||
        (startMins <= appStart && endMins >= appEnd)
      );
    });
  };

  const updateTime = (
    type: keyof Time,
    delta: number,
    time: Time,
    setTime: React.Dispatch<React.SetStateAction<Time>>,
    isEndUpdate = false
  ) => {
    const next = { ...time };

    if (type === "hour") {
      next.hour = ((next.hour + delta - 1 + 12) % 12) + 1;
    } else if (type === "minute") {
      next.minute = (next.minute + delta + 60) % 60;
    } else if (type === "ampm") {
      next.ampm = next.ampm === "AM" ? "PM" : "AM";
    }

    if (!isValidTime(next)) return;

    if (isEndUpdate && getMinutes(next) <= getMinutes(localStartTime)) {
      return; // prevent end time being less than or equal to start
    }

    setTime(next);
    if (isEndUpdate) setEndManuallyChanged(true);
  };

  const renderTimeCard = (
    time: Time,
    updateFn: (type: keyof Time, delta: number) => void
  ) => (
    <Card className="w-64 h-[130px] flex flex-row justify-between items-center gap-2 p-4 rounded-xl shadow-sm border transition-all">
      {(["hour", "minute", "ampm"] as const).map((part) => {
        const getNextSimulated = (delta: number): Time => {
          const simulated = { ...time };
          if (part === "hour")
            simulated.hour = ((time.hour + delta - 1 + 12) % 12) + 1;
          if (part === "minute")
            simulated.minute = (time.minute + delta + 60) % 60;
          if (part === "ampm")
            simulated.ampm = time.ampm === "AM" ? "PM" : "AM";
          return simulated;
        };

        const nextUp = getNextSimulated(1);
        const nextDown = getNextSimulated(-1);

        return (
          <div className="flex flex-col items-center" key={part}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateFn(part, 1)}
              disabled={!isValidTime(nextUp)}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <div className="text-lg font-medium">
              {part === "ampm" ? time.ampm : pad(time[part])}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateFn(part, -1)}
              disabled={!isValidTime(nextDown)}
              className={!isValidTime(nextDown) ? "opacity-40 cursor-not-allowed" : ""}
            >
              <ChevronDown
                className={`w-4 h-4 ${!isValidTime(nextDown) ? "text-gray-400" : ""}`}
              />
            </Button>
          </div>
        );
      })}
    </Card>
  );

  return (
    <div className="flex gap-4">
      {renderTimeCard(localStartTime, (type, delta) =>
        updateTime(type, delta, localStartTime, setLocalStartTime)
      )}
      {renderTimeCard(localEndTime, (type, delta) =>
        updateTime(type, delta, localEndTime, setLocalEndTime, true)
      )}
    </div>
  );
};

export default TimePicker;
