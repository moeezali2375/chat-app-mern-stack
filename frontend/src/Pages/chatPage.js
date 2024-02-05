import React from "react";

const chatPage = () => {
	const fetchChats = async () => {
		const data = await axois.get("/api/chat");
		console.log(data);
	};
	useEffect(() => {
		fetchChats();
	}, []);
};

export default chatPage;
