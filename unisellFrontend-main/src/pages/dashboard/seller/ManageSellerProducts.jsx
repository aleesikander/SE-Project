import React, { useState } from "react";
import {
  useFetchProductsBySellerIdQuery,
  useDeleteProductMutation,
} from "../../../redux/features/products/productsApi";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateFormater";

const ManageSellerProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const loggedInUserId = localStorage.getItem("userId"); // Get the logged-in user's ID

  // Debug: Log the logged-in user's ID
  console.log("Logged in User ID:", loggedInUserId);

  // Fetch products using the logged-in user's ID
  const { data, error, isLoading, refetch } = useFetchProductsBySellerIdQuery({
    sellerId: loggedInUserId, // Use logged-in user's ID as sellerId
    page: currentPage,
    limit: productsPerPage,
  });

  // Debug: Log the API request parameters
  console.log("API Request:", {
    sellerId: loggedInUserId,
    page: currentPage,
    limit: productsPerPage,
  });

  // Check if the data is received and log it
  if (data) {
    console.log("Fetched Products Data:", data);
  }

  // Handle error
  if (error) {
    console.error("Error fetching products:", error);
  }

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert(response.message);
      await refetch();
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= data.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Failed to load products: {error.message}</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Manage Your Products
                  </h3>
                </div>
              </div>
              <h3 className="text-sm my-4">
                Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                {(currentPage - 1) * productsPerPage +
                  (data?.products?.length || 0)}{" "}
                of {data?.totalProducts} products
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                      Product Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                      Date Added
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                      Manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.products?.map((product, index) => (
                    <tr key={product._id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1 + (currentPage - 1) * productsPerPage}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        <Link
                          to={`/dashboard/seller/product/${product._id}`}
                          className="hover:text-blue-700"
                        >
                          {product.name}
                        </Link>
                      </th>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Previous
          </button>
          {[...Array(data?.totalPages || 0)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data?.totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageSellerProducts;
