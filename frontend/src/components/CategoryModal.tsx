// src/components/CategoryModal.tsx
import React from "react";
import { Modal, Button } from "../vibes";
import { useCategoriesForm } from "../hooks/useCategoriesForm";
import { COLORS } from "../constants/colors";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded?: (newCategory: any) => void; // callback to refresh categories
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onCategoryAdded,
}) => {
  const { name, setName, errors, isSubmitting, handleSubmit } =
    useCategoriesForm(onCategoryAdded);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    if (!errors) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            border: `1px solid ${COLORS.border}`,
          }}
        />
        {errors && (
          <span style={{ color: "red", fontSize: "14px" }}>{errors}</span>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};