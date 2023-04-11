// Blob.js
import React, { useEffect } from "react";
import anime from "animejs";

const Blob = ({ duration, color }) => {
	let morphingPaths = [
		"M158 -152.5C198.2 -117.9 219.6 -58.9 225.5 5.9C231.4 70.7 221.8 141.4 181.6 175.6C141.4 209.8 70.7 207.4 17.7 189.7C-35.4 172 -70.7 139 -98 104.9C-125.4 70.7 -144.7 35.4 -150.1 -5.4C-155.5 -46.2 -147.1 -92.4 -119.7 -127.1C-92.4 -161.7 -46.2 -184.9 6.4 -191.2C58.9 -197.6 117.9 -187.2 158 -152.5",
		"M181.6 -183.8C221.8 -141.4 231.4 -70.7 213.7 -17.7C196 35.4 151 70.7 110.9 119.7C70.7 168.7 35.4 231.4 0 231.4C-35.4 231.4 -70.7 168.7 -115.7 119.7C-160.7 70.7 -215.4 35.4 -217.5 -2.1C-219.6 -39.6 -169.2 -79.2 -124.2 -121.5C-79.2 -163.9 -39.6 -208.9 15.6 -224.5C70.7 -240 141.4 -226.1 181.6 -183.8",
		"M106.1 -108.6C131.1 -81.1 140.5 -40.5 142.2 1.6C143.8 43.8 137.7 87.7 112.7 114C87.7 140.3 43.8 149.2 -10.6 159.8C-65.1 170.4 -130.1 182.8 -180.1 156.4C-230.1 130.1 -265.1 65.1 -252.9 12.1C-240.8 -40.8 -181.6 -81.6 -131.6 -109.1C-81.6 -136.6 -40.8 -150.8 -0.1 -150.7C40.5 -150.5 81.1 -136.1 106.1 -108.6",
		"M151.2 -139.6C187.9 -114.6 203.9 -57.3 210.7 6.7C217.4 70.7 214.8 141.4 178.1 168.4C141.4 195.4 70.7 178.7 7 171.8C-56.8 164.8 -113.6 167.6 -152.9 140.6C-192.3 113.6 -214.1 56.8 -220.1 -6C-226.2 -68.8 -216.3 -137.7 -177 -162.7C-137.7 -187.7 -68.8 -168.8 -5.8 -163.1C57.3 -157.3 114.6 -164.6 151.2 -139.6",
		"M154.6 -170.6C179.6 -129.6 164.8 -64.8 153.7 -11.1C142.7 42.7 135.3 85.3 110.3 134.3C85.3 183.3 42.7 238.7 -14 252.7C-70.7 266.7 -141.4 239.4 -170.1 190.4C-198.8 141.4 -185.4 70.7 -177.8 7.5C-170.3 -55.6 -168.6 -111.3 -139.9 -152.3C-111.3 -193.3 -55.6 -219.6 4.6 -224.2C64.8 -228.8 129.6 -211.6 154.6 -170.6",
	];
	const colors = ["#8455be", "#e9768f", "#fa8072", "#e9768f", "#8455be"];

	useEffect(() => {
		const animation = anime({
			targets: "#blob-path",
			d: morphingPaths,
			duration,
			loop: true,
			easing: "linear",
			direction: "alternate",
			keyframes: colors.map((color) => ({ fill: color })),
		});

		return () => {
			animation.pause();
		};
	}, [colors, duration]);

	return (
		<svg
			className="w-full h-full absolute"
			id="visual"
			viewBox="0 0 600 600"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
			version="1.1">
			<mask id="text-mask" />
			<g transform="translate(451.76239464738063 277.3923827674436)">
				<path
					id="blob-path"
					d="M96.9 -100.4C123 -70.7 140 -35.4 157.7 17.7C175.4 70.7 193.8 141.4 167.6 175.8C141.4 210.1 70.7 208 5.5 202.5C-59.6 197 -119.3 187.9 -151.4 153.6C-183.6 119.3 -188.3 59.6 -181.5 6.8C-174.6 -46 -156.3 -91.9 -124.1 -121.6C-91.9 -151.3 -46 -164.6 -5.3 -159.3C35.4 -154 70.7 -130 96.9 -100.4"></path>
			</g>
		</svg>
	);
};

export default Blob;
