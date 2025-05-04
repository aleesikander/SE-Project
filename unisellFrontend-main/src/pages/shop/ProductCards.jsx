import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { MessageCircle } from "lucide-react";
import { toast } from "react-toastify";
import RatingStars from "../../components/RatingStars";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleMessageClick = (e, sellerId) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      toast.info("Please login to message the seller");
      return;
    }

    if (user?._id === sellerId) {
      toast.warning("You can't message yourself!");
      return;
    }

    if (!sellerId) {
      toast.error("Invalid seller information");
      return;
    }

    navigate(`/messages/${sellerId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const sellerId = product.seller?._id || product.sellerId;

        return (
          <div
            key={index}
            className="product__card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative group">
              <Link to={`/shop/${product._id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>

              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition-colors"
                  aria-label="Add to cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>

                {/* Message Seller Button */}
                <button
                  onClick={(e) => handleMessageClick(e, sellerId)}
                  className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800 transition-colors"
                  aria-label="Message seller"
                  title="Message Seller"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <Link to={`/shop/${product._id}`}>
                <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h4>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <RatingStars rating={product.rating} />
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-primary">PKR {product.price}</p>
                {product.oldPrice && (
                  <s className="text-sm text-gray-400">
                    PKR {product.oldPrice}
                  </s>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
