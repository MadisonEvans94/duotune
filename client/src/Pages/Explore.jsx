import React from "react";
import colors from "../utils/colorPalette";
import { motion } from "framer-motion";
import {
	AiFillCloseCircle as Left,
	AiFillCheckCircle as Right,
} from "react-icons/ai";
import CollaboratorCard from "../Components/CollaboratorCard";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const Explore = () => {
	const [collaboratorCount, setCollaboratorCount] = useState(0);
	const [exitDirection, setExitDirection] = useState(0);
	const [directionChanged, setDirectionChanged] = useState(false);
	const [userPool, setUserPool] = useState(null);

	useEffect(() => {
		fetch("/users")
			.then((res) => res.json())
			.then((users) => setUserPool(users));
	}, []);

	useEffect(() => {
		if (directionChanged) {
			setCollaboratorCount((collaboratorCount) => collaboratorCount + 1);
			setDirectionChanged(false);
		}
	}, [directionChanged]);

	function rightClick() {
		setExitDirection(1);
		setDirectionChanged(true);
	}

	function leftClick() {
		setExitDirection(-1);
		setDirectionChanged(true);
	}

	return (
		<div className="">
			<motion.div
				className="absolute top-1/2 cursor-pointer left-[10%] lg:mx-24"
				initial={{ scale: 1, color: colors.accent }}
				whileHover={{ scale: 1.1, color: colors.info }}>
				<Left size="3em" onClick={leftClick} />
			</motion.div>

			<motion.div
				className="absolute top-1/2 cursor-pointer right-[10%] lg:mx-24"
				initial={{ scale: 1, color: colors.accent }}
				whileHover={{ scale: 1.1, color: colors.info }}>
				<Right size="3em" onClick={rightClick} />
			</motion.div>

			<div className="flex flex-row justify-center items-center h-full">
				<AnimatePresence mode="wait">
					{userPool && (
						<CollaboratorCard
							key={userPool[collaboratorCount].id}
							image={userPool[collaboratorCount].profile_picture_url}
							collaboratorId={userPool[collaboratorCount].id}
							audioFile="https://res.cloudinary.com/degnyqukw/video/upload/v1680658098/carti_thing_ih9wft.mp3"
							artistName={userPool[collaboratorCount].artist_name}
							location={userPool[collaboratorCount].location}
							genre="genre"
							exitDirection={exitDirection}
							artistType={userPool[collaboratorCount].user_type.name}
							blurb={userPool[collaboratorCount].bio}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Explore;
