import React, { useEffect, useState } from "react";

import useAuthStore from "../store/useAuthStore";
import useTaskStore from "../store/useTaskStore";
import useProjectStore from "../store/useProjectStore";

import HeroSection from "../components/dashboard/HeroSection";
import KPICards from "../components/dashboard/KPICards";
import CurrentProjects from "../components/dashboard/CurrentProjects";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentActivity from "../components/dashboard/RecentActivity";

import useDashboardData from "../hooks/useDashboardData";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { tasks, getTasks, isGettingTasks } = useTaskStore();
  const { projects, getProjects, isGettingProjects } = useProjectStore();

  const [showAllProjects, setShowAllProjects] = useState(false);

  const { sortedActiveProjects, kpiData, projectWiseData, recentActivities } =
    useDashboardData(projects, tasks);

  useEffect(() => {
    const fetchData = async () => {
      await getTasks({ bypassFilters: true });
      await getProjects();
    };

    fetchData();
  }, [getProjects, getTasks]);

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <HeroSection user={user} />

      <div className="space-y-6 px-6 pb-8">
        {/* KPI Cards */}
        <KPICards
          data={kpiData}
          loading={isGettingProjects || isGettingTasks}
        />

        {/* Charts & Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Charts Section */}
          <ChartsSection projectWiseData={projectWiseData} />

          {/* Recent Activity (unchanged) */}
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Current Projects */}
        <CurrentProjects
          projects={sortedActiveProjects}
          loading={isGettingProjects || isGettingTasks}
          showAll={showAllProjects}
          setShowAll={setShowAllProjects}
        />
      </div>
    </div>
  );
}
