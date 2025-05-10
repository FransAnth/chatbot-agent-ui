import { useConversationStore } from "../../store/chat-container-store";
import Conversations from "./conversation-container";
import UserInputField from "./user-input-field";

const ChatContainer = () => {
  const conversations = useConversationStore(
    (state: any) => state.conversations
  );

  console.log(conversations.length);

  return (
    <>
      <div
        className={`w-full px-82 transition-all duration-500 ${
          conversations.length > 0 ? "h-[82%]" : "h-0"
        }`}
      >
        <Conversations />
      </div>
      <div className="flex flex-col gap-20 w-full items-center mt-8">
        <div
          className={`flex-col justify-center items-center text-3xl text-center ${
            conversations.length == 0 ? "flex" : "hidden"
          }`}
        >
          <div>Hi there, I am your Chatbot Assistant</div>
          <div className="opacity-70">How can I help you today?</div>
        </div>
        <UserInputField />
      </div>
    </>
  );
};

export default ChatContainer;
