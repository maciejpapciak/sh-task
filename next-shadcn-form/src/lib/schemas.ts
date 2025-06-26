import * as z from "zod/v4";
import { isAtLeastEighteen, validateImageDimensions } from "./validation";

const fileSchema = z
  .file({ error: "Plik jest wymagany" })
  .mime(["image/jpeg", "image/png", "image/webp"], {
    error: "Dozwolone są tylko pliki JPEG, PNG lub WebP",
  })
  .max(2 * 1024 * 1024, {
    error: "Rozmiar pliku nie może przekraczać 2MB",
  })
  .refine(
    async (file) =>
      await validateImageDimensions({
        file,
        minWidth: 512,
        minHeight: 512,
        maxWidth: 1024,
        maxHeight: 1024,
      }),
    { error: "Wymiary obrazu muszą być między 512x512 a 1024x1024 pikseli" }
  );

const POLISH_ENGLISH_CHARACTERS_REGEX = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/;

export const formSchema = z.object({
  firstName: z
    .string({ error: "Imię jest wymagane" })
    .min(2, { error: "Imię musi mieć co najmniej 2 znaki" })
    .max(40, { error: "Imię nie może mieć więcej niż 40 znaków" })
    .regex(POLISH_ENGLISH_CHARACTERS_REGEX, {
      error: "Imię może zawierać tylko polskie i angielskie litery oraz spacje",
    }),

  lastName: z
    .string({ error: "Nazwisko jest wymagane" })
    .min(2, { error: "Nazwisko musi mieć co najmniej 2 znaki" })
    .max(40, { error: "Nazwisko nie może mieć więcej niż 40 znaków" })
    .regex(POLISH_ENGLISH_CHARACTERS_REGEX, {
      error:
        "Nazwisko może zawierać tylko polskie i angielskie litery oraz spacje",
    }),

  dateOfBirth: z
    .string({ error: "Data urodzenia jest wymagana" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      error: "Data urodzenia musi być w formacie YYYY-MM-DD",
    })
    .refine(isAtLeastEighteen, {
      error: "Musisz mieć co najmniej 18 lat",
    }),

  addressLine1: z
    .string({ error: "Adres jest wymagany" })
    .min(5, { error: "Adres musi mieć co najmniej 5 znaków" })
    .max(60, { error: "Adres nie może mieć więcej niż 60 znaków" }),

  addressLine2: z
    .string()
    .max(60, {
      error: "Drugi wiersz adresu nie może mieć więcej niż 60 znaków",
    })
    .optional(),

  zipCode: z
    .string({ error: "Kod pocztowy jest wymagany" })
    .min(2, { error: "Kod pocztowy musi mieć co najmniej 2 znaki" })
    .max(10, { error: "Kod pocztowy nie może mieć więcej niż 10 znaków" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      error:
        "Kod pocztowy może zawierać tylko litery, cyfry, spacje i myślniki",
    }),

  country: z.enum(["DE", "PL", "US"], {
    error: "Wybierz kraj z dostępnych opcji",
  }),

  region: z
    .string({ error: "Region jest wymagany" })
    .min(1, { error: "Region nie może być pusty" }),

  city: z
    .string({ error: "Miasto jest wymagane" })
    .min(1, { error: "Miasto nie może być puste" }),

  photo1: fileSchema,
  photo2: fileSchema,
});

export type PersonalFormData = z.infer<typeof formSchema>;
