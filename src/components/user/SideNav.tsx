import AdminNavLinks from "../admin/AdminNavLinks";
import NavLinks from "./NavLinks";

export const Sidenav = ({ format }: { format: "admin" | "user" }) => {
  return (
    <div className="h-screen w-[250pt] md:w-[15%] px-5 hidden lg:block fixed left-5 py-3">
      <div className="w-full h-[80%] flex flex-col justify-between text-sm">
        {/* {navType == "user" ? <NavLinks /> : ""} */}
        {format == "user" ? <NavLinks /> : <AdminNavLinks />}
      </div>
    </div>
  );
};
