"use client";
import React from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { IoNotificationsCircle } from "react-icons/io5";

const NotificationBtn = () => {
  return (
    <Button
      isIconOnly
      variant="ghost"
      className="text-4xl relative z-10 rounded-full border-0 text-primary"
    >
      <motion.div
        whileHover={{ rotate: 30, scale: 1.2 }}
        whileTap={{
          scale: [1, 1.4, 0.9, 1.1, 1],
          rotate: [0, -10, 10, -5, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 5,
          duration: 0.5,
        }}
      >
        <IoNotificationsCircle />
      </motion.div>
    </Button>
  );
};

export default NotificationBtn;
