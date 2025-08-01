import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTab from "../../components/TaskStatusTab";
import TaskCard from "../../components/cards/TaskCard";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation";

const MangeTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // get all tasks
  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATH.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetching users: ", error);
      setLoading(false);
    }
  };

  // handle Click
  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  // download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      })

      // create a url for blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute("download", "task_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error("Error in fetching Task report: ", error);
      toast.error("Failed to download task report. Please try again")
    }
  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => { };
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"Manage Tasks"}>
      <div className="my-5">
        {/* heading mange task */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
            <button
              className="flex lg:hidden download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTab
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" /> Download Report
              </button>
            </div>
          )}
        </div>
        {loading ? <LoadingAnimation /> : (<>
          {/* card here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {allTasks?.map((item, index) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item)}
              />
            ))}
          </div>
          {allTasks?.length === 0 && (
            <p className="text-center text-lg m-10">Task not found</p>
          )}
        </>)}
      </div>
    </DashboardLayout >
  );
};

export default MangeTasks;
