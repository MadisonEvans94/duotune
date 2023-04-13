import React from "react";
import { useState } from "react";
import { FaTelegramPlane as Send } from "react-icons/fa";

const ProfileInfoEditor = ({ patchFunction, placeHolderText }) => {
	const [inputText, setInputText] = useState("");
	return (
		<div className="flex flex-row">
			<label htmlFor="bio" />
			<textarea
				id="bio"
				rows={2}
				className="w-full rounded text-primary"
				name="bio"
				type="text"
				placeholder={placeHolderText}
				onChange={(event) => {
					setInputText(event.target.value);
					console.log(event.target.value);
				}}
			/>
			<button className="mx-2">
				<Send
					onClick={() => {
						patchFunction(inputText);
					}}
					size="1.5em"
					className="text-info hover:text-accent transition"
				/>
			</button>
		</div>
	);
};

export default ProfileInfoEditor;
