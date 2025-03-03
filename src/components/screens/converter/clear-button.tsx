import type { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

const ClearButton = ({ setHtml }: { setHtml: Dispatch<SetStateAction<string>> }) => {
    const clearAll = () => {
        setHtml("");
        toast("Cleared", { description: "All content has been cleared." });
    };

    return (
        <Button variant="outline" onClick={clearAll} className="cursor-pointer">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Clear
        </Button>
    );
};

export { ClearButton };
