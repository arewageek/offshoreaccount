import NavLinks from "./NavLinks";

export const MobileNav = () => {
  return (
    <div className="w-[250pt] md:w-[15%] px-5 block left-5 py-5">
      <div className="w-full h-[80%] flex flex-col justify-between text-sm">
        <NavLinks />
      </div>
    </div>
  );
};
