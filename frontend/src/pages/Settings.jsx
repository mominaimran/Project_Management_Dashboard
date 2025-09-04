import React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className="bg-white text-gray-900 mt-38 w-full max-w-md p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-4"
      >
        {/* Rotating Settings icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <SettingsIcon className="w-16 h-16 text-yellow-400" />
        </motion.div>

        <h1 className="text-2xl font-bold text-center">Settings</h1>
        <p className="text-center text-gray-700">
          We’re working hard to make this feature available to you soon.
        </p>
      </motion.div>
    </div>
  );
};

export default Settings;
