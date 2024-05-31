import Image from "next/image";
import AdminNavLinks from "../admin/AdminNavLinks";
import NavLinks from "./NavLinks";

export const Sidenav = ({ format }: { format: "admin" | "user" }) => {
  return (
    <div className="h-screen w-[250pt] md:w-[15%] px-5 hidden lg:block fixed left-5 py-3">
      <div className="w-full h-[80%] flex flex-col text-sm gap-5">
        <div className="w-full py-4 px-2">
          <Image
            src="/logo.jpeg"
            alt="Offshore Account"
            width={150}
            height={30}
          />
        </div>
        {/* {navType == "user" ? <NavLinks /> : ""} */}
        {format == "user" ? <NavLinks /> : <AdminNavLinks />}
      </div>
    </div>
  );
};
