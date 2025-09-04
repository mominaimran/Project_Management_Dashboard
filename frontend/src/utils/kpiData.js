import { FolderOpen, CheckCircle, ClipboardList, Clock } from "lucide-react";

export const getKpiData = (projects, tasks) => {
  const totalProjects = projects?.length || 0;
  const totalTasks = tasks?.length || 0;
  const completedTasks =
    tasks?.filter((task) => task.status === "done").length || 0;
  const pendingTasks = totalTasks - completedTasks;

  return [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: Clock,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100",
    },
  ];
};
