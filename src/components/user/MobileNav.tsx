import Image from "next/image";
import AdminNavLinks from "../admin/AdminNavLinks";
import NavLinks from "./NavLinks";

export const MobileNav = ({ format }: { format: string }) => {
  return (
    <div className="w-[250pt] md:w-[15%] px-5 block left-5 py-5">
      <div className="w-full h-[80%] flex flex-col gap-5 justify-between text-sm">
        <div className="w-full py-4 px-2">
          <Image
            src="/logo.jpeg"
            alt="Offshore Account"
            width={150}
            height={30}
          />
        </div>
        {format == "user" ? <NavLinks /> : <AdminNavLinks />}
      </div>
    </div>
  );
};
