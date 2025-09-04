import React from "react";
import { FileText, Folder, Zap } from "lucide-react";

export default function RecentActivity({ activities }) {
  return (
    <div className="card bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-[#FFD75F]/30 hover:shadow-2xl transition-all">
      <div className="card-body p-6 flex flex-col justify-start">
        {/* Header */}
        <h2
          className="card-title flex items-center gap-2 text-lg font-bold"
          style={{ fontFamily: "var(--font-heading)", color: "#303030" }}
        >
          <Zap className="h-5 w-5 text-[#FFD75F]" />
          Recent Activity
        </h2>
        <p
          className="text-sm mb-4"
          style={{ fontFamily: "var(--font-body)", color: "#898A87" }}
        >
          Latest updates from your team
        </p>

        {/* Activity list */}
        <div className="flex flex-col space-y-3">
          {activities.length > 0 ? (
            activities.map((activity) => {
              const Icon = activity.type === "project" ? Folder : FileText;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-[#FFD75F]/10 transition-all border border-transparent hover:border-[#FFD75F]/30"
                >
                  {/* Icon circle */}
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFD75F]/20 text-[#303030]">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "#303030" }}
                    >
                      {activity.action}
                    </p>
                    <p className="text-xs" style={{ color: "#898A87" }}>
                      {activity.project} •{" "}
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="p-4 text-sm text-center rounded-xl"
              style={{ color: "#898A87", backgroundColor: "#f8f0be20" }}
            >
              No recent activity yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
