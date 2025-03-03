import { converter } from "@/lib/converter";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

import { ClearButton } from "./clear-button";
import { CopyJSX } from "./copy-jsx";
import { ThemeToogle } from "./theme-toogle";

const Converter = () => {
    const [html, setHtml] = useState("");

    const jsx = converter(html);

    return (
        <Card className="w-full max-w-7xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 @container">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">HTML Input</h3>
                            <div className="flex gap-2">
                                <ClearButton setHtml={setHtml} />
                                <ThemeToogle />
                            </div>
                        </div>
                        <Textarea
                            placeholder="Paste your HTML here..."
                            className="min-h-[300px] @lg:min-h-[400px] font-mono text-sm resize-none"
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 @container">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium h-9">JSX Output</h3>
                            {jsx && <CopyJSX jsx={jsx} />}
                        </div>
                        <Textarea
                            className="min-h-[300px] @lg:min-h-[400px] font-mono text-sm resize-none"
                            value={jsx}
                            readOnly
                            placeholder="JSX will appear here after conversion..."
                        />
                    </div>
                </div>
            </CardContent>
            <Toaster />
        </Card>
    );
};

export { Converter };
