import React from "react";
import { useState } from "react";
import {
	AiFillPlayCircle as Play,
	AiFillPauseCircle as Pause,
} from "react-icons/ai";
const Waveform = ({ isPlaying, handlePlayPause, collaboratorId }) => {
	return (
		<div
			className="
                    absolute mb-4 w-full flex flex-row items-center border-black bottom-0 px-2 pb-4
                    md:mx-auto">
			{isPlaying ? (
				<Pause
					size="4em"
					onClick={handlePlayPause}
					color="#1f2937"
					style={{ marginInline: ".25em" }}
					className="cursor-pointer"
				/>
			) : (
				<Play
					size="4em"
					onClick={handlePlayPause}
					color="#1f2937"
					style={{ marginInline: ".25em" }}
					className="cursor-pointer"
				/>
			)}
			<div id={`wavesurfer-${collaboratorId}`} className="w-full h-full" />
		</div>
	);
};

export default Waveform;
