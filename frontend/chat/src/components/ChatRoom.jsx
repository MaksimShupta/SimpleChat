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
/*export const ChatRoom = () => {
  return (
    <form className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">User name</label>
        <input
          name="userName"
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </form>
  );
};*/
