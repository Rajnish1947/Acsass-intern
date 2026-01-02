
// // import React, { useContext, useEffect, useState } from "react";
// // import { TaskContext } from "../../TaskContext/TaskContext";

// // const TaskList = () => {
// //   const { tasks, loading, fetchAllTasks } = useContext(TaskContext);
// //   const [localTasks, setLocalTasks] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // ----------------------
// //   // Load tasks
// //   // ----------------------
// //   useEffect(() => {
// //     console.log("🚀 Fetching tasks...");
// //     fetchAllTasks().catch(err =>
// //       console.error("❌ Failed to fetch tasks:", err)
// //     );
// //   }, []);

// //   // ----------------------
// //   // Format tasks
// //   // ----------------------
// //   useEffect(() => {
// //     console.log("🧩 Raw tasks from context:", tasks);

// //     const formatted = tasks.map(task => ({
// //       ...task,
// //       employees: task.employees ? Object.values(task.employees) : []
// //     }));

// //     console.log("🧩 Formatted tasks:", formatted);
// //     setLocalTasks(formatted);
// //   }, [tasks]);

// //   // ----------------------
// //   // Helpers
// //   // ----------------------
// //   const getStatusBadge = status => {
// //     const s = (status || "pending").toLowerCase();
// //     if (s === "completed") return "bg-green-100 text-green-700";
// //     if (s === "in progress") return "bg-blue-100 text-blue-700";
// //     return "bg-yellow-100 text-yellow-700";
// //   };

// //   const formatDate = date =>
// //     date ? new Date(date).toLocaleDateString() : "—";

// //   // ----------------------
// //   // FILTER LOGIC (DEBUG)
// //   // ----------------------
// //   const filteredTasks = localTasks
// //   .map(task => {
// //     console.log("🟦 TASK:", task.title);

// //     // ---------------- DATE FILTER ----------------
// //     const taskStart = new Date(task.start_date);
// //     const taskEnd = new Date(task.end_date);
// //     const filterStart = startDate ? new Date(startDate) : null;
// //     const filterEnd = endDate ? new Date(endDate) : null;

// //     let matchesDate = true;
// //     if (filterStart && filterEnd) {
// //       matchesDate = taskStart >= filterStart && taskEnd <= filterEnd;
// //     } else if (filterStart) {
// //       matchesDate = taskStart >= filterStart;
// //     } else if (filterEnd) {
// //       matchesDate = taskEnd <= filterEnd;
// //     }

// //     console.log("📅 Date Match:", matchesDate);
// //     if (!matchesDate) return null;

// //     // ---------------- EMPLOYEE FILTER ----------------
// //     const filteredEmployees = task.employees
// //       .map(emp => {
// //         console.log("👤 Employee:", emp.name);
// //         console.log("Employee Status:", emp.status);
// //         console.log("Selected Status Filter:", statusFilter);

// //         // ✅ STATUS CHECK (MAIN FIX)
// //         if (statusFilter && emp.status.toLowerCase() !== statusFilter.toLowerCase()) {
// //           console.log("❌ Employee REMOVED due to status mismatch");
// //           return null;
// //         }

// //         // ---------------- SUBTASK FILTER ----------------
// //         const filteredSubtasks = emp.subtasks.filter(st =>
// //           statusFilter
// //             ? st.status.toLowerCase() === statusFilter.toLowerCase()
// //             : true
// //         );

// //         console.log("📌 Subtasks after status filter:", filteredSubtasks);

// //         // ---------------- SEARCH FILTER ----------------
// //         const search = searchTerm.toLowerCase();
// //         const employeeMatch = emp.name.toLowerCase().includes(search);
// //         const subtaskMatch = filteredSubtasks.some(st =>
// //           st.title.toLowerCase().includes(search)
// //         );

// //         console.log("🔍 Search term:", searchTerm);
// //         console.log("Employee name match:", employeeMatch);
// //         console.log("Subtask title match:", subtaskMatch);

