// import { toast } from "@/lib/toast";

import HTMLToJSX from "htmltojsx";

const htmltojsx = new HTMLToJSX({ createClass: false });

export const converter = (html: string) => {
    try {
        const jsx = htmltojsx.convert(html);
        console.log(jsx);
        // toast.success("Conversion Complete", { description: "HTML has been converted to JSX." });
        return jsx;
    } catch (error) {
        // toast.error("Conversion Error", {
        //     description: "There was an error converting your HTML."
        // });
    }
};
