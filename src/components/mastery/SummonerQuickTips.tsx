import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KeyboardIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const SUMMONER_QUICK_TIPS_DISMISSED = "quick-tips-dismissed";

export function SummonerQuickTips() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem(SUMMONER_QUICK_TIPS_DISMISSED);

    if (!hasDismissed) {
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(SUMMONER_QUICK_TIPS_DISMISSED, "true");
  };

  if (!show) return null;

  return (
    <Alert variant={"primary"} className={"relative"}>
      <KeyboardIcon className="h-4 w-4" />
      <AlertTitle>Quick Tips!</AlertTitle>
      <AlertDescription>
        You can search for multiple summoners by entering their names separated
        by a newline using <kbd>Shift</kbd> + <kbd>Enter</kbd>.
      </AlertDescription>
      <div className={"absolute right-0 top-0"}>
        <Button variant={"ghost"} size={"icon"} onClick={handleDismiss}>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}
