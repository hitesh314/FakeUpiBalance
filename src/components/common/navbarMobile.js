"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import navbarStyles from "@/styles/mobileNavbar.module.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
// @ts-ignore
import { useOverlayContext } from "@/../../context/overlayContext";
import Link from "next/link";
import { useScrollDirection } from "@@/hooks/navbarScrollProcess";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { data: session } = useSession();
  const baseUrl = process.env.BASE_URL;
  const { openOverlayWithContent } = useOverlayContext();
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    setLinkUrl(window.location.origin);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const scrollDirection = useScrollDirection();

  return (
    <>
      <nav
        className={`${
          scrollDirection === "up" ? "translate-y-0" : "-translate-y-full"
        } ${
          navbarStyles.navbar
        } sticky top-0 left-0 z-50 w-full bg-white text-s transition-transform duration-600`}
      >
        <div className={navbarStyles.headerElements}>
          <div className={navbarStyles.menu}>
            <Link href={linkUrl || "#"}>
              <Image
                src="/images/aidAndHealLogo.png"
                alt="Aid and Heal Logo"
                width={96}
                height={48}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex gap-4 items-center text-[12px]">
            <Link href="/blogs">Blogs</Link>
            <div className={navbarStyles.profile}>
              <Image
                id="avatarButton"
                onClick={() => {
                  toggleDropdown();
                  if (!session) {
                    openOverlayWithContent("SignIn");
                  }
                }}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                width={48}
                height={48}
                src={session?.user?.image || "/images/Profile.svg"}
                alt="User dropdown"
              />
            </div>
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
          </div>
        </div>
      </nav>
    </>
  );
}
