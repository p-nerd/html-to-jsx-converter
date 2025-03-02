import { toast } from "@/lib/toast";
import { useConverter } from "@/states/converter";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ClipboardCheckIcon, CopyIcon } from "lucide-react";

const CopyJSX = () => {
    const { jsx } = useConverter();

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
            className="cursor-pointer transition-all w-[124px] flex justify-between items-center duration-300"
        >
            {copied ? (
                <>
                    <ClipboardCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                    Copied!
                </>
            ) : (
                <>
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Copy JSX
                </>
            )}
        </Button>
    );
};

export { CopyJSX };
