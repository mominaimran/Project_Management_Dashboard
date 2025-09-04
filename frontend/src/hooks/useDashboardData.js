import { useMemo } from "react";
import buildProjectWiseData from "../utils/buildProjectWiseData";
import { getKpiData } from "../utils/kpiData";

export default function useDashboardData(projects, tasks) {
  const projectStats = useMemo(() => {
    const pArr = Array.isArray(projects) ? projects : [];
    const tArr = Array.isArray(tasks) ? tasks : [];

    return pArr.map((p) => {
      const pid = p._id;
      const projectTasks = tArr.filter((t) => {
        const tpid = typeof t.project === "string" ? t.project : t.project?._id;
        return tpid === pid;
      });

      const completed = projectTasks.filter((t) =>
        ["done", "completed"].includes((t.status || "").toLowerCase())
      ).length;

      const total = projectTasks.length;
      const pending = Math.max(total - completed, 0);
      const progress = total ? Math.round((completed / total) * 100) : 0;

      let dueText = "No deadline";
      let dueDays = Infinity;
      if (p.deadline) {
        const due = new Date(p.deadline);
        const today = new Date();
        const diffDays = Math.ceil(
          (new Date(due.setHours(0, 0, 0, 0)) -
            new Date(today.setHours(0, 0, 0, 0))) /
            (1000 * 60 * 60 * 24)
        );
        dueDays = isNaN(diffDays) ? Infinity : diffDays;

        if (diffDays === 0) dueText = "Due today";
        else if (diffDays > 0)
          dueText = `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
        else
          dueText = `${Math.abs(diffDays)} day${
            Math.abs(diffDays) > 1 ? "s" : ""
          } overdue`;
      }

      return {
        ...p,
        title: p.title || p.name,
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: pending,
        progress,
        dueText,
        dueDays,
      };
    });
  }, [projects, tasks]);

  const activeProjects = useMemo(
    () => projectStats.filter((p) => p.pendingTasks > 0),
    [projectStats]
  );

  const sortedActiveProjects = useMemo(
    () =>
      [...activeProjects].sort((a, b) =>
        a.dueDays !== b.dueDays
          ? a.dueDays - b.dueDays
          : a.progress - b.progress
      ),
    [activeProjects]
  );

  const kpiData = useMemo(() => getKpiData(projects, tasks), [projects, tasks]);

  const projectWiseData = useMemo(
    () => buildProjectWiseData(projects, tasks),
    [projects, tasks]
  );

  function generateRecentActivities(tasks, projects) {
    const activities = [];

    // === Tasks ===
    tasks.forEach((task) => {
      // Task creation
      if (task.createdAt) {
        activities.push({
          id: `task-${task._id}-created`,
          action: `Created task '${task.title}'`,
          project: task.project?.title || task.projectName || "Unknown",
          time: task.createdAt,
          status: "created",
          type: "task",
        });
      }

      // Task updates (any update after creation)
      if (
        task.updatedAt &&
        new Date(task.updatedAt) > new Date(task.createdAt)
      ) {
        activities.push({
          id: `task-${task._id}-updated`,
          action: `Updated task '${task.title}'`,
          project: task.project?.title || task.projectName || "Unknown",
          time: task.updatedAt,
          status: "updated",
          type: "task",
        });
      }

      // Completed task (optional, for punchy feed)
      if (["done", "completed"].includes((task.status || "").toLowerCase())) {
        activities.push({
          id: `task-${task._id}-status`,
          action: `Marked task '${task.title}' as ${task.status}`,
          project: task.project?.title || task.projectName || "Unknown",
          time: task.updatedAt,
          status: "completed",
          type: "task",
        });
      }
    });

    // === Projects ===
    projects.forEach((project) => {
      if (project.createdAt) {
        activities.push({
          id: `project-${project._id}-created`,
          action: `Created project '${project.title}'`,
          project: project.title,
          time: project.createdAt,
          status: "created",
          type: "project",
        });
      }

      if (
        project.updatedAt &&
        new Date(project.updatedAt) > new Date(project.createdAt)
      ) {
        activities.push({
          id: `project-${project._id}-updated`,
          action: `Updated project '${project.title}'`,
          project: project.title,
          time: project.updatedAt,
          status: "updated",
          type: "project",
        });
      }
    });

    // Sort newest on top and return top 5
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 4);
  }

  const recentActivities = useMemo(
    () => generateRecentActivities(tasks || [], projects || []),
    [tasks, projects]
  );

  return { sortedActiveProjects, kpiData, projectWiseData, recentActivities };
}
