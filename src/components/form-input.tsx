import type React from "react";

import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

type MInputProps<T extends FieldValues> = {
  control: Control<T>;
  fieldName: FieldPath<T>;
  icon?: ReactNode;
} & React.ComponentProps<typeof Input>;

export default function MInput<T extends FieldValues>({
  control,
  fieldName,
  icon,
  ...inputProps
}: MInputProps<T>) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="group focus-within:ring-2-focus-within:ring-notex-text flex items-center gap-0 overflow-hidden rounded-xl transition-all">
              {icon && (
                <div className="bg-notex-accent group-focus-within:bg-notex-text flex size-14 shrink-0 items-center justify-center transition-all">
                  {icon}
                </div>
              )}
              <Input
                {...field}
                className="text-notex-text hover:border-notex-accent focus-visible:border-notex-text h-14 flex-1 rounded-l-none rounded-r-xl border-2 border-l-0 border-transparent bg-gray-100/80 px-4 font-bold transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
                {...inputProps}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
