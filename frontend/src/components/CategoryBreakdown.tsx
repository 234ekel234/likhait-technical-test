import React, { useState } from "react";
import { CATEGORY_EMOJIS } from "../constants/categoryEmojis";
import { COLORS } from "../constants/colors";
import { CategoryModal } from "./CategoryModal";

interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  total: number;
  totalCount: number;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  total,
  totalCount,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const formatAmount = (amount: number) => `$${amount.toFixed(2)}`;

  // --- Styles ---
  const containerStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const totalStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: `1px solid ${COLORS.secondary.s04}`,
    background: COLORS.secondary.s01,
    cursor: "pointer",
  };

  const addCategoryButtonStyle: React.CSSProperties = {
    marginLeft: "16px",
    padding: "8px 16px",
    background: COLORS.primary.p05,
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    transition: "background 0.2s",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    background: COLORS.secondary.s03,
    border: "none",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: COLORS.secondary.s08,
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const itemStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: COLORS.secondary.s01,
    borderRadius: "8px",
    marginBottom: "8px",
    transition: "all 0.2s",
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div
        style={totalStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.secondary.s08 }}>TOTAL:</span>
        <span style={{ fontSize: "32px", fontWeight: 700, color: COLORS.secondary.s10 }}>{formatAmount(total)}</span>
        <span style={{ fontSize: "14px", color: COLORS.secondary.s07, marginLeft: "auto" }}>
          ({totalCount} transactions)
        </span>

        {/* Add Category Button */}
        <button
          style={addCategoryButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.background = COLORS.primary.p06}
          onMouseLeave={(e) => e.currentTarget.style.background = COLORS.primary.p05}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the collapse trigger
            setIsAddCategoryModalOpen(true);
          }}
        >
          + Add Category
        </button>

        {/* Collapse Toggle */}
        <button
          style={toggleButtonStyle}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path d="M8 11l-5-5h10z" />
          </svg>
        </button>
      </div>

      {/* Expanded Category List */}
      {!isCollapsed && (
        <div style={{ padding: "8px" }}>
          {categories.map((category) => (
            <div
              key={category.category}
              style={itemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.secondary.s02;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.secondary.s01;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{
                  fontSize: "32px", width: "48px", height: "48px", display: "flex", 
                  alignItems: "center", justifyContent: "center", background: "white", 
                  borderRadius: "10px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  {CATEGORY_EMOJIS[category.category] || "📊"}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontSize: "18px", fontWeight: 600, color: COLORS.secondary.s10 }}>{category.category}</div>
                  <div style={{ fontSize: "14px", color: COLORS.secondary.s07 }}>
                    {category.count} transaction{category.count !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: COLORS.secondary.s10 }}>{formatAmount(category.amount)}</div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Correctly passing props to your CategoryModal component */}
      <CategoryModal 
        isOpen={isAddCategoryModalOpen} 
        onClose={() => setIsAddCategoryModalOpen(false)} 
        onCategoryAdded={(newCat) => {
            // Handle new category (e.g., refresh list from API)
            console.log("Success:", newCat);
            setIsAddCategoryModalOpen(false);
        }}
      />
    </div>
  );
};

export default CategoryBreakdown;