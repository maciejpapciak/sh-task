import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PersonalFormData } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createPersonalFormData = (
  formData: PersonalFormData
): FormData => {
  const submitData = new FormData();
  submitData.append("firstName", formData.firstName);
  submitData.append("lastName", formData.lastName);
  submitData.append("dateOfBirth", formData.dateOfBirth);
  submitData.append("addressLine1", formData.addressLine1);
  if (formData.addressLine2) {
    submitData.append("addressLine2", formData.addressLine2);
  }
  submitData.append("zipCode", formData.zipCode);
  submitData.append("country", formData.country);
  submitData.append("region", formData.region);
  submitData.append("city", formData.city);
  if (formData.photo1) submitData.append("photo1", formData.photo1);
  if (formData.photo2) submitData.append("photo2", formData.photo2);

  return submitData;
};
