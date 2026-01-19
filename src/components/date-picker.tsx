"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


export type DatePickerRef = {
    reset: () => void;
};

type DatePickerProps = {
    id: string;
    name: string;
    defaultValue?: string | undefined;
    ref: React.RefObject<DatePickerRef>;
};

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(({ id, name, defaultValue }, ref) => {
    const [date, setDate] = useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : new Date()
    );

    useImperativeHandle(ref, () => ({
        reset: () => {
            setDate(undefined);
        }
    }))

    const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

    return (
        <Popover>
            <PopoverTrigger id={id} className="w-full" asChild>
                <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                >
                    <LucideCalendar className="mr-2 h-4 w-4" />
                    {formattedStringDate}
                    <input type="hidden" name={name} value={formattedStringDate} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
});

DatePicker.displayName = "DatePicker";

export { DatePicker };