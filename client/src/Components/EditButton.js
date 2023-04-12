import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const EditButton = ({ callback, buttonText }) => {
	return (
		<AnimatePresence mode="wait">
			<motion.button
				initial={{ x: 0, y: 0, boxShadow: "0px 0px 0px 0px black" }}
				whileHover={{
					x: -2,
					y: -2,
					boxShadow: "4px 4px 1px 0px black",
					transition: { type: "linear", duration: 0.1 },
				}}
				exit={{
					x: 0,
					y: 0,
					boxShadow: "0px 0px 0px 0px black",
					transition: { type: "linear", duration: 0.1 },
				}}
				onClick={callback}
				className="
				text-info bg-accent font-display text-right text-xs p-1 rounded w-fit">
				{buttonText}
			</motion.button>
		</AnimatePresence>
	);
};

export default EditButton;
