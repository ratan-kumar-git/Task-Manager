import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroup";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import LoadingAnimation from "../../components/LoadingAnimation";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTaskTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // get task by id
  const getTaskInfoById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATH.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in fetching users", error);
      setLoading(false);
    }
  };

  // handle todo check
  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist]
    const taskId = id

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed
      try {
        const response = await axiosInstance.put(API_PATH.TASKS.UPDATE_TODO_CHECKLIST(taskId), {
          todoChecklist
        })
        if (response.status === 200) {
          setTask(response.data?.task || task)
        } else {
          // optinally revert the toggel if the api call fails 
          todoChecklist[index].completed = !todoChecklist[index].completed
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed
      }
    }
  };

  // handle attatchment link
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link; //defult to https
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskInfoById();
    }
    // return () => { };
  }, [id]);

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="mt-5">
        {loading ? <LoadingAnimation /> : (<>
          {task && (
            <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
              <div className="form-card col-span-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm md:text-xl font-medium">
                    {task?.title}
                  </h2>
                  <div
                    className={`text-[11px] md:text-[13px] font-medium ${getTaskTagColor(
                      task?.status
                    )} px-4 py-0.5 rounded`}
                  >
                    {task?.status}
                  </div>
                </div>

                {/* description */}
                <div className="mt-4">
                  <InfoBox label="Description" value={task?.description} />
                </div>

                {/* priority, due-date, assigned to block  */}
                <div className="grid grid-cols-12 gap-4 mt-4">
                  {/* priority */}
                  <div className="col-span-6 md:col-span-4">
                    <InfoBox label="Priority" value={task?.priority} />
                  </div>

                  {/* due date */}
                  <div className="col-span-6 md:col-span-4">
                    <InfoBox
                      label="Due Date"
                      value={
                        task?.dueDate
                          ? moment(task?.dueDate).format("Do MMM YYYY")
                          : "N/A"
                      }
                    />
                  </div>

                  {/* assigned to */}
                  <div className="col-span-6 md:col-span-4">
                    <label className="text-xs font-medium text-slate-500">
                      Assigned To
                    </label>
                    <AvatarGroup
                      avatar={task?.assignedTo?.map(
                        (item) => item?.profileImageUrl || []
                      )}
                      maxVisible={5}
                    />
                  </div>
                </div>

                {/* todo checklist */}
                <div className="mt-2">
                  <label className="text-xs font-medium text-gray-500">
                    TODO Checklist
                  </label>
                  {task?.todoChecklist?.map((item, index) => (
                    <TodoChecklist
                      key={`todo_${index}`}
                      text={item.text}
                      isChecked={item?.completed}
                      onChange={() => updateTodoChecklist(index)}
                    />
                  ))}
                </div>

                {/* attachments */}
                {task?.attachments?.length > 0 && (
                  <div className="mt-2">
                    <label className="text-xs font-medium text-slate-500">
                      Attachments
                    </label>
                    {task?.attachments?.map((link, index) => (
                      <Attachment key={`link${index}`} link={link} index={index} onClick={() => handleLinkClick(link)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>)}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">
        {value}
      </p>
    </>
  );
};

const TodoChecklist = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return <div className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mt-2 cursor-pointer" onClick={onClick}>
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-400 mr-2">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <p className="text-xs text-black">{link}</p>
    </div>
    <LuSquareArrowOutUpRight className="text-gray-400" />
  </div>

}
