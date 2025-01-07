"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import classNames from "classnames";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment, Status } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldType } from "@/types";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";

/**
 * AppointmentForm Component
 * @param userId - ID of the user creating the appointment
 * @param patientId - ID of the patient for whom the appointment is being created
 * @param type - Type of form (create, schedule, cancel)
 * @param appointment - Existing appointment data (optional)
 * @param setOpen - Function to toggle modal visibility (optional)
 */

// Utility function for determining status
const determineStatus = (type: string): Status => {
  switch (type) {
    case "schedule":
      return "scheduled";
    case "cancel":
      return "cancelled";
    default:
      return "pending";
  }
};

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const { primaryPhysician, schedule, reason, note, cancellationReason } =
    appointment || {};

  const form: UseFormReturn<z.infer<typeof AppointmentFormValidation>> =
    useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: primaryPhysician || "",
        schedule: schedule ? new Date(schedule) : new Date(Date.now()),
        reason: reason || "",
        note: note || "",
        cancellationReason: cancellationReason || "",
      },
    });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ): Promise<void> => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const status = determineStatus(type); // Use the utility function here

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else if (appointment) {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id!,
          timeZone,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error: any) {
      if (error.message.includes("Network")) {
        toast.error("Network error: Please check your connection.");
      } else if (error.message.includes("Validation")) {
        toast.error("Validation error: Please correct the highlighted fields.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const renderFormFields = () => {
    if (type === "cancel") {
      return (
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Urgent meeting came up"
        />
      );
    }

    return (
      <>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Select a doctor"
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

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyyy  -  h:mm aa"
        />

        <div
          className={`flex flex-col gap-6 ${
            type === "create" && "xl:flex-row"
          }`}
        >
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Appointment reason"
            placeholder="Annual monthly check-up"
            disabled={type === "schedule"}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Comments/notes"
            placeholder="Prefer afternoon appointments, if possible"
            disabled={type === "schedule"}
          />
        </div>
      </>
    );
  };

  const formFields = useMemo(() => renderFormFields(), [type, form.control]);

  const buttonLabels: Record<string, string> = {
    cancel: "Cancel Appointment",
    schedule: "Schedule Appointment",
    create: "Submit Appointment",
  };

  const buttonLabel = buttonLabels[type];

  const buttonClass = classNames({
    "shad-danger-btn w-full": type === "cancel",
    "shad-primary-btn w-full": type !== "cancel",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {formFields}

        <SubmitButton
          isLoading={form.formState.isSubmitting}
          className={buttonClass}
          aria-label={buttonLabel}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
