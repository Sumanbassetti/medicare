import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Appointment, Time } from "../types";
import { minutesToTime, pad, parseTime, timeToMinutes } from "../utils/shared";

type TimePart = "hour" | "minute" | "ampm";
type Delta = number | string;

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
    minute: 0,
    ampm: "AM",
  });

  const [localEndTime, setLocalEndTime] = useState<Time>({
    hour: 12,
    minute: 30,
    ampm: "AM",
  });

  const [isEndManuallyChanged, setIsEndManuallyChanged] = useState(false);

  const isTimeRangeBooked = (
    start: Time,
    end: Time,
    dateStr: string
  ): boolean => {
    const startMins = timeToMinutes(start);
    const endMins = timeToMinutes(end);

    return appointments.some((app) => {
      if (app.date !== dateStr) return false;
      const appStart = timeToMinutes(parseTime(app.startTime));
      const appEnd = timeToMinutes(parseTime(app.endTime));
      return (
        (startMins >= appStart && startMins < appEnd) ||
        (endMins > appStart && endMins <= appEnd) ||
        (startMins <= appStart && endMins >= appEnd)
      );
    });
  };

  // Auto-update end time when start changes (unless manually changed)
  useEffect(() => {
    if (!isEndManuallyChanged) {
      const newEnd = minutesToTime(timeToMinutes(localStartTime) + 30);
      setLocalEndTime(newEnd);
    }
  }, [localStartTime, isEndManuallyChanged]);

  // Send selected times to parent in string format
  useEffect(() => {
    const formatTime = (t: Time) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;
    setStartTime(formatTime(localStartTime));
  }, [localStartTime]);

  useEffect(() => {
    const formatTime = (t: Time) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;
    setEndTime(formatTime(localEndTime));
  }, [localEndTime]);

  const blocked = isTimeRangeBooked(localStartTime, localEndTime, selectedDate);

  useEffect(() => {
    setIsBooked(blocked);
  }, [blocked]);

  const updateTime = (
    type: TimePart,
    delta: Delta,
    time: Time,
    setTime: React.Dispatch<React.SetStateAction<Time>>,
    setManualChange?: () => void
  ) => {
    setTime((prev) => {
      let { hour, minute, ampm } = prev;
      if (type === "hour")
        hour = ((hour + (delta as number) - 1 + 12) % 12) + 1;
      if (type === "minute") minute = (minute + (delta as number) + 60) % 60;
      if (type === "ampm") ampm = ampm === "AM" ? "PM" : "AM";
      return { hour, minute, ampm };
    });
    if (setManualChange) setManualChange();
  };

  const renderTimeCard = (time: Time, updateFn: any, isDisabled: boolean) => (
    <Card
      className={`w-64 h-[130px] flex flex-row justify-between items-center gap-2 p-4 rounded-xl shadow-sm border transition-all ${
        isDisabled ? "text-gray-400 line-through" : ""
      }`}
    >
      {(["hour", "minute", "ampm"] as const).map((part) => (
        <div className="flex flex-col items-center" key={part}>
          <Button variant="ghost" size="icon" onClick={() => updateFn(part, 1)}>
            <ChevronUp className="w-4 h-4" />
          </Button>
          <div className="text-lg font-medium">
            {part === "ampm" ? time.ampm : pad(time[part])}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateFn(part, -1)}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </Card>
  );

  return (
    <div className="flex gap-4">
      {renderTimeCard(
        localStartTime,
        (type: TimePart, delta: Delta) =>
          updateTime(type, delta, localStartTime, setLocalStartTime),
        blocked
      )}
      {renderTimeCard(
        localEndTime,
        (type: TimePart, delta: Delta) =>
          updateTime(type, delta, localEndTime, setLocalEndTime, () =>
            setIsEndManuallyChanged(true)
          ),
        blocked
      )}
    </div>
  );
};

export default TimePicker;
