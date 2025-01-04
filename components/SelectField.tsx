import { Select, SelectItem } from "./ui/select";

interface SelectFieldProps {
  options: string[];
  name: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ options, name }) => {
  return (
    <Select name={name}>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectField;
