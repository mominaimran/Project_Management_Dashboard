import React from "react";

const KPIItem = ({ item }) => {
  const {
    title = "Untitled",
    value = 0,
    subtitle = "",
    bgColor = "from-[#FFD75F] to-[#f8f0be]",
    icon: Icon,
  } = item || {};

  return (
    <div
      className="group relative bg-white/90 backdrop-blur-md shadow-md hover:shadow-xl border border-gray-100 hover:border-[#FFD75F]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      aria-label={`KPI ${title}`}
      role="group"
    >
      {/* Gradient Hover Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative p-8 flex justify-between items-center">
        {/* Left Side (Title + Icon) */}
        <div>
          <h3
            className="text-sm font-semibold text-[#303030] group-hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h3>
          {Icon && (
            <Icon className="w-6 h-6 mt-2 text-gray-500 group-hover:text-black transition-colors" />
          )}
        </div>

        {/* Right Side (Value) */}
        <div
          className="text-3xl font-extrabold text-[#303030] group-hover:text-black transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {value}
        </div>
      </div>

      {/* Subtitle (if any) */}
      {subtitle ? (
        <div className="px-5 pb-3 text-xs text-gray-500 group-hover:text-[#898A87] transition-colors">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};


const SkeletonCard = () => (
  <div className="p-5 rounded-2xl border border-gray-200 bg-white/70 shadow-sm animate-pulse">
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
    <div className="h-8 w-3/4 bg-gray-200 rounded" />
    <div className="h-3 w-1/3 bg-gray-200 rounded mt-2" />
  </div>
);

export default function KPICards({ data = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
        No KPI data available
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, i) => (
        <KPIItem key={`${item.title ?? "kpi"}-${i}`} item={item} />
      ))}
    </div>
  );
}
