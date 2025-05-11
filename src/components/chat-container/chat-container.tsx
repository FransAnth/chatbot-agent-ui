import { useConversationStore } from "../../store/chat-container-store";
import Conversations from "./conversation-container";
import UserInputField from "./user-input-field";

const ChatContainer = () => {
  const conversations = useConversationStore(
    (state: any) => state.conversations
  );

  return (
    <>
      <div
        className={`w-full min-w-100 max-w-200 transition-all duration-400 z-0 ${
          conversations.length > 0 ? "h-[78%]" : "h-0"
        }`}
      >
        <Conversations />
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 z-10 w-full px-4 max-w-[800px] transition-all duration-400 ${
          conversations.length === 0
            ? "top-1/2 -translate-y-1/2 absolute"
            : "fixed bottom-8"
        }`}
      >
        {conversations.length === 0 && (
          <div className="absolute bottom-60 left-0 right-0 flex flex-col justify-center items-center text-3xl text-center z-0">
            <div>Hi there, I am your Chatbot Assistant</div>
            <div className="opacity-70">How can I help you today?</div>
          </div>
        )}
        <UserInputField />
      </div>
    </>
  );
};

export default ChatContainer;
