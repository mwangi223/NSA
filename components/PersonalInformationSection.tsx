import { Control } from "react-hook-form";
import { FormData } from "@/types/formTypes";
import { FormFieldType } from "@/types";
import CustomFormField from "@/components/CustomFormField";
import RadioGroupField from "@/components/RadioGroupField";
import { GenderOptions } from "@/constants";
import { Label } from "@/components/ui/label";

const PersonalInformationSection = ({ control }: { control: Control<FormData> }) => (
  <section className="space-y-6">
    <div className="mb-9 space-y-1">
      <h2 className="sub-header">Personal Information</h2>
    </div>

    <div>
      <Label htmlFor="name">Name</Label>
      <CustomFormField id="name" fieldType={FormFieldType.INPUT} control={control} name="name" placeholder="John Doe" />
    </div>

    <div className="flex flex-col gap-6 xl:flex-row">
      <div>
        <Label htmlFor="email">Email address</Label>
        <CustomFormField id="email" fieldType={FormFieldType.INPUT} control={control} name="email" placeholder="johndoe@gmail.com" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <CustomFormField id="phone" fieldType={FormFieldType.PHONE_INPUT} control={control} name="phone" placeholder="(555) 123-4567" />
      </div>
    </div>

    <div className="flex flex-col gap-6 xl:flex-row">
      <div>
        <Label htmlFor="birthDate">Date of birth</Label>
        <CustomFormField id="birthDate" fieldType={FormFieldType.DATE_PICKER} control={control} name="birthDate" />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <RadioGroupField options={GenderOptions} name="gender" />
      </div>
    </div>
  </section>
);

export default PersonalInformationSection;
