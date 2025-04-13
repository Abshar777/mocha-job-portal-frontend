"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useState, useRef, useEffect } from "react";
import type { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { CiCalendarDate as CalendarIcon } from "react-icons/ci";
import { HiClock as Clock } from "react-icons/hi";
import { IoCloudUploadOutline as UploadIcon } from "react-icons/io5";
import DownArrow from "@/components/icons/downArrow";
import AnimatedButton from "@/components/animation/animatedButton";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local";
  inputType:
    | "select"
    | "input"
    | "textarea"
    | "checkbox"
    | "date"
    | "time"
    | "switch"
    | "upload"
    | "selectv2";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  lines?: number;
  field: ControllerRenderProps<any, any>;
  className?: {
    label?: string;
    input?: string;
    icon?: string;
    error?: string;
    main?: string;
    button?: string;
  };
  errors: FieldErrors<any>;
  showError?: boolean;
  Icon?: IconType;
  maxLength?: number;
  checked?: boolean;
  dateFormat?: string;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  buttonText?: string;
  min?: number;
  max?: number;
  minLength?: number;
};

const FormGeneratorV2 = ({
  inputType,
  options,
  label,
  placeholder = "",
  type,
  lines,
  field,
  errors,
  className,
  showError = true,
  checked,
  Icon,
  maxLength,
  dateFormat,
  acceptedFileTypes = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxFileSize = 5, // 5MB default
  buttonText = "Upload",
  minLength,
  min,
  max,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [Type, setType] = useState<string>(type || "text");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(field.value || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isOpen]);


  switch (inputType) {
    case "input":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col  gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl className="flex relative items-center justify-end">
              <div className="flex relative items-center justify-end">
                {Icon && (
                  <Icon
                    className={cn(
                      "absolute text-sm left-2 text-white",
                      className?.icon
                    )}
                  />
                )}{" "}
                <Input
                  min={min}
                  max={max}
                  minLength={minLength}
                  maxLength={maxLength}
                  id={`input-${label}`}
                  type={Type}
                  placeholder={placeholder}
                  className={cn(
                    `bg-foreground text-secondary px-[1.7rem] ${
                      errors[field.name] && "errInput"
                    } flex-1`,
                    className?.input
                  )}
                  {...field}
                />
                {type == "password" && (
                  <i
                    onClick={() => {
                      setShow(!show);
                      Type == "password"
                        ? setType("text")
                        : setType("password");
                    }}
                    className={`cursor-pointer text-secondary ${
                      show ? "ri-eye-close-line" : "ri-eye-2-line"
                    } absolute me-2`}
                  ></i>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      );
    case "select":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <div className="relative flex items-center">
                  {Icon && (
                    <Icon
                      className={cn(
                        "absolute text-sm left-2 text-white",
                        className?.icon
                      )}
                    />
                  )}{" "}
                  <SelectTrigger
                    className={cn(
                      `bg-foreground  ps-[1.7rem] text-secondary ${
                        errors[field.name] && "errInput"
                      }`,
                      className?.input
                    )}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </div>
                <SelectContent className="bg-background/80">
                  {options?.map((option, i) => (
                    <SelectItem
                      className="text-white focus:bg-primary  cursor-pointer focus:text-white  rounded-lg"
                      key={option.id}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-700" />
          </div>
        </FormItem>
      );

    case "selectv2":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl>
              <div className="w-full">
                <div className="relative w-full">
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <div className="relative w-full flex items-center">
                      {Icon && (
                        <Icon
                          className={cn(
                            "absolute text-sm left-2 text-white z-10",
                            className?.icon
                          )}
                        />
                      )}
                      <PopoverTrigger asChild>
                        <Input
                          ref={ref}
                          type="text"
                          placeholder={placeholder}
                          className={cn(
                            `bg-foreground ps-[1.7rem] text-secondary ${
                              errors[field.name] && "errInput"
                            }`,
                            className?.input
                          )}
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setTimeout(() => {
                              if (!isOpen) setIsOpen(true);
                            }, 1000);
                          }}
                        />
                      </PopoverTrigger>
                      <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute right-2"
                      >
                        <DownArrow className="h-4 w-4 z-10 cursor-pointer" />
                      </div>
                    </div>

                    <PopoverContent
                      className="p-0 w-[var(--radix-popover-trigger-width)] bg-background/80 backdrop-blur-md border rounded-md shadow-lg max-h-60 overflow-hidden"
                      align="start"
                    >
                      <ScrollArea className="max-h-60">
                        <div className="flex flex-col gap-2 max-h-60 p-1">
                          {options
                            ?.filter((option) =>
                              option.label
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                            .map((option) => (
                              <div
                                key={option.id}
                                className="px-4 py-1.5 text-white text-sm hover:bg-primary hover:text-white cursor-pointer rounded-lg"
                                onClick={() => {
                                  field.onChange(option.value);
                                  setSearchTerm(option.label);
                                  setIsOpen(false);
                                }}
                              >
                                {option.label}
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                      {options?.filter((option) =>
                        option.label
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ).length === 0 && (
                        <div className="px-4 text-sm py-1 text-white">
                          No results found
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage className="text-red-700" />
              </div>
            </FormControl>
          </div>
        </FormItem>
      );

    case "textarea":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-start">
                {Icon && (
                  <Icon
                    className={cn(
                      "absolute text-sm left-2 top-3 text-white",
                      className?.icon
                    )}
                  />
                )}
                <Textarea
                  id={`textarea-${label}`}
                  placeholder={placeholder}
                  rows={lines || 4}
                  maxLength={maxLength}
                  className={cn(
                    `bg-foreground px-[1.7rem] rounded-xl text-secondary resize-none ${
                      errors[field.name] && "errInput"
                    }`,
                    className?.input
                  )}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      );
    case "checkbox":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex items-start gap-2 text-background/80",
              className?.main
            )}
          >
            <FormControl>
              <Checkbox
                id={`checkbox-${label}`}
                checked={checked}
                className={cn(
                  `bg-foreground data-[state=checked]:bg-primary ${
                    errors[field.name] && "border-red-500"
                  }`,
                  className?.input
                )}
                {...field}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel
                htmlFor={`checkbox-${label}`}
                className={cn(
                  "font-medium text-sm cursor-pointer",
                  className?.label
                )}
              >
                {label}
                {label && <span className="text-primary">*</span>}
              </FormLabel>
              <FormMessage />
            </div>
          </div>
        </FormItem>
      );
    case "date":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <Popover>
              <FormControl>
                <div className="relative w-full flex items-center justify-end">
                  {Icon ? (
                    <Icon
                      className={cn(
                        "absolute text-sm left-2 text-white",
                        className?.icon
                      )}
                    />
                  ) : (
                    <CalendarIcon className="absolute text-sm left-2 text-white" />
                  )}
                  <Input
                    type="text"
                    placeholder={dateFormat || "dd-mm-yyyy"}
                    className={cn(
                      `w-full h-12  text-sm px-[1.7rem] py-3 text-left font-normal bg-foreground text-secondary rounded-2xl border ${
                        errors[field.name] && "border-red-500"
                      }`,
                      className?.input
                    )}
                    value={field.value || ""}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");

                      if (value.length > 8) return;

                      if (value.length > 4)
                        value = `${value.slice(0, 2)}-${value.slice(
                          2,
                          4
                        )}-${value.slice(4)}`;
                      else if (value.length > 2) {
                        value = `${value.slice(0, 2)}-${value.slice(2)}`;
                      }

                      field.onChange(value);
                    }}
                  />
                  <PopoverTrigger>
                    <DownArrow className="h-4 w-4 z-10 -translate-y-1.5 cursor-pointer absolute right-2" />
                  </PopoverTrigger>
                </div>
              </FormControl>
              <PopoverContent className="w-auto p-0" align="end">
                <>
                  <Calendar
                    className=" "
                    mode="single"
                    selected={
                      field.value
                        ? (() => {
                            const [day, month, year] = field.value.split("-");
                            return new Date(+year, +month - 1, +day);
                          })()
                        : undefined
                    }
                    onSelect={(e) => {
                      field.onChange(
                        format(e as Date, dateFormat || "dd-MM-yyyy")
                      );
                    }}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </div>
        </FormItem>
      );

    case "time":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-center justify-end">
                {Icon ? (
                  <Icon
                    className={cn(
                      "absolute text-sm left-2  text-white",
                      className?.icon
                    )}
                  />
                ) : (
                  <Clock className="absolute text-sm left-2  text-muted-foreground" />
                )}
                <Input
                  type="time"
                  id={`time-${label}`}
                  className={cn(
                    `bg-foreground text-secondary pl-8 ${
                      errors[field.name] && "errInput"
                    }`,
                    className?.input
                  )}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      );

    case "switch":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex items-center gap-2 text-background/80",
              className?.main
            )}
          >
            <FormControl>
              <Switch
                checked={checked}
                id={`switch-${label}`}
                className={cn(
                  `data-[state=checked]:bg-primary ${
                    errors[field.name] && "border-red-500"
                  }`,
                  className?.input
                )}
                {...field}
              />
            </FormControl>
            <FormLabel
              htmlFor={`switch-${label}`}
              className={cn(
                "font-medium text-sm cursor-pointer",
                className?.label
              )}
            >
              {label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      );

    case "upload":
      return (
        <FormItem className={className?.main}>
          <div
            className={cn(
              "flex flex-col gap-2 text-background/80",
              className?.main
            )}
          >
            <FormLabel
              className={cn(
                "flex font-semibold items-center gap-1",
                className?.label
              )}
            >
              {label && label}
              {label && <span className="text-primary">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-center justify-end">
                {Icon ? (
                  <Icon
                    className={cn(
                      "text-sm absolute left-2 text-white",
                      className?.icon
                    )}
                  />
                ) : (
                  <UploadIcon className="text-sm absolute left-2 text-white" />
                )}
                <div
                  className={cn(
                    `bg-foreground  items-center justify-between  flex h-12 w-full rounded-2xl  border border-input   text-sm  shadow-sm transition-colors text-secondary ps-[1.8rem] ${
                      errors[field.name] && "errInput"
                    } flex-1`,
                    className?.input
                  )}
                >
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="truncate max-w-[200px]">
                      {fileName || placeholder || "No file selected"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id={`upload-${label}`}
                    accept={acceptedFileTypes}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Check file size (convert maxFileSize from MB to bytes)
                        if (file.size > maxFileSize * 1024 * 1024) {
                          alert(`File size must be less than ${maxFileSize}MB`);
                          e.target.value = "";
                          return;
                        }
                        setFileName(file.name);
                        field.onChange(file);
                      }
                    }}
                  />
                </div>
                <AnimatedButton
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "bg-white absolute w-3 shadow-[0_0_13px_0_#ffffff59] md:text-sm text-xs text-black hover:bg-gray-200 rounded-2xl px-8 py-4",
                    className?.button
                  )}
                  isLoading={false}
                  text={field.value ? "Change" : buttonText}
                />
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      );

    default:
      return null;
  }
};

export default FormGeneratorV2;
