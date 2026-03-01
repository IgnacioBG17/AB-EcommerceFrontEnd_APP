import React from "react";

const resolveBadgeClass = (statusLabel) => {
  const normalized = String(statusLabel || "").toLowerCase();

  if (normalized.includes("entreg")) return "bg-success";
  if (normalized.includes("pend")) return "bg-warning text-dark";
  if (normalized.includes("cancel")) return "bg-danger";
  if (normalized.includes("proce") || normalized.includes("env")) return "bg-info text-dark";

  return "bg-secondary";
};

const StatusBadge = ({ statusLabel }) => {
  const label = String(statusLabel || "Sin estado");
  return <span className={`badge ${resolveBadgeClass(statusLabel)}`}>{label}</span>;
};

export default StatusBadge;
