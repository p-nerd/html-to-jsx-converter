import { useConverter } from "@/states/converter";

import { ThemeToogle } from "@/components/elements/theme-toogle";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

import { ClearButton } from "./clear-button";
import { CopyJSX } from "./copy-jsx";

const Converter = () => {
    const { html, jsx, setHtml } = useConverter();

    return (
        <Card className="w-full max-w-7xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 @container">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">HTML Input</h3>
                            <div className="flex gap-2">
                                <ClearButton />
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
                            <h3 className="text-lg font-medium">JSX Output</h3>
                            {jsx && <CopyJSX />}
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
