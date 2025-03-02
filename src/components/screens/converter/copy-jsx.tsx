import { toast } from "@/lib/toast";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

const CopyJSX = () => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText("<jsx/>");
        toast.success("Copied!", {
            description: "JSX copied to clipboard."
        });
    };

    return (
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy JSX
        </Button>
    );
};

export { CopyJSX };
