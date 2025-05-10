import { useEffect, useRef } from "react";
import { useConversationStore } from "../../store/chat-container-store";

const Conversations = () => {
  const conversations = useConversationStore(
    (state: any) => state.conversations
  );

  const convoRef = useRef<any>(null);

  useEffect(() => {
    convoRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [conversations]);

  return (
    <>
      <div className="w-full h-full overflow-auto">
        <ul className="pt-8" ref={convoRef}>
          {conversations.map((conv: any, index: number) => {
            const role = conv.role;
            const content = conv.content;
            const timestamp = conv.timestamp;

            if (role == "user") {
              return (
                <div
                  className="flex w-full  justify-end pr-8 mb-4 gap-2"
                  key={index}
                >
                  <div className="flex flex-col rounded-2xl max-w-[70%] border-1 border-gray-400 bg-primary py-2 px-4 text-white">
                    <span>{content}</span>
                    <div className="flex justify-end text-xs mt-2">
                      {timestamp}
                    </div>
                  </div>
                </div>
              );
            } else if (role == "assistant") {
              return (
                <div className="flex w-full mb-4 pl-8 gap-2" key={index}>
                  <div className="flex flex-col rounded-2xl p-4 bg-background-light max-w-[70%] border-1 border-gray-400">
                    <span>{content}</span>
                    <div className="flex justify-end text-xs mt-2">
                      {timestamp}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex w-full mb-4 pl-8 gap-2" key={index}>
                  <div className="flex flex-col justify-center text-white gap-2 max-w-[60%]">
                    <div id="chatLoader"></div>
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

export default Conversations;
