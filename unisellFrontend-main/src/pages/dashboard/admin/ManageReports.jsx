import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchReports,
  resolveReport,
} from "../../../redux/features/admin/adminSlice";

const ManageReports = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleResolve = async (reportId, action) => {
    try {
      await dispatch(resolveReport({ reportId, action })).unwrap();
      toast.success(`Report resolved with action: ${action}`);
    } catch (error) {
      toast.error("Failed to resolve report");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Reported Content</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports to display</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold capitalize">
                    {report.type} reported
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Reason: {report.reason}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Reported by: {report.reporter?.name || "Unknown user"}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Content:{" "}
                    {report.contentId?.title ||
                      report.contentId?.email ||
                      "N/A"}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => handleResolve(report._id, "remove")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Remove Content
                  </button>
                  <button
                    onClick={() => handleResolve(report._id, "dismiss")}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReports;
