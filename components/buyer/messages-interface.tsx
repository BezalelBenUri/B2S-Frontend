"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Send, Paperclip } from "lucide-react"

export function MessagesInterface() {
  const [selectedConversation, setSelectedConversation] = useState("1")

  // Sample data - in a real app, this would come from an API
  const conversations = [
    {
      id: "1",
      name: "DataCorp Inc.",
      avatar: "DC",
      lastMessage: "Yes, we can provide that data format...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      name: "ClimateData",
      avatar: "CD",
      lastMessage: "The next update will be available on...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      name: "HealthData Analytics",
      avatar: "HA",
      lastMessage: "Thank you for your purchase!",
      time: "2 days ago",
      unread: false,
    },
    {
      id: "4",
      name: "Support Team",
      avatar: "ST",
      lastMessage: "How can we help you today?",
      time: "1 week ago",
      unread: false,
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "me",
      content:
        "Hello, I'm interested in your Urban Population Dataset. Does it include demographic breakdowns by age groups?",
      time: "10:15 AM",
    },
    {
      id: "2",
      sender: "them",
      content:
        "Hi John, thanks for your interest! Yes, the Urban Population Dataset includes comprehensive demographic breakdowns by age groups, gender, income levels, and education.",
      time: "10:20 AM",
    },
    {
      id: "3",
      sender: "me",
      content: "Great! And what file formats is the data available in? I need it in CSV format for my analysis tools.",
      time: "10:25 AM",
    },
    {
      id: "4",
      sender: "them",
      content:
        "Yes, we can provide that data format. The dataset is available in CSV, JSON, and Excel formats. You can select your preferred format during checkout.",
      time: "10:30 AM",
    },
  ]

  return (
    <div className="flex h-full rounded-lg border">
      {/* Conversations List */}
      <div className="w-1/3 border-r">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <Separator />
        <div className="h-[calc(100%-73px)] overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-muted/50 ${
                selectedConversation === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={conversation.name} />
                <AvatarFallback>{conversation.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{conversation.name}</p>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
              </div>
              {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex w-2/3 flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="DataCorp Inc." />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">DataCorp Inc.</p>
              <p className="text-xs text-muted-foreground">Usually responds within 2 hours</p>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`mt-1 text-right text-xs ${
                      message.sender === "me" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
