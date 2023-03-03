import { Application } from "./declarations";
import logger from "./logger";
import { UserRoles } from "./models/users.model";


export default async function (app: Application): Promise<void> {
  const adminUserDetails = app.get("adminUser");
  const adminUser = await app.services.users.Model.findOne({
    email: adminUserDetails.email
  });
  if (!adminUser) {
    adminUserDetails.role = UserRoles.ADMIN
    app.services.users.create(adminUserDetails);
  }
}