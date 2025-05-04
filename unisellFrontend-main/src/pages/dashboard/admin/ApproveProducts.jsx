import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchPendingProducts,
  approveProduct,
  rejectProduct,
} from "../../../redux/features/admin/adminSlice";

const ApproveProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingProducts, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchPendingProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleApprove = async (productId) => {
    try {
      await dispatch(approveProduct(productId)).unwrap();
      toast.success("Product approved successfully");
    } catch (error) {
      toast.error("Failed to approve product");
    }
  };

  const handleReject = async (productId) => {
    try {
      await dispatch(rejectProduct(productId)).unwrap();
      toast.success("Product rejected successfully");
    } catch (error) {
      toast.error("Failed to reject product");
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
      <h2 className="text-2xl font-bold mb-6">Pending Product Approvals</h2>

      {pendingProducts.length === 0 ? (
        <p className="text-gray-500">No products pending approval</p>
      ) : (
        <div className="space-y-4">
          {pendingProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Posted by: {product.seller?.name || "Unknown seller"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Category: {product.category?.name || "Uncategorized"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Price: ${product.price?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleApprove(product._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => navigate(`/shop/${product._id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View
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

export default ApproveProducts;
