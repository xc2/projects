import {
  ControllerRenderProps,
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import {
  Field,
  FieldControlProps,
  FieldProps,
} from "@fluentui/react-components";
import { ReactNode, ComponentType, useCallback } from "react";

export function createFieldComponent<
  TFieldValues extends FieldValues = FieldValues,
>() {
  return HookField as typeof _HookField;

  function _HookField<
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >({ children, ...props }: HookFieldProps<TFieldValues, TName>) {
    return <HookField {...props}>{children}</HookField>;
  }
}

export interface HookFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName>,
    Omit<FieldProps, "children" | "defaultValue"> {
  children: (
    controlProps: FieldControlProps &
      ControllerRenderProps<TFieldValues, TName>,
  ) => ReactNode;
}

export function HookField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  children,
  ...fieldProps
}: HookFieldProps<TFieldValues, TName>) {
  const { field, fieldState, formState } = useController({
    name,
    control,
    shouldUnregister,
    rules,
    defaultValue,
  });
  const { isDirty, isTouched, invalid, error } = fieldState;

  const onChange = useCallback(
    (e: any, data?: any) => field.onChange(data ? data.value : e),
    [field.onChange],
  );
  return (
    <Field
      {...fieldProps}
      validationMessage={error?.message}
      validationState={invalid ? "error" : "none"}
    >
      {(fieldControlProps) =>
        children({
          ...fieldControlProps,
          ...field,
          onChange,
        })
      }
    </Field>
  );
}
