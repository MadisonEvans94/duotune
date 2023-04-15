import React from "react";

const ChatRoomLayout = ({
	chatRoomObjects,
	ChatRoomList,
	MessageDisplay,
	MessageInput,
}) => {
	return (
		<div className="h-full flex flex-row ">
			<div className="border-r border-t">
				{chatRoomObjects && <ChatRoomList />}
			</div>
			<div className="w-full pt-4 h-full flex flex-col border-t">
				<MessageDisplay />
				<MessageInput />
			</div>
		</div>
	);
};

export default ChatRoomLayout;
