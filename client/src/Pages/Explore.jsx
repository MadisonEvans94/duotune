import React from "react";
import colors from "../utils/colorPalette";
import { motion } from "framer-motion";
import { FaHandsHelping as HandShake } from "react-icons/fa";
import {
	AiFillCloseCircle as Left,
	AiFillCheckCircle as Right,
} from "react-icons/ai";
import CollaboratorCard from "../Components/CollaboratorCard";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";

const Explore = () => {
	const [collaboratorCount, setCollaboratorCount] = useState(0);
	const [exitDirection, setExitDirection] = useState(0);
	const [directionChanged, setDirectionChanged] = useState(false);
	const [userPool, setUserPool] = useState(null);
	const { user, setUser, fetchUser } = useContext(UserContext);
	const [showMatchModal, setShowMatchModal] = useState(false);
	// TODO: This will need to change eventually
	useEffect(() => {
		fetch("/users")
			.then((res) => res.json())
			.then((users) => {
				setUserPool(users);
			});
	}, []);

	useEffect(() => {
		if (directionChanged) {
			setCollaboratorCount((collaboratorCount) => collaboratorCount + 1);
			setDirectionChanged(false);
		}
	}, [directionChanged]);

	function handleMatch() {
		showModal();
		fetchUser(user.id, setUser);
	}

	function showModal() {
		setShowMatchModal(true);
		setTimeout(() => {
			setShowMatchModal(false);
		}, 1500);
	}

	function rightClick() {
		const swipeData = {
			swiper_id: user.id,
			swiped_id: userPool[collaboratorCount].id,
			liked: true,
		};
		fetch("/swipes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(swipeData),
		})
			.then((res) => res.json())
			.then(
				// is it a match? if so, refetch the user from db
				(data) => data[0] === "match" && handleMatch()
			)
			.catch((error) => console.log("\n\n EXPLORE COMPONENT: Error:", error));
		setExitDirection(1);
		setDirectionChanged(true);
	}

	function leftClick() {
		setExitDirection(-1);
		setDirectionChanged(true);
	}

	return (
		<div className="">
			<AnimatePresence mode="wait">
				{showMatchModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: {} }}
						exit={{ opacity: 0, transition: { duration: 1 } }}
						className="
						z-50 bg-[#000000DD] text-info absolute w-full h-full flex flex-row justify-center items-center">
						<motion.div
							initial={{ y: "100vh" }}
							animate={{ y: 0, transition: { type: "spring", duration: 1 } }}
							exit={{
								y: "-100vh",
								transition: { type: "spring", duration: 2 },
							}}
							className="
							w-fit h-fit text-primary flex flex-col justify-center items-center">
							<h1
								className="
							text-accent font-display text-6xl">
								You Got a New Match!
							</h1>
							<HandShake size="8em" color={colors.accent} />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			{SwipeLeft()}
			{SwipeRight()}

			<div className="flex flex-row justify-center items-center h-full">
				<AnimatePresence mode="wait">
					{userPool && collaboratorCount < userPool.length && (
						<CollaboratorCard
							key={userPool[collaboratorCount].id}
							audioFile="https://res.cloudinary.com/degnyqukw/video/upload/v1681177822/SORRY_NOT_SORRY_lxkdaf.mp3"
							userPool={userPool}
							artistName={userPool[collaboratorCount].artist_name}
							location={userPool[collaboratorCount].location}
							image={userPool[collaboratorCount].profile_picture_url}
							collaboratorId={userPool[collaboratorCount].id}
							artistType={userPool[collaboratorCount].user_type.name}
							blurb={userPool[collaboratorCount].bio}
							genre="genre"
							exitDirection={exitDirection}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);

	function SwipeRight() {
		return (
			<motion.div
				className="absolute top-1/2 cursor-pointer right-[10%] lg:mx-24 text-accent"
				initial={{
					color: colors.accent,
					filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 1))",
					transition: { duration: 0.1, type: "linear" },
				}}
				whileTap={{
					color: colors.info,
					filter: "drop-shadow(8px 5px 0px rgba(0, 0, 0, 1))",
				}}
				whileHover={{
					color: colors.info,
					filter: "drop-shadow(12px 8px 0px rgba(0, 0, 0, 1))",
					transition: { duration: 0.05, type: "linear" },
				}}>
				<Right onClick={rightClick} className="text-[3em] xl:text-[6em]" />
			</motion.div>
		);
	}
	function SwipeLeft() {
		return (
			<motion.div
				className="
				absolute top-1/2 cursor-pointer left-[10%] lg:mx-24"
				initial={{
					color: colors.accent,
					filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 1))",
					transition: { duration: 0.1, type: "linear" },
				}}
				whileTap={{
					color: colors.info,
					filter: "drop-shadow(8px 5px 0px rgba(0, 0, 0, 1))",
				}}
				whileHover={{
					color: colors.info,
					filter: "drop-shadow(12px 8px 0px rgba(0, 0, 0, 1))",
					transition: { duration: 0.05, type: "linear" },
				}}>
				<Left onClick={leftClick} className="text-[3em] xl:text-[6em]" />
			</motion.div>
		);
	}
};

export default Explore;
