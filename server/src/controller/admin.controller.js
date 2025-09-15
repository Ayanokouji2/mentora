import _ from "lodash";
import { ADMIN_SECRET_KEY, JWT_SECRET_KEY } from "../constant/config";



const adminLogin = async (req, res) => {
  const { key } = req.body;
  if (!_.includes([ADMIN_SECRET_KEY, "admin"], key)) {
    throw new ApiError(401, "Invaild Credential");
  }
  const token = await jwt.sign({ key: key }, JWT_SECRET_KEY);

  res.cookie("admin_token", token, { ...options, maxAge: 1000 * 60 * 15 });

  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};

const logout = (_, res) => {
  res.cookie("admin", "", { ...options, maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Admin Logged Out",
  });
};

export { logout, adminLogin, createClass };
