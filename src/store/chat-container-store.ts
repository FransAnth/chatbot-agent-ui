import { create } from "zustand";

type ConversationStore = {
  conversations: any; // or object[] if you're storing objects
  addConversation: (newConversation: any) => void;
  removeConversation: (indexToRemove: any) => void;
};

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  addConversation: (newConversation) =>
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    })),
  removeConversation: (indexToRemove) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (_: any, index: number) => index !== indexToRemove
      ),
    })),
}));
