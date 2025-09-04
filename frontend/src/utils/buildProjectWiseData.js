const buildProjectWiseData = (projects = [], tasks = []) => {
  return (projects || []).map((p) => {
    const pid = p._id || p.id;
    const pTasks = (tasks || []).filter((t) => {
      const tp = t.project;
      const tid = (tp && (tp._id || tp.id)) || tp || t.projectId;
      return tid === pid;
    });

    const norm = (s) => (s || "").toLowerCase();
    const done = pTasks.filter((t) => norm(t.status) === "done").length;
    const inProgress = pTasks.filter((t) =>
      norm(t.status).includes("progress")
    ).length;
    const todo = pTasks.filter((t) => norm(t.status) === "todo").length;

    return {
      id: pid,
      name: p.title || p.name || "Untitled",
      total: pTasks.length,
      done,
      inProgress,
      todo,
    };
  });
};

export default buildProjectWiseData;
