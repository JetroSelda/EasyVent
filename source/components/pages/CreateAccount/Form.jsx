import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CustomerForm from "./CustomerForm"
import ProviderForm from "./ProviderForm"

const CreateAccountForm = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Tabs defaultValue="customer">
        <TabsList>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="provider">Provider</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
              <CustomerForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="provider">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
              <ProviderForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default CreateAccountForm;
