import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function DatasetFilters() {
  return (
    <div className="w-full space-y-4">
      <Accordion type="multiple" defaultValue={["categories", "price", "rating"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Geospatial", "Financial", "Healthcare", "Environmental", "Retail", "Transportation"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.toLowerCase()}`} />
                    <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                  </div>
                ),
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 500]} max={1000} step={10} />
              <div className="flex items-center justify-between">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="data-format">
          <AccordionTrigger>Data Format</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["CSV", "JSON", "XML", "Excel", "SQL", "API"].map((format) => (
                <div key={format} className="flex items-center space-x-2">
                  <Checkbox id={`format-${format.toLowerCase()}`} />
                  <Label htmlFor={`format-${format.toLowerCase()}`}>{format}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline">Reset</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  )
}
