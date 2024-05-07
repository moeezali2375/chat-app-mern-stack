import { useState } from "react";
import axios from "axios";
import { useToast, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";

const ScrollableChat = ({ messages, setUpdateMsg, setNewMsg, searchQuery }) => {
  const { user } = ChatState();
  const toast = useToast();

  const handleDeleteMsg = async (chatId, messageId, senderId) => {
    console.log(messages);
    try {
      //   setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // const content = "hello";
      const { data } = await axios.delete(
        `/api/message/`,
        { chatId, messageId, senderId },
        config
      );

      toast({
        title: "Message Deleted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleEditMsg = (message) => {
    setUpdateMsg(message);
    setNewMsg(message.content);
  };

  const handleSpamMsg = async (inputData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const message = inputData;
      const url = "/api/message/predict/" + message;
      const { data } = await axios.get(url, config);
      if (data.spam === 1) {
        toast({
          title: "Msg is Spam!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Msg is not Spam!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error while detecting Spam!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const highlightSearch = (content) => {
    if (!searchQuery.trim()) return content; // Return content as is if no search query
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return content.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            {m.sender._id === user._id ? (
              <Menu>
                <MenuButton
                  style={{
                    backgroundColor: `${
                      m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                >
                  {highlightSearch(m.content)}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleDeleteMsg(m.chat._id, m._id, m.sender._id)
                    }
                  >
                    Delete Message
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleEditMsg(m)}>
                    Edit Message
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleSpamMsg(m.content)}>
                    Detect Spam
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {highlightSearch(m.content)}
              </span>
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

// import React, { useState } from 'react';

// function MyComponent() {
//   const [lastTouchTime, setLastTouchTime] = useState(0);

//   const handleTouchStart = () => {
//     const now = Date.now();
//     const timeSinceLastTouch = now - lastTouchTime;
//     if (timeSinceLastTouch < 300) { // 300ms threshold for double tap
//       // Perform double tap action
//       console.log('Double tap detected!');
//     }
//     setLastTouchTime(now);
//   };

//   return (
//     <div onTouchStart={handleTouchStart}>
//       Tap me twice!
//     </div>
//   );
// }

// export default MyComponent;
