// components/RadioGroupField.tsx
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface RadioGroupFieldProps {
  options: string[];
  name: string;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ options, name }) => {
  return (
    <RadioGroup name={name}>
      {options.map((option) => (
        <div key={option} className="radio-group">
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option} className="cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupField;
