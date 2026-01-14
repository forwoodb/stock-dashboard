"use client";
import { useState } from "react";
import styles from "./Navbar3.module.css";
import Link from "next/link";

const Navbar3 = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <nav className={`${styles.navbar} bg-green-700`}>
        <div className={`${styles.container}`}>
          <a href={"/"} className="text-xl font-bold text-white">
            Stock Dashboard
            {/* <Image
              src="https://placehold.co/180x120"
              alt=""
              width={180}
              height={120}
              unoptimized
            /> */}
          </a>
          <div
            onClick={() => setIsActive(!isActive)}
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
          <ul className={`${isActive ? styles.active : ""} text-white`}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <a href={"position-sizes"}>Position Sizes</a>
            </li>
            <li>
              <a href={"watch-list"}>Watch List</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar3;
