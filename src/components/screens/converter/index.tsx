import { toast } from "@/lib/toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { ArrowRightIcon, CopyIcon, MoonIcon, RefreshCwIcon, SunIcon } from "lucide-react";

const Converter = () => {
    const [html, setHtml] = useState<string>("");
    const [jsx, setJsx] = useState<string>("");

    const convertHtmlToJsx = () => {
        try {
            const result = html;
            setJsx(result);
            toast.success("Conversion Complete", {
                description: "HTML has been converted to JSX."
            });
        } catch (error) {
            toast.error("Conversion Error", {
                description: "There was an error converting your HTML."
            });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsx);
        toast.success("Copied!", {
            description: "JSX copied to clipboard."
        });
    };

    const clearAll = () => {
        setHtml("");
        setJsx("");
        toast("Cleared", { description: "All content has been cleared." });
    };

    return (
        <Card className="w-full max-w-7xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* HTML Input Section */}
                    <div className="flex-1 @container">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">HTML Input</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={clearAll}>
                                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                                    Clear
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        /*setTheme(theme === "dark" ? "light" : "dark")*/
                                    }}
                                >
                                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            placeholder="Paste your HTML here..."
                            className="min-h-[300px] @lg:min-h-[400px] font-mono text-sm resize-none"
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                        />
                        <Button
                            className="mt-4 w-full"
                            onClick={convertHtmlToJsx}
                            disabled={!html.trim()}
                        >
                            Convert to JSX
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* JSX Output Section */}
                    <div className="flex-1 @container">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">JSX Output</h3>
                            {jsx && (
                                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                    <CopyIcon className="h-4 w-4 mr-2" />
                                    Copy JSX
                                </Button>
                            )}
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
        </Card>
    );
};

export { Converter };
