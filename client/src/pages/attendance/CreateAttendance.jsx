import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import AppLayout from "../../_components/layout/AppLayout";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { class_names, periods, sections, subjects } from "../../constants/data";
import { useAttendanceSheet } from "../../hooks/attendance/api";

const formSchema = z.object({
  class_name: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  period: z.string().min(1, "Period is required"),
  date: z.date().optional(),
});

const CreateAttendance = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class_name: "",
      section: "",
      period: "",
      date: new Date(),
    },
  });

  const { getAttendanceSheet, loading, data, error } = useAttendanceSheet();

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    const res = await getAttendanceSheet(
      data.class_name,
      data.section,
      data.period,
      data.date
    );
    if (res) {
      toast.success("Attendance sheet generated successfully");
    }
  };

  return (
    <AppLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md p-4 w-full"
        >
          <div className="flex flex-nowrap gap-4 justify-between w-full ">
            {/* Class Name */}
            <FormField
              control={form.control}
              name="class_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Class</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full py-5 font-semibold rounded-lg border border-gray-300
                       focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
                      >
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {class_names.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Section */}
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Section</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Period */}
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Period</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {periods.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Subject</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker (Optional) */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left py-5 font-semibold rounded-lg border border-gray-300"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select date (optional)"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()} // optional: prevent future dates
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-black h-fit text-white px-4 py-2 rounded"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </AppLayout>
  );
};

export default CreateAttendance;
