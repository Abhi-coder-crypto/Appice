import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Download, Minus, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/layout/header";
import { customers, customerInteractions } from "@/lib/dummy-data";
import type { Customer } from "@shared/schema";

function CustomerDetailModal({ customer, open, onClose }: { customer: Customer | null; open: boolean; onClose: () => void }) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Customer Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                NA
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gender</span>
                    <span>NA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Marital Status</span>
                    <span>NA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">DOB</span>
                    <span>NA</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span>NA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mobile</span>
                    <span>NA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span>NA</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">CIF ID:</span> {customer.visitorId}
          </div>

          {/* Profile Section */}
          <div>
            <h3 className="font-semibold mb-4">Profile</h3>
          </div>

          {/* Users/Interactions */}
          <div>
            <h3 className="font-semibold mb-4">Users/Interactions</h3>
            <Select defaultValue={customer.visitorId}>
              <SelectTrigger className="w-full mb-4" data-testid="select-user-interaction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={customer.visitorId}>{customer.visitorId}</SelectItem>
              </SelectContent>
            </Select>
            
            <div>
              <h4 className="font-medium mb-3">Behavioural Data</h4>
              <div className="space-y-4">
                {customerInteractions.map((interaction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">{interaction.timestamp}</div>
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      {index < customerInteractions.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-3">
                        <div className="font-medium mb-1">{interaction.eventType}</div>
                        {interaction.sessionId && (
                          <div className="text-xs text-muted-foreground">
                            sid:{interaction.sessionId}
                          </div>
                        )}
                        {Object.entries(interaction.details).map(([key, value]) => (
                          <div key={key} className="text-xs text-muted-foreground">
                            {key}:{value}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Customer360() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [status, setStatus] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);

  const totalEntries = 4650;
  const totalPages = Math.ceil(totalEntries / parseInt(pageSize));

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Customer 360" showPlatformFilter />
      
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardContent className="p-0">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 p-4 border-b border-border">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-customer"
                />
              </div>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20" data-testid="select-page-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-28" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-semibold">
                      User
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      User Since
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Last Seen
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      #of Sessions
                      <ChevronDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold">Client ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow 
                      key={customer.id} 
                      className="cursor-pointer hover-elevate"
                      onClick={() => handleRowClick(customer)}
                      data-testid={`row-customer-${customer.id}`}
                    >
                      <TableCell className="text-sm text-primary">{customer.visitorId}</TableCell>
                      <TableCell className="text-sm">{customer.userSince}</TableCell>
                      <TableCell className="text-sm">{customer.lastSeen}</TableCell>
                      <TableCell className="text-sm">{customer.sessions || ''}</TableCell>
                      <TableCell className="text-sm">{customer.clientId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 10 of {totalEntries.toLocaleString()} entries
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                    data-testid={`button-page-${page}`}
                  >
                    {page}
                  </Button>
                ))}
                <span className="px-2 text-muted-foreground">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8" data-testid="button-page-465">
                  465
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  data-testid="button-next-page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomerDetailModal 
        customer={selectedCustomer} 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
