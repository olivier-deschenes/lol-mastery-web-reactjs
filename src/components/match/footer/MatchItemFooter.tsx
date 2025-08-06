import { MessageCircle, Heart, ExternalLink } from "lucide-react";

export const MatchItemFooter = () => {
  return (
    <div className={"flex gap-2.5 w-full p-2.5 justify-between text-slate-500"}>
      <div>
        <MessageCircle />
      </div>
      <div>
        <Heart />
      </div>
      <div>
        <ExternalLink />
      </div>
    </div>
  );
};
