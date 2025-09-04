export function getProjectTaskStats(tasks = [], projectId) {
  const projectTasks = tasks.filter(
    (t) => (t.project?._id || t.project) === projectId
  );

  const isDone = (s = "") =>
    ["done", "completed", "resolved", "closed"].includes(
      String(s).toLowerCase()
    );

  const completed = projectTasks.filter((t) => isDone(t.status)).length;
  const total = projectTasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const status =
    percent === 100
      ? "completed"
      : percent >= 80
      ? "near-completion"
      : "in-progress";

  return { completed, total, percent, status };
}
