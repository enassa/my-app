import { User } from "../contants/ui-data";

export default function RoleChecker({ children, roles }) {
  return Array.isArray(roles) && [...roles, "Super"].includes(User().role)
    ? children
    : null;
}
