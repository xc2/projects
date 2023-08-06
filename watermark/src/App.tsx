import {
  Checkbox,
  Combobox,
  Field,
  Input,
  Option,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  Textarea,
} from "@fluentui/react-components";

export function App() {
  return (
    <div className="flex-row space-y-3">
      <h1 className="text-2xl pl-3 pr-3 pt-6">Make watermark</h1>
      <div className="pl-3 pr-3 ">
        <Field label="Input">
          <Input />
        </Field>
        <Field label="Textarea">
          <Textarea />
        </Field>
        <Field label="Combobox">
          <Combobox>
            <Option>Option 1</Option>
            <Option>Option 2</Option>
            <Option>Option 3</Option>
          </Combobox>
        </Field>
        <Field label="SpinButton">
          <SpinButton />
        </Field>
        <Field hint="Checkboxes use their own label instead of the Field label.">
          <Checkbox label="Checkbox" />
        </Field>
        <Field label="Slider">
          <Slider defaultValue={25} />
        </Field>
        <Field label="Switch">
          <Switch />
        </Field>
        <Field label="RadioGroup">
          <RadioGroup>
            <Radio label="Option 1" />
            <Radio label="Option 2" />
            <Radio label="Option 3" />
          </RadioGroup>
        </Field>
      </div>
    </div>
  );
}
