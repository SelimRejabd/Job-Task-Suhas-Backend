import "dotenv/config";

import { connectDB } from "../config/db";
import { User } from "../modules/user";
import { USER_ROLE, USER_STATUS } from "../modules/user/constant";
import { config } from "../config";

const createAdmin = async () => {
  await connectDB();

  const adminEmail = config.admin_email;
  const adminPassword = config.admin_password;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
  }

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: USER_ROLE.admin,
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: adminPassword,
    role: USER_ROLE.admin,
    status: USER_STATUS.active,
  });

  console.log("Admin user created successfully");
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