// //         // ✅ INCLUDE RULE
// //         if (!searchTerm || employeeMatch || subtaskMatch) {
// //           console.log("✅ Employee INCLUDED");
// //           return { ...emp, subtasks: filteredSubtasks };
// //         }

// //         console.log("❌ Employee REMOVED due to search mismatch");
// //         return null;
// //       })
// //       .filter(Boolean);

// //     console.log("👥 Employees after filter:", filteredEmployees);

// //     // ---------------- TASK TITLE SEARCH ----------------
// //     const taskMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
// //     console.log("🔍 Task title match:", taskMatch);

// //     if (filteredEmployees.length > 0 || taskMatch) {
// //       console.log("✅ Task INCLUDED");
// //       return { ...task, employees: filteredEmployees };
// //     }

// //     console.log("❌ Task REMOVED");
// //     return null;
// //   })
// //   .filter(Boolean);

// // console.log("🔥 FINAL FILTERED TASKS:", filteredTasks);


// //   // ----------------------
// //   // Render
// //   // ----------------------
// //   return (
// //   <div className="p-6 bg-gray-100 min-h-screen">
// //     <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
// //       Task Overview
// //     </h1>

// //     {/* 🔍 Filters */}
// //     <div className="sticky top-0 z-20 bg-white shadow rounded-xl p-4 mb-6 flex flex-wrap gap-4 justify-center">
// //       <input
// //         type="text"
// //         placeholder="Search Task / Employee / Subtask"
// //         value={searchTerm}
// //         onChange={e => setSearchTerm(e.target.value)}
// //         className="px-4 py-2 border rounded-md w-64"
// //       />

// //       <select
// //         value={statusFilter}
// //         onChange={e => setStatusFilter(e.target.value)}
// //         className="px-4 py-2 border rounded-md"
// //       >
// //         <option value="">All Status</option>
// //         <option value="pending">Pending</option>
// //         <option value="in progress">In Progress</option>
// //         <option value="completed">Completed</option>
// //       </select>

// //       <input
// //         type="date"
// //         value={startDate}
// //         onChange={e => setStartDate(e.target.value)}
// //         className="px-4 py-2 border rounded-md"
// //       />

// //       <input
// //         type="date"
// //         value={endDate}
// //         onChange={e => setEndDate(e.target.value)}
// //         className="px-4 py-2 border rounded-md"
// //       />
// //     </div>

// //     {/* ⏳ Loading */}
// //     {loading && (
// //       <p className="text-center mt-20 text-gray-500">Loading tasks…</p>
// //     )}

// //     {/* ❌ No Data */}
// //     {!loading && filteredTasks.length === 0 && (
// //       <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
// //         No data found
// //       </p>
// //     )}

// //     {/* ✅ TASK CARDS */}
// //    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
// //   <table className="min-w-full text-sm text-left">
// //     <thead className="bg-gradient-to-r from-blue-900 to-blue-700 text-white sticky top-0 z-10">
// //       <tr>
// //         {[
// //           "Task",
// //           "Description",
// //           "Start",
// //           "End",
// //           "Employee",
// //           "Subtasks",
// //           "Status"
// //         ].map(head => (
// //           <th
// //             key={head}
// //             className="px-6 py-4 font-semibold uppercase tracking-wide"
// //           >
// //             {head}
// //           </th>
// //         ))}
// //       </tr>
// //     </thead>

