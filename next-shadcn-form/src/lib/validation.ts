import { PersonalFormData } from "./schemas";

export interface FormErrors {
  [key: string]: string;
}

export const isAtLeastEighteen = (date: string) => {
  const birthDate = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

/**
 * Validates image dimensions to ensure they are between 512x512 and 1024x1024 pixels
 */
export const validateImageDimensions = ({
  file,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
}: {
  file: File;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const { width, height } = img;
      const isValidSize =
        width >= minWidth &&
        height >= minHeight &&
        width <= maxWidth &&
        height <= maxHeight;
      resolve(isValidSize);
    };
    img.onerror = () => resolve(false);
    img.src = URL.createObjectURL(file);
  });
};
