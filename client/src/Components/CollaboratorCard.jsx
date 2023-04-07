import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt as Location } from "react-icons/fa";
import { RiMusicFill as Note } from "react-icons/ri";
import {
	AiFillPlayCircle as Play,
	AiFillPauseCircle as Pause,
} from "react-icons/ai";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import colors from "../utils/colorPalette";
const CollaboratorCard = ({
	image,
	collaboratorId,
	audioFile,
	exitDirection,
	location,
	artistName,
	artistType,
	genre,
	blurb,
}) => {
	const [wavesurfer, setWavesurfer] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const ws = WaveSurfer.create({
			container: `#wavesurfer-${collaboratorId}`,
			waveColor: colors.info,
			progressColor: colors.accent,
			cursorColor: colors.accent,
			cursorWidth: 3,
			barWidth: 3,
			height: 100,
			partialRender: true,
			responsive: true,
		});

		ws.load(audioFile);
		setWavesurfer(ws);

		return () => {
			ws.destroy();
		};
	}, [collaboratorId, audioFile]);

	const handlePlayPause = () => {
		if (wavesurfer) {
			wavesurfer.playPause();
			setIsPlaying(!isPlaying);
		}
	};
	const exitAnimation =
		exitDirection === 1
			? {
					x: 300,
					opacity: 0,
					rotate: 5,
					transition: { duration: 1, type: "spring" },
			  }
			: {
					x: -300,
					opacity: 0,
					rotate: -5,
					transition: { duration: 1, type: "spring" },
			  };

	return (
		<motion.div
			initial={{ y: 300, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: { duration: 1, type: "spring" },
			}}
			exit={exitAnimation}
			className="
            relative w-[400px] h-[800px] overflow-hidden rounded shadow-lg my-6
            md:w-[500px]
            ">
			<img
				src={image}
				alt="profpic"
				className="
                object-cover w-full h-80
                "
			/>

			<div
				className="
                flex flex-col items-center px-10
                ">
				<h1
					className="
                    text-4xl mt-4 text-center
					font-display font-bold text-info
                    md:text-5xl md:mt-6">
					{artistName}
				</h1>
				<h3
					className="
                    italic text-xl mb-6 text-accent my-4 font-thin">
					{artistType}
				</h3>
				<p
					className="
                    flex flex-row items-center w-full text-md text-info text-left font-thin">
					<Location className="mr-1 text-accent" />
					{location}
				</p>
				<p
					className="
                    flex flex-row items-center w-full text-md text-info text-left font-thin">
					<Note className="mr-1 text-accent" />
					{genre}
				</p>
				<p
					className="
                    mt-2 text-sm text-info font-thin">
					{blurb}
				</p>
			</div>
			<div
				className="
                    h-fit mb-4 w-full flex flex-row items-center mt-16 px-2 pb-4 
                    md:mx-auto ">
				{isPlaying ? (
					<Pause
						size="4em"
						onClick={handlePlayPause}
						color={colors.accent}
						style={{ marginInline: ".25em" }}
						className="cursor-pointer"
					/>
				) : (
					<Play
						size="4em"
						onClick={handlePlayPause}
						color={colors.accent}
						style={{ marginInline: ".25em" }}
						className="cursor-pointer overflow-hidden"
					/>
				)}
				<div id={`wavesurfer-${collaboratorId}`} className="w-full h-full" />
			</div>
		</motion.div>
	);
};

export default CollaboratorCard;
