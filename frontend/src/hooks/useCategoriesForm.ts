import { useState } from "react";
import { createCategory } from "../services/api";

export const useCategoriesForm = (
  onSuccess?: (newCategory: any) => void
) => {
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

  /**
   * Returns:
   * true  -> category created successfully
   * false -> validation or API failed
   */
  const handleSubmit = async (): Promise<boolean> => {
    if (!validate()) return false;

    setIsSubmitting(true);

    try {
      const newCategory = await createCategory(name.trim());

      setName("");
      setErrors(null);

      if (onSuccess) {
        onSuccess(newCategory);
      }

      return true; // ✅ success
    } catch (err: any) {
      console.error("Failed to create category:", err);
      setErrors(err?.message || "Failed to create category. Category already exists.");
      return false; // ❌ failure
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