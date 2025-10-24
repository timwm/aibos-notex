import type React from "react";

import { ReactNode, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { EyeOpen, EyeClosed } from "~/components/icons";
import { Button } from "./ui/button";

type MInputProps<T extends FieldValues> = {
  control: Control<T>;
  fieldName: FieldPath<T>;
  icon?: ReactNode;
  showPasswordToggle?: boolean;
} & React.ComponentProps<typeof Input>;

export default function MInput<T extends FieldValues>({
  control,
  fieldName,
  icon,
  showPasswordToggle = false,
  ...inputProps
}: MInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="group focus-within:ring-2-focus-within:ring-notex-text relative flex items-center gap-0 overflow-hidden rounded-xl transition-all">
              {icon && (
                <div className="bg-notex-accent group-focus-within:bg-notex-text flex size-14 shrink-0 items-center justify-center transition-all">
                  {icon}
                </div>
              )}
              <Input
                {...field}
                className={`text-notex-text not-placeholder-shown:border-notex-accent hover:border-notex-accent focus-visible:border-notex-text h-14 flex-1 rounded-l-none rounded-r-xl border-2 border-l-0 border-transparent bg-gray-100/80 px-4 font-bold transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 ${showPasswordToggle ? "pr-8" : ""}`}
                {...inputProps}
                {...((showPasswordToggle && {
                  type: showPassword ? "text" : "password",
                }) ||
                  {})}
              />
              {showPasswordToggle && (
                <Button
                  className="hover:text-notex-text group-focus-within:text-notex-text not-placeholder-shown:text-notex-accent absolute top-0 right-0 h-full hover:bg-transparent"
                  // disabled={disabled}
                  size="sm"
                  tabIndex={-1}
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeClosed aria-hidden="true" className="h-6 w-6" />
                  ) : (
                    <EyeOpen aria-hidden="true" className="h-6 w-6" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-start" />
        </FormItem>
      )}
    />
  );
}
