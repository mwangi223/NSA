// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, CustomFormField } from "@/components/ui/form"; // Combined import
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { createPatientObject } from "@/utils/patientUtils";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import FileUploader from "../FileUploader";
import { FormFieldType } from "@/types";
import SubmitButton from "../SubmitButton";
import { RegisterUserParams } from "@/types/appwrite.types";
import { User } from "@/types/index.d";

// Import reusable components
import RadioGroupField from "@/components/RadioGroupField";
import SelectField from "@/components/SelectField";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    try {
      const patient = createPatientObject(values, user); // Create the patient object

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        console.error("Failed to create new patient. Check the API.");
      }
    } catch (error: any) {
      console.error(
        "Error during patient registration:",
        error.message || error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}
          <div>
            <Label htmlFor="name">Name</Label>
            <CustomFormField
              id="name"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder="John Doe"
            />
          </div>

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="email">Email address</Label>
              <CustomFormField
                id="email"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                placeholder="johndoe@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <CustomFormField
                id="phone"
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="birthDate">Date of birth</Label>
              <CustomFormField
                id="birthDate"
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
              />
            </div>

            {/* Gender Radio Group */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <FormControl>
                <RadioGroupField options={GenderOptions} name="gender" />
              </FormControl>
            </div>
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="address">Address</Label>
              <CustomFormField
                id="address"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                placeholder="14th street, Eldoret, Eld - 1001"
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <SelectField
                id="occupation"
                options={["Software Engineer", "Doctor", "Teacher", "Artist"]}
                name="occupation"
              />
            </div>
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="emergencyContactName">
                Emergency contact name
              </Label>
              <CustomFormField
                id="emergencyContactName"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                placeholder="Guardian's name"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactNumber">
                Emergency contact number
              </Label>
              <CustomFormField
                id="emergencyContactNumber"
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                placeholder="(254) 723-4567890"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <div>
            <Label htmlFor="primaryPhysician">Primary care physician</Label>
            <CustomFormField
              id="primaryPhysician"
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              placeholder="Select a physician"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="insuranceProvider">Insurance provider</Label>
              <CustomFormField
                id="insuranceProvider"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                placeholder="SHIF"
              />
            </div>
            <div>
              <Label htmlFor="insurancePolicyNumber">
                Insurance policy number
              </Label>
              <CustomFormField
                id="insurancePolicyNumber"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                placeholder="ABC123456789"
              />
            </div>
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="allergies">Allergies (if any)</Label>
              <CustomFormField
                id="allergies"
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                placeholder="Peanuts, Penicillin, Pollen"
              />
            </div>
            <div>
              <Label htmlFor="currentMedication">Current medications</Label>
              <CustomFormField
                id="currentMedication"
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                placeholder="Ibuprofen 200mg, Paracetamol 500mg"
              />
            </div>
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <Label htmlFor="familyMedicalHistory">
                Family medical history (if relevant)
              </Label>
              <CustomFormField
                id="familyMedicalHistory"
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                placeholder="Mother had brain cancer, Father has hypertension"
              />
            </div>
            <div>
              <Label htmlFor="pastMedicalHistory">Past medical history</Label>
              <CustomFormField
                id="pastMedicalHistory"
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <div>
            <Label htmlFor="identificationType">Identification Type</Label>
            <CustomFormField
              id="identificationType"
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              placeholder="Select identification type"
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          <div>
            <Label htmlFor="identificationNumber">Identification Number</Label>
            <CustomFormField
              id="identificationNumber"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              placeholder="1234567890"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Upload Profile Image</h2>
          </div>
          <FileUploader
            name="profileImage"
            control={form.control}
            label="Upload your profile picture"
          />
        </section>

        <section className="flex justify-end gap-2 pt-8">
          <SubmitButton isLoading={isLoading} children={undefined} />
        </section>
      </form>
    </Form>
  );
};

export default RegisterForm;
