import { Control } from "react-hook-form";
import { FormFieldType } from "@/types";
import CustomFormField from "@/components/CustomFormField";
import { Label } from "@/components/ui/label";

const IdentificationSection = ({ control }: { control: Control }) => (
  <section className="space-y-6">
    <div className="mb-9 space-y-1">
      <h2 className="sub-header">Identification and Verification</h2>
    </div>

    <div>
      <Label htmlFor="identificationType">Identification Type</Label>
      <CustomFormField id="identificationType" fieldType={FormFieldType.SELECT} control={control} name="identificationType" placeholder="Select identification type" />
    </div>
    <div>
      <Label htmlFor="identificationNumber">Identification Number</Label>
      <CustomFormField id="identificationNumber" fieldType={FormFieldType.INPUT} control={control} name="identificationNumber" placeholder="1234567890" />
    </div>
  </section>
);

export default IdentificationSection;
