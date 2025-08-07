import { Heading, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export const ChatRoom = ({ join }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  const hadleSubmit = (param) => {
    param.preventDefault(); // stops updating a page
    join(user, room);
  };
  return (
    <form
      onSubmit={hadleSubmit}
      className="max-w-sm w-full bg-white p-8 rouded shadow-lg"
    >
      <Heading>Chat</Heading>
      <div className="mb-4">
        <Text fontSize={"sm"}>User name</Text>
        <Input
          name="user"
          placeholder="Enter your name"
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Text fontSize={"sm"}>Chat name</Text>
        <Input
          name="room"
          placeholder="Enter chat name"
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <Button type="submit" colorScheme="green">
        Join
      </Button>
    </form>
  );
};
