// src/hooks/useCategoriesForm.ts
import { useState } from "react";
import { createCategory } from "../services/api";

export const useCategoriesForm = (onSuccess?: (newCategory: any) => void) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    if (!name.trim()) {
      setErrors("Category name is required");
      return false;
    }
    setErrors(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const newCategory = await createCategory(name.trim());
      setName("");
      setErrors(null);

      if (onSuccess) {
        onSuccess(newCategory);
      }
    } catch (err: any) {
      console.error("Failed to create category:", err);
      setErrors(err?.message || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    errors,
    isSubmitting,
    handleSubmit,
  };
};