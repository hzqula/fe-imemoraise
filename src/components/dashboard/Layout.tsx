import { LayoutProps } from "../../interfaces/common.interfaces";
import { Link, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ThemeSwitcher from "../ThemeSwitcher";

const Layout = ({
  setTheme,
  currentTheme,
  children,
  sidebarItems,
  subpageTitle,
}: LayoutProps) => {
  const location = useLocation();
  const { keycloak } = useKeycloak();

  return (
    <div className="h-full drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="h-full drawer-content">
        <div className="sticky top-0 z-10 flex justify-between h-16 pl-4 border-b shadow-md navbar bg-base-100 border-neutral-content">
          <div className="flex gap-1">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </label>
            <span className="text-lg font-semibold">{subpageTitle}</span>
          </div>
          <div>
            <ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
            <button
              className="btn btn-ghost text-primary"
              onClick={() => keycloak.logout()}
            >
              <span className="hidden sm:inline">Sign Out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 bg-base-200/20">{children}</div>
      </div>
      <div className="z-20 drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="h-full p-4 border-r border-black w-80 menu bg-base-100">
          <div className="flex items-center justify-center h-24 mb-3 text-base-100/95">
            <img
              src="/uin-suska.svg"
              alt="UIN Suska Riau"
              className="h-16 mr-2"
            />
            <span className="text-2xl font-bold text-base-content">
              <span className="italic underline">iMemoraise</span> <br /> UIN
              Suska Riau
            </span>
          </div>
          <div className="mx-auto h-[1px] w-48 mb-5 bg-base-content" />
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={`m-2 text-base hover:bg-primary/10 ${
                  location.pathname === item.link ||
                  (location.pathname === "/dosen-pa/mahasiswa/setoran" &&
                    item.label === "Mahasiswa")
                    ? "bg-primary/40"
                    : "bg-base-200"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Layout;
