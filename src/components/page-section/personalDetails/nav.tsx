"use client";
import React from 'react'
import Logo from "@/../public/svgs/logoText.svg";
import Image from "next/image";
import { motion } from "framer-motion";


const PersonalDetailsNav = () => {
    return (
        <div className="absolute top-0 left-0 w-full  flex items-start justify-start  px-6">
            <Image src={Logo} alt="logo" className="" />
        </div>
    )

}

export default PersonalDetailsNav
