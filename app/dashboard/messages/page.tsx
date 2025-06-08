import { Button } from "@/components/ui/button"
import { MessagesInterface } from "@/components/buyer/messages-interface"
import { Plus } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with data sellers and support.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="h-[calc(100vh-12rem)]">
        <MessagesInterface />
      </div>
    </div>
  )
}
