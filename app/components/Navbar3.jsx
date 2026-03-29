"use client";
import { useState } from "react";
import styles from "./Navbar3.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navbar3 = () => {
  const [isActive, setIsActive] = useState(false);

  const pathname = usePathname();
  return (
    <div>
      <nav className={`${styles.navbar} bg-green-700`}>
        <div className={`${styles.container}`}>
          <Link href={"/"} className="text-xl font-bold text-white">
            Stock Dashboard
          </Link>
          <div
            onClick={() => setIsActive(!isActive)}
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
          {/* create a separate nav-links file?? https://nextjs.org/learn/dashboard-app/navigating-between-pages */}
          <ul className={`${isActive ? styles.active : ""} text-white`}>
            <li>
              <Link
                href={"/"}
                className={clsx({
                  "border-b border-white": pathname === "/",
                })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"watch-list"}
                className={clsx({
                  "border-b border-white": pathname === "/watch-list",
                })}
              >
                Watch List
              </Link>
            </li>
            <li>
              <Link
                href={"position-sizes"}
                className={clsx({
                  "border-b border-white": pathname === "/position-sizes",
                })}
              >
                Position Sizes
              </Link>
            </li>
            <li>
              <Link
                href={"trades"}
                className={clsx({
                  "border-b border-white": pathname === "/trades",
                })}
              >
                Trades
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar3;
