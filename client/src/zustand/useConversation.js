import { create } from 'zustand';

const useConversion = create((set) => ({
    selectedConversion: null,
    setSelectedConversion: (selectedConversion) => set({ selectedConversion: selectedConversion }),
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}))

export default useConversion;