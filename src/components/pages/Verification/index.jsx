import { CheckCircle } from "lucide-react";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import { Card } from "@/components/ui/card";

const Verification = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="w-full flex items-center justify-center">
        <div className="w-[80%]">
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="p-8 max-w-md w-full text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <p variant="h2" className="mt-4 mb-2">
                Service Listing Under Review
              </p>
              <p variant="body1" className="text-gray-600">
                Thank you for your submission. We are currently reviewing your listing, and you can expect a response within <strong>2 to 3 business days</strong>.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Verification;