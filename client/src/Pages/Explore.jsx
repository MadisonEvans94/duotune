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
import { useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";
const Explore = () => {
	const [collaboratorCount, setCollaboratorCount] = useState(1);
	const [exitDirection, setExitDirection] = useState(0);
	const [directionChanged, setDirectionChanged] = useState(false);
	const [userPool, setUserPool] = useState(null);
	const { user, setUser, fetchUser } = useContext(UserContext);

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
				(data) => data[0] === "match" && fetchUser(user.id, setUser)

				// console.log(
				// 	`\n\nEXPLORE COMPONENT: Swipe created: by user ${user.id}\nswipe objects: `,
				// 	data
				// )
			)
			.catch((error) => console.log("\n\n EXPLORE COMPONENT: Error:", error));
		setExitDirection(1);
		setDirectionChanged(true);
	}

	function leftClick() {
		// const swipeData = {
		// 	swiper_id: user.id,
		// 	swiped_id: userPool[collaboratorCount].id,
		// 	liked: false,
		// };
		// fetch("/swipes", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(swipeData),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log("Swipe created:", data))
		// 	.catch((error) => console.log("Error:", error));
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
					{userPool && collaboratorCount < userPool.length && (
						<CollaboratorCard
							key={userPool[collaboratorCount].id}
							audioFile="https://res.cloudinary.com/degnyqukw/video/upload/v1680658098/carti_thing_ih9wft.mp3"
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
};

export default Explore;
