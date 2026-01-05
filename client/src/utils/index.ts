"use client";
import { useEffect } from "react";

export function handleChangeLink(event?: React.ChangeEvent<HTMLSelectElement>) {
  if (window.location.pathname == "/") {
    console.log(1)
    // event?.currentTarget.classList.add("bg-primary text-white");
  }
}
