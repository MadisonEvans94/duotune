import React from "react";
import { useContext, useState } from "react";
import UserContext from "../Components/Contexts/UserContext";
import { motion } from "framer-motion";
import matches from "../seed/matches.json";
import { FaUserFriends as Connect } from "react-icons/fa";
const Profile = () => {
	const { user } = useContext(UserContext);
	const [showProfileEditModal, setShowProfileEditModal] = useState(false);
	const data = {
		genres: ["hip-hop", "r&b"],
		social_links: ["https://twitter.com/", "https://soundcloud.com/"],
		song_sample: "https://soundcloud.com",
	};
	return (
		<>
			<div className={showProfileEditModal ? "" : "hidden"}>asdf</div>
			{user && (
				<>
					<div className="w-full flex flex-row justify-end px-4 pt-2">
						<motion.button
							initial={{ x: 0, y: 0, boxShadow: "0px 0px 0px 0px black" }}
							whileHover={{
								x: -2,
								y: -2,
								boxShadow: "4px 4px 1px 0px black",
								transition: { type: "spring", duration: 0.2 },
							}}
							className="
							text-info bg-accent font-display text-right text-xs p-1 rounded w-fit">
							Edit Profile
						</motion.button>{" "}
					</div>
					<div className="flex flex-row justify-center w-full h-full text-info">
						<div className="w-1/3 h-full p-4 flex flex-col justify-start">
							<div className="overflow-hidden relative rounded-md text-primary h-[460px] flex flex-col justify-end">
								<img
									src={user.profile_picture_url}
									alt="prof pic"
									className="w-full h-full absolute object-cover"
								/>
								<div className="w-full h-full absolute bg-gradient-to-t from-[#00000055] to-fuchsia-[#00000000]" />
							</div>
							<div className="z-50 px-4">
								<h1 className="text-4xl font-display mt-6 text-info">
									{user.artist_name}
								</h1>
								<p className="my-2 font-thin italic">{user.user_type.name}</p>
							</div>
							<ul className="text-sm p-4 rounded-md h-1/4 flex flex-col justify-start mb-4 font-thin text-accent">
								<li>{user.location}</li>
								{data.genres.map((genre, key) => {
									return <div key={key}>{genre}</div>;
								})}
								<li>Searching for a user.in_search_of</li>
							</ul>
						</div>

						<div
							className="w-2/3 h-full pr-4 flex flex-col justify-start 
							xl:w-[900px]">
							<h2 className="text-2xl my-4 font-display text-center text-accent">
								Bio
							</h2>
							<div className="p-4 h-[150px] flex flex-col justify-around rounded-lg  border-accent border transition">
								{user.bio}
							</div>
							<h2 className="text-2xl my-4 font-display text-center text-accent">
								My Sound
							</h2>
							<div className="p-4 h-[150px] flex flex-col justify-around rounded-lg border-accent border transition">
								data.song_sample
							</div>
							<div className="flex flex-row justify-center text-accent items-center my-4">
								<h2 className="text-2xl font-display text-center text-accent">
									User Type
								</h2>
								{/* <Connect className="mx-4" size="1.5em" /> */}
							</div>
							<div className="p-4 h-[150px] flex flex-col justify-around rounded-lg  border-accent border transition">
								<div className="w-full flex flex-row justify-around">
									Producer
								</div>
							</div>
							<div className="w-full h-full relative flex flex-col">
								<h2 className="text-2xl font-display text-center my-4 text-accent">
									Recent Matches
								</h2>
								<div className=" h-full w-full grid grid-cols-3 gap-2 justify-between items-center rounded-lg mb-12">
									{/* {matches &&
										matches.map((match, key) => (
											<motion.div
												initial={{ scale: 1 }}
												whileHover={{
													scale: 1.1,
													transition: { type: "spring", duration: 0.4 },
												}}
												key={key}
												className="
            								group cursor-pointer mx-auto h-[100px] w-[120px] rounded overflow-y-auto relative">
												<div
													className="
												absolute w-full h-full bg-[#000000aa] flex flex-row opacity-0 group-hover:opacity-100  transition-opacity duration-300">
													<div
														className="
													w-full my-auto text-white text-center">
														<h2 className="text-xl font-thin">
															{match.artist_name}
														</h2>
														<p className="text-sm font-thin">
															{match.user_type.name}
														</p>
													</div>
												</div>
												<img
													className="
												w-full h-full object-cover"
													src={match.profile_picture_url}
													alt={match.artist_name}
												/>
											</motion.div>
										))} */}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
