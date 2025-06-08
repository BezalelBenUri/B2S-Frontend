import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function PublicMarketplaceFilters() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-base font-medium">
          Search
        </Label>
        <div className="mt-1.5">
          <Input id="search" placeholder="Search datasets..." className="w-full" />
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Categories</Label>
        <div className="mt-1.5 space-y-2">
          {["Geospatial", "Financial", "Healthcare", "Environmental", "Retail", "Transportation"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.toLowerCase()}`} />
              <Label htmlFor={`category-${category.toLowerCase()}`} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Price Range</Label>
        <div className="mt-3 px-1">
          <Slider defaultValue={[0, 500]} max={1000} step={10} />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="rating" className="text-base font-medium">
          Minimum Rating
        </Label>
        <div className="mt-1.5">
          <Select defaultValue="0">
            <SelectTrigger id="rating">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="sort" className="text-base font-medium">
          Sort By
        </Label>
        <div className="mt-1.5">
          <Select defaultValue="relevance">
            <SelectTrigger id="sort">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Data Format</Label>
        <div className="mt-1.5 space-y-2">
          {["CSV", "JSON", "XML", "Excel", "API"].map((format) => (
            <div key={format} className="flex items-center space-x-2">
              <Checkbox id={`format-${format.toLowerCase()}`} />
              <Label htmlFor={`format-${format.toLowerCase()}`} className="text-sm font-normal">
                {format}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
