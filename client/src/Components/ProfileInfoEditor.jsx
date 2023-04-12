import React from "react";
import { FaTelegramPlane as Send } from "react-icons/fa";

const ProfileInfoEditor = ({ patchFunction }) => {
	return (
		<div className="flex flex-row">
			<label htmlFor="bio" />
			<textarea
				id="bio"
				rows={2}
				className="w-full rounded text-primary"
				name="bio"
				type="text"
			/>
			<button className="mx-2">
				<Send
					onClick={patchFunction}
					size="1.5em"
					className="text-info hover:text-accent transition"
				/>
			</button>
		</div>
	);
};

export default ProfileInfoEditor;