// //     <tbody className="divide-y divide-gray-200">
// //       {filteredTasks.map(task =>
// //         task.employees.map((emp, idx) => (
// //           <tr
// //             key={`${task.task_id}-${emp.employee_id}`}
// //             className="hover:bg-blue-50 transition"
// //           >
// //             {idx === 0 && (
// //               <>
// //                 <td
// //                   rowSpan={task.employees.length}
// //                   className="px-6 py-4 font-semibold text-gray-800 align-top"
// //                 >
// //                   {task.title}
// //                 </td>
// //                 <td
// //                   rowSpan={task.employees.length}
// //                   className="px-6 py-4 text-gray-600 align-top max-w-xs"
// //                 >
// //                   {task.description || "—"}
// //                 </td>
// //                 <td
// //                   rowSpan={task.employees.length}
// //                   className="px-6 py-4 text-gray-500 align-top"
// //                 >
// //                   {formatDate(task.start_date)}
// //                 </td>
// //                 <td
// //                   rowSpan={task.employees.length}
// //                   className="px-6 py-4 text-gray-500 align-top"
// //                 >
// //                   {formatDate(task.end_date)}
// //                 </td>
// //               </>
// //             )}

// //             <td className="px-6 py-4 font-medium text-gray-700">
// //               {emp.name}
// //             </td>

// //             <td className="px-6 py-4">
// //               {emp.subtasks.length > 0 ? (
// //                 <div className="flex flex-wrap gap-2">
// //                   {emp.subtasks.map(st => (
// //                     <span
// //                       key={st.subtask_id}
// //                       className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusBadge(
// //                         st.status
// //                       )}`}
// //                       title={`${st.title} (${st.status})`}
// //                     >
// //                       {st.title}
// //                     </span>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <span className="text-gray-400 italic">No subtasks</span>
// //               )}
// //             </td>

// //             <td className="px-6 py-4">
// //               <span
// //                 className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
// //                   emp.status
// //                 )}`}
// //               >
// //                 {emp.status
// //                   ? emp.status.charAt(0).toUpperCase() + emp.status.slice(1)
// //                   : "Pending"}
// //               </span>
// //             </td>
// //           </tr>
// //         ))
// //       )}
// //     </tbody>
// //   </table>
// // </div>

// //   </div>
// // );


// // };

// // export default TaskList;
// import React, { useContext, useEffect, useState } from "react";
// import { TaskContext } from "../../TaskContext/TaskContext";

// const TaskList = () => {
//   const { tasks, loading, fetchAllTasks } = useContext(TaskContext);

//   const [localTasks, setLocalTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // ---------------- FETCH ----------------
//   useEffect(() => {
//     fetchAllTasks();
//   }, []);

//   // ---------------- FORMAT ----------------
//   useEffect(() => {
//     const formatted = tasks.map(task => ({
//       ...task,
//       employees: task.employees ? Object.values(task.employees) : []
//     }));
//     setLocalTasks(formatted);
//   }, [tasks]);

//   // ---------------- HELPERS ----------------
//   const formatDate = d => (d ? new Date(d).toLocaleDateString() : "—");

//   const getStatusBadge = status => {
//     const s = (status || "pending").toLowerCase();
//     if (s === "completed") return "bg-green-100 text-green-700";
//     if (s === "in progress") return "bg-blue-100 text-blue-700";
//     return "bg-yellow-100 text-yellow-700";
//   };

//   // ---------------- FILTER LOGIC ----------------
//   const filteredTasks = localTasks
//     .map(task => {
//       const taskStart = new Date(task.start_date);
//       const taskEnd = new Date(task.end_date);

//       const filterStart = startDate ? new Date(startDate) : null;
//       const filterEnd = endDate ? new Date(endDate) : null;

//       let matchesDate = true;
//       if (filterStart && filterEnd)
//         matchesDate = taskStart >= filterStart && taskEnd <= filterEnd;
//       else if (filterStart) matchesDate = taskStart >= filterStart;
//       else if (filterEnd) matchesDate = taskEnd <= filterEnd;

//       if (!matchesDate) return null;

//       const filteredEmployees = task.employees
//         .map(emp => {
//           if (
//             statusFilter &&
//             emp.status?.toLowerCase() !== statusFilter.toLowerCase()
//           )
//             return null;

//           const filteredSubtasks = emp.subtasks.filter(st =>
//             statusFilter
//               ? st.status.toLowerCase() === statusFilter.toLowerCase()
//               : true
//           );

