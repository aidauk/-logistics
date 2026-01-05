"use client";
import Modal from "@/components/Modal";
import NavComponent from "./NavComponent";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getCurrentUser } from "@/api/users";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <nav>
      <Modal />
      <NavComponent sideBarActive={active} setActive={setActive} />
      <Sidebar active={active} />
    </nav>
  );
};

export default Navbar;
