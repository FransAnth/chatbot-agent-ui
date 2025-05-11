import { useEffect, useRef } from "react";
import { useConversationStore } from "../../store/chat-container-store";
import MarkdownParser from "../../helpers/markdown-parser";

const Conversations = () => {
  const conversations = useConversationStore(
    (state: any) => state.conversations
  );

  const convoRef = useRef<any>(null);

  const handleImageClick = (img: any) => {
    if (!img) return;

    if (img.requestFullscreen) {
      img.requestFullscreen();
    } else if ((img as any).webkitRequestFullscreen) {
      (img as any).webkitRequestFullscreen();
    } else if ((img as any).msRequestFullscreen) {
      (img as any).msRequestFullscreen();
    }
  };

  useEffect(() => {
    const el = convoRef.current;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [conversations]);

  return (
    <>
      <div className="w-full h-full overflow-auto" ref={convoRef}>
        <ul className="pt-8">
          {conversations.map((conv: any, index: number) => {
            const role = conv.role;
            const content = conv.content;
            const timestamp = conv.timestamp;

            console.log(conv.attachment);

            if (role == "user") {
              return (
                <div className="flex w-full justify-end pr-8 mb-4" key={index}>
                  <div className="flex flex-col items-end gap-1 w-full">
                    {conv?.attachment && (
                      <div
                        className="w-50 cursor-pointer"
                        onClick={(e) =>
                          handleImageClick(e.currentTarget.querySelector("img"))
                        }
                      >
                        <img
                          src={URL.createObjectURL(conv.attachment)}
                          alt="preview"
                          className="object-cover rounded-md border-1 bg-gray-200"
                        />
                      </div>
                    )}
                    <div
                      className={`flex flex-col rounded-2xl max-w-[70%] border-1 border-gray-400 bg-primary py-2 px-4 text-white ${
                        conv?.attachment ? " rounded-tr-md" : ""
                      }`}
                    >
                      <span>{content}</span>
                      <div className="flex justify-end text-xs mt-2">
                        {timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (role == "assistant") {
              return (
                <div className="flex w-full mb-4 pl-8 gap-2" key={index}>
                  <div className="flex flex-col rounded-2xl p-4 bg-background-light max-w-[70%] border-1 border-gray-400">
                    {content && (
                      <MarkdownParser markdown={content}></MarkdownParser>
                    )}

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
