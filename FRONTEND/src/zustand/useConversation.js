import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessage: (messages) => {
    if (typeof messages === 'function') {
      // If it's a function, use it to update the state
      set((state) => ({ messages: messages(state.messages) }));
    } else {
      // If it's an array, replace the messages
      set({ messages });
    }
  },
}));
export default useConversation;