import { toast } from "@/lib/toast";

import HTMLtoJSX from "./htmltojsx";

export const converter = (html: string) => {
    try {
        const htmltojsx = new HTMLtoJSX({ createClass: false });
        const jsx = htmltojsx.convert(html);
        console.log(jsx);
        return jsx;
    } catch (error) {
        toast.error("Conversion Error", {
            description: "There was an error converting your HTML."
        });
    }
};
