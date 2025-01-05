"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientFormDefaultValues } from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { createPatientObject } from "@/lib/utils";
import { FormData } from "@/types/formTypes";

import PersonalInformationSection from "@/components/PersonalInformationSection";
import MedicalInformationSection from "@/components/MedicalInformationSection";
import IdentificationSection from "@/components/IdentificationSection";
import ProfileImageUploader from "@/components/ProfileImageUploader";
import SubmitSection from "@/components/SubmitSection";

import { User } from "@/types/index.d";
import { Form } from "../ui/form";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      const patient = createPatientObject(values, user);
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

        <PersonalInformationSection control={form.control} />
        <MedicalInformationSection control={form.control} />
        <IdentificationSection control={form.control} />
        <ProfileImageUploader control={form.control} />
        <SubmitSection isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default RegisterForm;
