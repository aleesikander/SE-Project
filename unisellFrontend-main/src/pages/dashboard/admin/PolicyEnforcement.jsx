import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPolicies,
  updatePolicy,
  fetchViolations,
  resolveViolation,
} from "../../../redux/features/admin/adminSlice";

const PolicyEnforcement = () => {
  const dispatch = useDispatch();
  const { policies, violations, loading } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState(0);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    consequences: "",
  });

  useEffect(() => {
    // Fetch initial data based on active tab
    if (activeTab === 0) {
      dispatch(fetchPolicies());
    } else {
      dispatch(fetchViolations());
    }
  }, [dispatch, activeTab]);

  const handleEditClick = (policy) => {
    setEditingPolicy(policy._id);
    setEditFormData({
      title: policy.title,
      description: policy.description,
      consequences: policy.consequences,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePolicy = async (policyId) => {
    try {
      await dispatch(updatePolicy({ policyId, data: editFormData })).unwrap();
      setEditingPolicy(null);
      toast.success("Policy updated successfully");
    } catch (error) {
      console.error("Error updating policy:", error);
      toast.error("Failed to update policy");
    }
  };

  const handleCancelEdit = () => {
    setEditingPolicy(null);
  };

  const handleTakeAction = async (violationId, action) => {
    try {
      await dispatch(resolveViolation({ violationId, action })).unwrap();
      toast.success(`Action taken: ${action}`);
    } catch (error) {
      console.error("Error taking action:", error);
      toast.error("Failed to take action");
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Policy Enforcement
      </h1>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b border-gray-200">
          <Tab
            className="px-4 py-2 font-medium text-sm focus:outline-none"
            selectedClassName="border-b-2 border-blue-500 text-blue-600"
          >
            Platform Policies
          </Tab>
          <Tab
            className="px-4 py-2 font-medium text-sm focus:outline-none"
            selectedClassName="border-b-2 border-blue-500 text-blue-600"
          >
            Violation Cases
          </Tab>
        </TabList>

        <TabPanel>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Manage Platform Policies
            </h2>
            <p className="text-gray-600 mb-6">
              Update and manage the policies that govern user behavior on the
              platform.
            </p>

            <div className="space-y-6">
              {policies.map((policy) => (
                <div
                  key={policy._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  {editingPolicy === policy._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={editFormData.description}
                          onChange={handleEditChange}
                          rows="4"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Consequences
                        </label>
                        <textarea
                          name="consequences"
                          value={editFormData.consequences}
                          onChange={handleEditChange}
                          rows="2"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleSavePolicy(policy._id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {policy.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{policy.description}</p>
                      <div className="mt-3 p-3 bg-red-50 rounded-md">
                        <h4 className="text-sm font-medium text-red-800">
                          Consequences:
                        </h4>
                        <p className="mt-1 text-sm text-red-700">
                          {policy.consequences}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditClick(policy)}
                        className="mt-4 px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm font-medium"
                      >
                        Edit Policy
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Policy Violation Cases
            </h2>
            <p className="text-gray-600 mb-6">
              Review and take action on reported policy violations.
            </p>

            {violations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No active violation cases</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Violation
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {violations.map((violation) => (
                      <tr key={violation._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  violation.user.avatar || "/default-avatar.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {violation.user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {violation.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {violation.policy.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {violation.details}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              violation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : violation.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {violation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="space-x-2">
                            <button
                              onClick={() =>
                                handleTakeAction(violation._id, "warn")
                              }
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Warn
                            </button>
                            <button
                              onClick={() =>
                                handleTakeAction(violation._id, "suspend")
                              }
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Suspend
                            </button>
                            <button
                              onClick={() =>
                                handleTakeAction(violation._id, "ban")
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              Ban
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PolicyEnforcement;
