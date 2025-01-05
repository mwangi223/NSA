// formTypes.ts
export type FormData = {
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: "Male" | "Female" | "Other";
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    identificationDocument?: File[];
  };
  