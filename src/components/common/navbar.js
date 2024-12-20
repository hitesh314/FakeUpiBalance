"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import navbarStyles from "@/styles/navbar.module.css";
import { useOverlayContext } from "@/../../context/overlayContext";
import { usePathname } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isSubdomainRelationship, setIsSubdomainRelationship] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { openOverlayWithContent } = useOverlayContext();
  const subdomainRelationship = process.env.SUBDOMAIN_RELATIONSHIP;
  console.log(isSubdomainRelationship);

  useEffect(() => {
    setLinkUrl(window.location.origin);
    setIsSubdomainRelationship(
      window.location.origin.split(".")[0].split("//")[1] ==
        subdomainRelationship
    );
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative px-4 flex justify-between items-center bg-white w-full">
      {/* Logo */}
      <div className="flex items-center">
        {/* Burger Menu Button */}
        {!isSubdomainRelationship && (
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="navbar-burger flex items-center text-primary p-3"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        )}
        <div className=" w-[96px] h-[48px] sm:w-[160px] sm:h-[78px]">
          <Image
            src="/images/aidAndHealLogo.png"
            alt="Aid and Heal Logo"
            width={1}
            height={1}
            layout="responsive"
            // @ts-ignore
            onClick={() => (window.location.href = linkUrl)}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Navigation Links */}
      {!isSubdomainRelationship && (
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-[920px] lg:space-x-8 ">
          <li>
            <Link
              href="/"
              className={`text-base  hover:text-gray-700 ${
                currentPath === "/getting-pregnant"
                  ? "underline text-black"
                  : "text-gray-500"
              }`}
            >
              Getting Pregnant
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`text-base text-gray-500 hover:text-gray-700 ${
                currentPath === "/pregnancy" ? "underline" : ""
              }`}
            >
              Pregnancy
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`text-base  hover:text-gray-700 ${
                currentPath === "/baby-toddler"
                  ? "underline text-black"
                  : "text-gray-500"
              }`}
            >
              Baby & Toddler
            </Link>
          </li>
          <li>
            <Link
              href="/week-by-week"
              className={`text-base  hover:text-gray-700 ${
                currentPath === "/week-by-week"
                  ? "underline text-black"
                  : "text-gray-500"
              }`}
            >
              Week By Week
            </Link>
          </li>
          <li>
            <Link
              href="/baby-names"
              className={`text-base  hover:text-gray-700 ${
                currentPath === "/baby-names"
                  ? "underline text-black"
                  : "text-gray-500"
              }`}
            >
              Baby Names
            </Link>
          </li>
          <li>
            <Link
              href="https://community.aidandheal.com"
              className={`text-base hover:text-gray-700 ${
                currentPath === "/community"
                  ? "underline text-black"
                  : "text-gray-500"
              }`}
            >
              Community
            </Link>
          </li>
        </ul>
      )}

      {/* User Profile */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary rounded-full p-0.5">
        <Image
          id="avatarButton"
          // @ts-ignore
          type="button"
          onClick={() => {
            toggleDropdown();
            if (!session) {
              openOverlayWithContent("SignIn");
            }
          }}
          width={1}
          height={1}
          layout="responsive"
          className="rounded-full"
          src={
            session?.user?.image ? session?.user.image : "/images/Profile.svg"
          }
          alt="User dropdown"
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-menu relative-right z-50">
          {/* Backdrop */}
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={closeMenu}
          ></div>

          {/* Mobile Navigation */}
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            {/* Header with Logo and Close Button */}
            <div className="flex items-center mb-8">
              <button
                onClick={closeMenu}
                className="navbar-close"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    href="#"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Getting Pregnant
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="#"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Pregnancy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="#"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Baby & Toddler
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="#"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Parents
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="#"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-primary rounded"
                  >
                    Baby Names
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sign In and Sign Up Buttons */}
            <div className="mt-auto">
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2024</span>
              </p>
            </div>
          </nav>
        </div>
      )}

      {isDropdownVisible && session ? (
        <div
          id="userDropdown"
          style={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "176px",
            padding: "8px",
            transform: "translateX(-80%)",
          }}
        >
          <div
            style={{
              padding: "8px",
              fontSize: "14px",
              color: "black",
            }}
          >
            <div>
              {
                // @ts-ignore
                session.user.name
              }
            </div>
            <div
              style={{
                fontWeight: "500",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {
                // @ts-ignore
                session.user.email
              }
            </div>
          </div>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              fontSize: "14px",
            }}
          ></ul>
          <div style={{ padding: "8px", fontSize: "14px" }}>
            <a
              href="#"
              style={{ color: "gray", textDecoration: "none" }}
              onMouseOver={(e) =>
                // @ts-ignore
                (e.target.style.backgroundColor = "#f5f5f5")
              }
              // @ts-ignore
              onMouseOut={(e) => (e.target.style.backgroundColor = "")}
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
