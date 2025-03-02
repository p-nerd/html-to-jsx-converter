import { toast } from "@/lib/toast";
import { useConverter } from "@/states/converter";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

const CopyJSX = () => {
    const { jsx } = useConverter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsx);
        toast.success("Copied!", {
            description: "JSX copied to clipboard."
        });
    };

    return (
        <Button variant="outline" onClick={copyToClipboard} className="cursor-pointer">
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy JSX
        </Button>
    );
};

export { CopyJSX };
