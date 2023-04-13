import React from "react";

const RecentMatches = () => {
	return (
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
	);
};

export default RecentMatches;
