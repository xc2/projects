import { Button, FieldControlProps } from "@fluentui/react-components";
import { ChangeEventHandler } from "react";

export interface UploadProps extends FieldControlProps {
  onChange: (file: File) => any;
}
export function Upload({ id, onChange, ...controlProps }: UploadProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.currentTarget.files || [];
    onChange(file);
    e.currentTarget.value = "";
  };
  return (
    <div>
      <Button
        {...controlProps}
        // @ts-ignore
        as="label"
        htmlFor={id}
      >
        Upload
        <input
          id={id}
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </Button>
    </div>
  );
}