//           const search = searchTerm.toLowerCase();
//           const employeeMatch = emp.name.toLowerCase().includes(search);
//           const subtaskMatch = filteredSubtasks.some(st =>
//             st.title.toLowerCase().includes(search)
//           );

//           if (!searchTerm || employeeMatch || subtaskMatch)
//             return { ...emp, subtasks: filteredSubtasks };

//           return null;
//         })
//         .filter(Boolean);

//       const taskMatch = task.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//       if (filteredEmployees.length > 0 || taskMatch)
//         return { ...task, employees: filteredEmployees };

//       return null;
//     })
//     .filter(Boolean);

//   // ---------------- RENDER ----------------
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Task Overview
//       </h1>

//       {/* FILTERS */}
//       <div className="sticky top-0 z-20 bg-white shadow rounded-xl p-4 mb-6 flex flex-wrap gap-4 justify-center">
//         <input
//           type="text"
//           placeholder="Search Task / Employee / Subtask"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="px-4 py-2 border rounded-md w-64"
//         />

//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border rounded-md"
//         >
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="in progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>

//         <input
//           type="date"
//           value={startDate}
//           onChange={e => setStartDate(e.target.value)}
//           className="px-4 py-2 border rounded-md"
//         />

//         <input
//           type="date"
//           value={endDate}
//           onChange={e => setEndDate(e.target.value)}
//           className="px-4 py-2 border rounded-md"
//         />
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center mt-20 text-gray-500">Loading tasks…</p>
//       )}

//       {/* NO DATA */}
//       {!loading && filteredTasks.length === 0 && (
//         <div className="text-center mt-20 text-gray-500 text-lg font-semibold">
//           No data found
//         </div>
//       )}

//       {/* TABLE (ONLY WHEN DATA EXISTS) */}
//       {!loading && filteredTasks.length > 0 && (
//         <div className="overflow-x-auto bg-white rounded-xl shadow-lg border">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
//               <tr>
//                 {[
//                   "Task",
//                   "Description",
//                   "Start",
//                   "End",
//                   "Employee",
//                   "Subtasks",
//                   "Status"
//                 ].map(h => (
//                   <th key={h} className="px-6 py-4 uppercase font-semibold">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {filteredTasks.map(task =>
//                 task.employees.map((emp, i) => (
//                   <tr
//                     key={`${task.task_id}-${emp.employee_id}`}
//                     className="hover:bg-blue-50"
//                   >
//                     {i === 0 && (
//                       <>
//                         <td
//                           rowSpan={task.employees.length}
//                           className="px-6 py-4 font-semibold align-top"
//                         >
//                           {task.title}
//                         </td>
//                         <td
//                           rowSpan={task.employees.length}
//                           className="px-6 py-4 align-top"
//                         >
//                           {task.description || "—"}
//                         </td>
//                         <td
//                           rowSpan={task.employees.length}
//                           className="px-6 py-4 align-top"
//                         >
//                           {formatDate(task.start_date)}
//                         </td>
//                         <td
//                           rowSpan={task.employees.length}
//                           className="px-6 py-4 align-top"
//                         >
//                           {formatDate(task.end_date)}
//                         </td>
//                       </>
//                     )}

//                     <td className="px-6 py-4">{emp.name}</td>

//                     <td className="px-6 py-4">
//                       {emp.subtasks.length ? (
//                         <div className="flex flex-wrap gap-2">
//                           {emp.subtasks.map(st => (
//                             <span
//                               key={st.subtask_id}
//                               className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(
//                                 st.status
//                               )}`}
//                             >
//                               {st.title}
//                             </span>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="italic text-gray-400">
//                           No subtasks
//                         </span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
//                           emp.status
//                         )}`}
//                       >
//                         {emp.status || "Pending"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../TaskContext/TaskContext";

