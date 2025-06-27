"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { US_STATES, COUNTRIES } from "@/lib/constants";
import { type FormErrors } from "@/lib/validation";
import { createPersonalFormData } from "@/lib/utils";
import { formSchema } from "@/lib/schemas";

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    country: "",
    region: "",
    city: "",
    photo1: null,
    photo2: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Memoize US states options for performance
  const usStatesOptions = useMemo(
    () =>
      US_STATES.map((state) => (
        <SelectItem key={state} value={state}>
          {state}
        </SelectItem>
      )),
    []
  );

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await formSchema.safeParseAsync(formData);

    if (!result.success) {
      console.log(result.error.issues);
      const errors = result.error.issues.reduce((acc, issue) => {
        acc[issue.path.toString()] = issue.message;
        return acc;
      }, {} as FormErrors);
      setErrors(errors);
      return;
    }

    const submitData = createPersonalFormData(result.data);
    console.log("Formularz został pomyślnie wysłany!");
    console.log(submitData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Imię</Label>
                  <Input
                    id="firstName"
                    placeholder="Wprowadź swoje imię"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nazwisko</Label>
                  <Input
                    id="lastName"
                    placeholder="Wprowadź swoje nazwisko"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data urodzenia</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine1">Adres linia 1</Label>
                <Input
                  id="addressLine1"
                  placeholder="Adres ulicy"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  className={errors.addressLine1 ? "border-red-500" : ""}
                />
                {errors.addressLine1 && (
                  <p className="text-sm text-red-600">{errors.addressLine1}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Adres linia 2 (Opcjonalne)</Label>
                <Input
                  id="addressLine2"
                  placeholder="Mieszkanie, apartament, itp."
                  value={formData.addressLine2}
                  onChange={(e) =>
                    handleInputChange("addressLine2", e.target.value)
                  }
                  className={errors.addressLine2 ? "border-red-500" : ""}
                />
                {errors.addressLine2 && (
                  <p className="text-sm text-red-600">{errors.addressLine2}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Kod pocztowy</Label>
                  <Input
                    id="zipCode"
                    placeholder="00-000"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    className={errors.zipCode ? "border-red-500" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-600">{errors.zipCode}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Kraj</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => {
                      handleInputChange("country", value);
                      // Reset region when country changes
                      handleInputChange("region", "");
                    }}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        errors.country ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Wybierz kraj" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-red-600">{errors.country}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="region">Województwo / Prowincja / Stan</Label>
                  {formData.country === "US" ? (
                    <Select
                      value={formData.region}
                      onValueChange={(value) =>
                        handleInputChange("region", value)
                      }
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.region ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Wybierz stan" />
                      </SelectTrigger>
                      <SelectContent>{usStatesOptions}</SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="region"
                      placeholder={
                        formData.country === "DE"
                          ? "Wprowadź prowincję"
                          : formData.country === "PL"
                          ? "Wprowadź polskie województwo"
                          : "Wprowadź województwo/prowincję"
                      }
                      value={formData.region}
                      onChange={(e) =>
                        handleInputChange("region", e.target.value)
                      }
                      className={errors.region ? "border-red-500" : ""}
                    />
                  )}
                  {errors.region && (
                    <p className="text-sm text-red-600">{errors.region}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Miasto</Label>
                  <Input
                    id="city"
                    placeholder="Wprowadź swoje miasto"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Przesyłanie zdjęć
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="photo1">Zdjęcie 1</Label>
                    <Input
                      id="photo1"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) =>
                        handleInputChange("photo1", e.target.files?.[0] || null)
                      }
                      className={errors.photo1 ? "border-red-500" : ""}
                    />
                    <p className="text-sm text-gray-600">
                      JPG, PNG lub WebP. 512x512 do 1024x1024 px. Maks. 2MB.
                    </p>
                    {errors.photo1 && (
                      <p className="text-sm text-red-600">{errors.photo1}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo2">Zdjęcie 2</Label>
                    <Input
                      id="photo2"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) =>
                        handleInputChange("photo2", e.target.files?.[0] || null)
                      }
                      className={errors.photo2 ? "border-red-500" : ""}
                    />
                    <p className="text-sm text-gray-600">
                      JPG, PNG lub WebP. 512x512 do 1024x1024 px. Maks. 2MB.
                    </p>
                    {errors.photo2 && (
                      <p className="text-sm text-red-600">{errors.photo2}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Wyślij formularz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
