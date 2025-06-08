import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ColorPalette() {
  const colorGroups = [
    {
      title: "Primary Colors",
      description: "Main brand and UI colors",
      colors: [
        { name: "Primary (Data Blue)", class: "bg-primary" },
        { name: "Secondary (Teal)", class: "bg-secondary" },
        { name: "Accent (Purple)", class: "bg-accent" },
      ],
    },
    {
      title: "Data Visualization",
      description: "Colors for charts and data visualization",
      colors: [
        { name: "Chart 1 (Blue)", class: "bg-data-blue" },
        { name: "Chart 2 (Teal)", class: "bg-data-teal" },
        { name: "Chart 3 (Purple)", class: "bg-data-purple" },
        { name: "Chart 4 (Pink)", class: "bg-data-pink" },
        { name: "Chart 5 (Orange)", class: "bg-data-orange" },
      ],
    },
    {
      title: "Status Colors",
      description: "Colors for indicating status and feedback",
      colors: [
        { name: "Success", class: "bg-success" },
        { name: "Warning", class: "bg-warning" },
        { name: "Info", class: "bg-info" },
        { name: "Destructive", class: "bg-destructive" },
      ],
    },
    {
      title: "UI Elements",
      description: "Colors for interface elements",
      colors: [
        { name: "Background", class: "bg-background border" },
        { name: "Foreground", class: "bg-foreground" },
        { name: "Muted", class: "bg-muted" },
        { name: "Border", class: "bg-border" },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">B2eXchange Color Palette</h2>
        <p className="text-muted-foreground">
          A data-focused color system designed for information visualization and analytics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {colorGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.colors.map((color) => (
                  <div key={color.name} className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-md ${color.class}`}
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                    ></div>
                    <div>
                      <p className="font-medium">{color.name}</p>
                      <p className="text-xs text-muted-foreground">{color.class}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Color Usage Guidelines</CardTitle>
          <CardDescription>Best practices for using the color system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Data Visualization</h3>
              <p className="text-sm text-muted-foreground">
                Use the chart colors in sequence for data visualizations. These colors are designed to be
                distinguishable and accessible, with good contrast in both light and dark modes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Status Indicators</h3>
              <p className="text-sm text-muted-foreground">
                Use success for positive outcomes, warning for caution, info for neutral information, and destructive
                for errors or critical actions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">UI Elements</h3>
              <p className="text-sm text-muted-foreground">
                Primary blue should be used for main actions and key UI elements. Secondary teal and accent purple can
                be used for highlighting important features or secondary actions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
