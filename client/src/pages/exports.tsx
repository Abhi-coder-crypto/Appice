import { useState } from "react";
import { Search, Download, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { exportReports } from "@/lib/dummy-data";

export default function Exports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);

  const totalEntries = 2056;
  const totalPages = Math.ceil(totalEntries / parseInt(pageSize));

  return (
    <div className="flex flex-col h-full">
      <Header title="What do users do - In our App" />
      
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
                  data-testid="input-search-exports"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-20" data-testid="select-show-entries">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">Entries</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-semibold">File Name</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold">Export Date</TableHead>
                    <TableHead className="text-xs font-semibold">Processed Date</TableHead>
                    <TableHead className="text-xs font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportReports.map((report) => (
                    <TableRow key={report.id} data-testid={`row-export-${report.id}`}>
                      <TableCell className="text-sm font-medium text-foreground">
                        {report.fileName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {report.exportDate}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {report.processedDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            data-testid={`button-download-${report.id}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            data-testid={`button-delete-${report.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 5 of {totalEntries.toLocaleString()} entries
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
                <Button variant="outline" size="sm" className="h-8 w-8" data-testid="button-page-412">
                  412
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
    </div>
  );
}
