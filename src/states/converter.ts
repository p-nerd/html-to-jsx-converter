import { converter } from "@/lib/converter";
import { create } from "zustand";

const useConverter = create<{
    html: string;
    jsx: string;
    setHtml: (html: string) => void;
}>((set) => ({
    html: "",
    jsx: "",
    setHtml: (html: string) => set({ html, jsx: converter(html) })
}));

export { useConverter };
