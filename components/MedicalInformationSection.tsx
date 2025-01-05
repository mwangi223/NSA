import { Control } from "react-hook-form";
import { FormData } from "@/types/formTypes";
import { FormFieldType } from "@/types";
import CustomFormField from "@/components/CustomFormField";
import { Label } from "@/components/ui/label";

const MedicalInformationSection = ({
  control,
}: {
  control: Control<FormData>;
}) => (
  <section className="space-y-6">
    <div className="mb-9 space-y-1">
      <h2 className="sub-header">Medical Information</h2>
    </div>

    <div>
      <Label htmlFor="primaryPhysician">Primary care physician</Label>
      <CustomFormField
        id="primaryPhysician"
        fieldType={FormFieldType.SELECT}
        control={control}
        name="primaryPhysician"
        placeholder="Select a physician"
      />
    </div>

    <div className="flex flex-col gap-6 xl:flex-row">
      <div>
        <Label htmlFor="insuranceProvider">Insurance provider</Label>
        <CustomFormField
          id="insuranceProvider"
          fieldType={FormFieldType.INPUT}
          control={control}
          name="insuranceProvider"
          placeholder="SHIF"
        />
      </div>
      <div>
        <Label htmlFor="insurancePolicyNumber">Insurance policy number</Label>
        <CustomFormField
          id="insurancePolicyNumber"
          fieldType={FormFieldType.INPUT}
          control={control}
          name="insurancePolicyNumber"
          placeholder="ABC123456789"
        />
      </div>
    </div>
  </section>
);

export default MedicalInformationSection;
