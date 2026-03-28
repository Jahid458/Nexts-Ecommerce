import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils"

export default function ButtonLoading({
  type,
  text,
  loading,
    className,
  onClick,
  ...props
}) {
  return (
    <Button 
      type={type}
      className={cn("", className)}
      disabled={loading}
      onClick={onClick}
       {...props}>
      {loading && <Loader2 className="animate-spin" />}

      {text}
    </Button>
  );
}