const TaskList = () => {
  const { tasks, loading, fetchAllTasks } = useContext(TaskContext);

  const [localTasks, setLocalTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ---------------- FETCH TASKS ----------------
  useEffect(() => {
    fetchAllTasks().catch(console.error);
  }, []);

  // ---------------- FORMAT TASKS ----------------
  useEffect(() => {
    const formatted = tasks.map(task => ({
      ...task,
      employees: task.employees ? Object.values(task.employees) : []
    }));
    setLocalTasks(formatted);
  }, [tasks]);

  // ---------------- HELPERS ----------------
  const formatDate = date =>
    date ? new Date(date).toLocaleDateString() : "—";

  const getStatusBadge = status => {
    const s = (status || "pending").toLowerCase();
    if (s === "completed") return "bg-green-100 text-green-700";
    if (s === "in progress") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  // ---------------- FILTER LOGIC ----------------
  const filteredTasks = localTasks
    .map(task => {
      // DATE FILTER
      const taskStart = new Date(task.start_date);
      const taskEnd = new Date(task.end_date);
      const filterStart = startDate ? new Date(startDate) : null;
      const filterEnd = endDate ? new Date(endDate) : null;

      let dateMatch = true;
      if (filterStart && filterEnd)
        dateMatch = taskStart >= filterStart && taskEnd <= filterEnd;
      else if (filterStart)
        dateMatch = taskStart >= filterStart;
      else if (filterEnd)
        dateMatch = taskEnd <= filterEnd;

      if (!dateMatch) return null;

      // EMPLOYEE + STATUS + SEARCH FILTER
      const filteredEmployees = task.employees
        .map(emp => {
          if (
            statusFilter &&
            emp.status?.toLowerCase() !== statusFilter.toLowerCase()
          ) {
            return null;
          }

          const search = searchTerm.toLowerCase();
          const empMatch = emp.name.toLowerCase().includes(search);

          const filteredSubtasks = emp.subtasks.filter(st =>
            statusFilter
              ? st.status.toLowerCase() === statusFilter.toLowerCase()
              : true
          );

          const subtaskMatch = filteredSubtasks.some(st =>
            st.title.toLowerCase().includes(search)
          );

          if (!searchTerm || empMatch || subtaskMatch) {
            return { ...emp, subtasks: filteredSubtasks };
          }

          return null;
        })
        .filter(Boolean);

      const taskMatch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (filteredEmployees.length > 0 || taskMatch) {
        return { ...task, employees: filteredEmployees };
      }

      return null;
    })
    .filter(Boolean);

  // ---------------- RENDER ----------------
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Task Overview
      </h1>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Search Task / Employee / Subtask"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-20 text-gray-500">Loading tasks…</p>
      )}

      {/* ❌ NO DATA FOUND (IMPORTANT FIX) */}
      {!loading && filteredTasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
          No data found
        </p>
      )}

      {/* ✅ TABLE ONLY WHEN DATA EXISTS */}
      {!loading && filteredTasks.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
              <tr>
                {[
                  "Task",
                  "Description",
                  "Start",
                  "End",
                  "Employee",
                  "Subtasks",
                  "Status"
                ].map(h => (
                  <th key={h} className="px-6 py-4 uppercase font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredTasks.map(task =>
                task.employees.map((emp, idx) => (
                  <tr key={`${task.task_id}-${emp.employee_id}`} className="hover:bg-blue-50">
                    {idx === 0 && (
                      <>
                        <td rowSpan={task.employees.length} className="px-6 py-4 font-semibold">
                          {task.title}
                        </td>
                        <td rowSpan={task.employees.length} className="px-6 py-4 text-gray-600">
                          {task.description || "—"}
                        </td>
                        <td rowSpan={task.employees.length} className="px-6 py-4">
                          {formatDate(task.start_date)}
                        </td>
                        <td rowSpan={task.employees.length} className="px-6 py-4">
                          {formatDate(task.end_date)}
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4">{emp.name}</td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {emp.subtasks.map(st => (
                          <span
                            key={st.subtask_id}
                            className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(st.status)}`}
                          >
                            {st.title}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(emp.status)}`}
                      >
                        {emp.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
