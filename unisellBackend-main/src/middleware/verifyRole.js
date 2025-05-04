const verifyToken = require("./verifyToken"); // Adjust path if needed

const verifyRole = (...roles) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have the required role to perform this action.",
        });
      }
      next();
    });
  };
};

module.exports = verifyRole;
