import type { Dispatch, SetStateAction } from "react";

import { toast } from "@/lib/toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

const ClearButton = ({ setHtml }: { setHtml: Dispatch<SetStateAction<string>> }) => {
    const [isRotating, setIsRotating] = useState(false);

    const clearAll = () => {
        setIsRotating(true);
        setHtml("");
        toast("Cleared", { description: "All content has been cleared." });

        setTimeout(() => setIsRotating(false), 500);
    };

    return (
        <Button
            variant="outline"
            onClick={clearAll}
            className="cursor-pointer transition-all duration-300 ease-in-out"
            disabled={isRotating}
        >
            <RefreshCwIcon
                className={`h-4 w-4 mr-2 transition-transform duration-500 ${isRotating ? "rotate-180" : ""}`}
            />
            Clear
        </Button>
    );
};

export { ClearButton };
