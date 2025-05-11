import { Paperclip, SendHorizontal, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useConversationStore } from "../../store/chat-container-store";
import { useMutation } from "@tanstack/react-query";
import { queryChatbotAgent } from "../../services/chatbot-service";

const UserInputField = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const textareaRef = useRef<any>(null);
  const conversations = useConversationStore((state) => state.conversations);
  const addConversation = useConversationStore(
    (state) => state.addConversation
  );
  const removeConversation = useConversationStore(
    (state) => state.removeConversation
  );

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "1.5rem";
      el.style.height = `${Math.min(el.scrollHeight, 192)}px`;
    }
  };

  const { isPending: chatbotThinking, mutate: invokeChatbotAgent } =
    useMutation({
      mutationFn: queryChatbotAgent,
      onSuccess: (response: any) => {
        const chatbotAgentResponse = response;
        const currentTime = getCurrentTime();
        const lastIndex = conversations.length - 1;

        removeConversation(lastIndex);
        addConversation({
          role: "assistant",
          content: chatbotAgentResponse,
          timestamp: currentTime,
        });
      },
    });

  const sendUserMessage = () => {
    const inputField = textareaRef.current;
    const userMessage = inputField.value;

    if (chatbotThinking != true && userMessage != "") {
      setImagePreview(null);

      const currentTime = getCurrentTime();
      const userMessageData = {
        role: "user",
        content: userMessage,
        timestamp: currentTime,
        attachment: imageFile,
      };
      const chatbotThinkingPlaceholder = {
        role: "loader",
      };

      clearTextArea();
      addConversation(userMessageData);
      addConversation(chatbotThinkingPlaceholder);

      const current_messages = [...conversations, userMessageData];

      const formData = new FormData();
      formData.append("messages", JSON.stringify(current_messages));
      if (imageFile) {
        formData.append("attachment", imageFile);
      }

      invokeChatbotAgent(formData);
      setImageFile(null);
    }
  };

  const clearTextArea = () => {
    textareaRef.current.value = "";
    textareaRef.current.style.height = "calc(var(--spacing) * 6)";
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const onKeyStroke = (event: any) => {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendUserMessage();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }

    textareaRef.current?.focus();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-background w-full min-w-100 max-w-200 rounded-3xl border-2 border-[#FFFFFF0F] p-4">
      {imagePreview && (
        <div className="relative w-20 h-20 mt-2">
          <div className="h-full p-1">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-full object-cover rounded-md border-1 bg-gray-200"
            />
          </div>
          <button
            onClick={removeImage}
            className="transition-all duration-500 absolute top-0 right-0 text-white rounded-full hover:scale-120"
          >
            <XIcon className="bg-secondary-dark rounded-full p-1" />
          </button>
        </div>
      )}
      <textarea
        ref={textareaRef}
        onInput={resizeTextarea}
        className="w-full h-6 max-h-32 px-2 resize-none font-medium mb-4"
        placeholder="Start Asking"
        onKeyDown={(event) => {
          onKeyStroke(event);
        }}
      ></textarea>
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex">
            <label className="cursor-pointer rounded-full bg-background-light border border-gray-400 p-1.5 hover:scale-110 transition-all duration-200 inline-flex items-center justify-center">
              <Paperclip color="gray" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div className="flex">
          <button
            className="rounded-full bg-send-icon p-1.5 hover:scale-110 transition-all duration-200"
            onClick={sendUserMessage}
          >
            <SendHorizontal color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInputField;
