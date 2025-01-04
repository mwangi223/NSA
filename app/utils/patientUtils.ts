// utils/patientUtils.ts
export const createPatientObject = (
    values: z.infer<typeof PatientFormValidation>,
    user: User
  ) => ({
    userId: user.$id,
    name: values.name,
    email: values.email,
    phone: values.phone,
    birthDate: new Date(values.birthDate),
    gender: values.gender,
    address: values.address,
    occupation: values.occupation,
    emergencyContactName: values.emergencyContactName,
    emergencyContactNumber: values.emergencyContactNumber,
    primaryPhysician: values.primaryPhysician,
    insuranceProvider: values.insuranceProvider,
    insurancePolicyNumber: values.insurancePolicyNumber,
    allergies: values.allergies,
    currentMedication: values.currentMedication,
    familyMedicalHistory: values.familyMedicalHistory,
    pastMedicalHistory: values.pastMedicalHistory,
    identificationType: values.identificationType,
    identificationNumber: values.identificationNumber,
    identificationDocument: values.identificationDocument?.[0], // Handle file if exists
    privacyConsent: values.privacyConsent,
  });
  