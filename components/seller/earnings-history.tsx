import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

const earningsHistory = [
  {
    id: "1",
    period: "July 2023",
    earnings: "$3,845.65",
    sales: 38,
    payout: "$3,245.65",
    status: "Completed",
    date: "Aug 1, 2023",
  },
  {
    id: "2",
    period: "June 2023",
    earnings: "$3,210.50",
    sales: 32,
    payout: "$3,210.50",
    status: "Completed",
    date: "Jul 1, 2023",
  },
  {
    id: "3",
    period: "May 2023",
    earnings: "$2,845.75",
    sales: 28,
    payout: "$2,845.75",
    status: "Completed",
    date: "Jun 1, 2023",
  },
  {
    id: "4",
    period: "April 2023",
    earnings: "$2,145.25",
    sales: 21,
    payout: "$2,145.25",
    status: "Completed",
    date: "May 1, 2023",
  },
  {
    id: "5",
    period: "March 2023",
    earnings: "$2,450.00",
    sales: 24,
    payout: "$2,450.00",
    status: "Completed",
    date: "Apr 1, 2023",
  },
  {
    id: "6",
    period: "February 2023",
    earnings: "$1,845.50",
    sales: 18,
    payout: "$1,845.50",
    status: "Completed",
    date: "Mar 1, 2023",
  },
]

export function EarningsHistory() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Payout</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earningsHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.period}</TableCell>
              <TableCell>{item.earnings}</TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>{item.payout}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.status}</Badge>
              </TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Invoice
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
