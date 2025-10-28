import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ProviderHistory = () => {
  return (
    <div className="grid gap-4">
      <Label>History of Transaction</Label>
      <Button><Download /> Download Transaction</Button>
    </div>
  )
};

export default ProviderHistory;
