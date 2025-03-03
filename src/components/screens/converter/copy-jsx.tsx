import { toast } from "@/lib/toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ClipboardCheckIcon, CopyIcon } from "lucide-react";

const CopyJSX = ({ jsx }: { jsx: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsx);
        setCopied(true);
        toast.success("Copied!", { description: "JSX copied to clipboard." });
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Button
            variant="outline"
            onClick={copyToClipboard}
            disabled={copied}
            className={`cursor-pointer w-[124px] flex justify-between items-center transition-all duration-300 ease-in-out`}
        >
            {copied ? (
                <>
                    <ClipboardCheckIcon
                        className="h-4 w-4 mr-2 text-green-500
                            animate-in fade-in-50 duration-200"
                    />
                    <span className="animate-in fade-in-50 duration-300">Copied!</span>
                </>
            ) : (
                <>
                    <CopyIcon
                        className="h-4 w-4 mr-2
                            transition-opacity duration-300"
                    />
                    <span className="transition-opacity duration-300">Copy JSX</span>
                </>
            )}
        </Button>
    );
};

export { CopyJSX };
