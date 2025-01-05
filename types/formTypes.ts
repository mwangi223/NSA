import { z } from "zod";
import { PatientFormValidation } from "@/lib/validation"; // Import the validation schema

export type FormData = z.infer<typeof PatientFormValidation>;
