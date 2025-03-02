import { toast } from "@/lib/toast";

import HTMLtoJSX from "./htmltojsx";

const htmltojsx = new HTMLtoJSX();

export const converter = (html: string) => {
    try {
        const jsx = htmltojsx.convert(html);

        return jsx;
    } catch (error) {
        toast.error("Conversion Error", {
            description: "There was an error converting your HTML."
        });
    }
};
