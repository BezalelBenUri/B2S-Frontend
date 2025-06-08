import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart3, Database, Globe, Lock, ShieldCheck, Star, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">B2eXchange</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:underline underline-offset-4">
              Marketplace
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Ultimate Data Marketplace
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Buy and sell diverse data types including geospatial data in a secure, transparent marketplace with
                    real-time analytics and blockchain verification.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/marketplace">
                    <Button size="lg" className="w-full">
                      Explore Marketplace
                    </Button>
                  </Link>
                  <Link href="/auth/register?type=seller">
                    <Button size="lg" variant="outline" className="w-full">
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl"></div>
                  <div className="relative h-full w-full rounded-xl border bg-card p-4 shadow-xl">
                    <div className="space-y-2 p-4">
                      <div className="h-2 w-20 rounded bg-muted"></div>
                      <div className="h-4 w-full rounded bg-muted"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 p-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-20 rounded-lg bg-muted"></div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between p-4">
                      <div className="h-8 w-24 rounded bg-primary"></div>
                      <div className="h-8 w-8 rounded-full bg-muted"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  B2eXchange offers a comprehensive suite of features designed to make data trading secure, efficient,
                  and profitable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Auction-based Selling</h3>
                <p className="text-center text-muted-foreground">
                  List your data for auction and let buyers compete with bids to maximize your profits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Live Market & Trends</h3>
                <p className="text-center text-muted-foreground">
                  Access real-time analytics on trending datasets, price fluctuations, and market demand.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Blockchain Verification</h3>
                <p className="text-center text-muted-foreground">
                  Ensure data authenticity and ownership with blockchain-based smart contracts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rating System</h3>
                <p className="text-center text-muted-foreground">
                  Build trust with comprehensive seller, buyer, and data quality ratings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Geospatial Data Support</h3>
                <p className="text-center text-muted-foreground">
                  Specialized tools for previewing and analyzing geospatial datasets.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Privacy Controls</h3>
                <p className="text-center text-muted-foreground">
                  Set access levels and ensure GDPR compliance for all data transactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="marketplace" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Datasets</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover a wide range of high-quality datasets from verified sellers across multiple categories
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Sample Dataset {i + 1}</h3>
                        <p className="text-sm text-muted-foreground">
                          {
                            ["Geospatial", "Financial", "Healthcare", "Environmental", "Retail", "Transportation"][
                              i % 6
                            ]
                          }{" "}
                          Data
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`h-4 w-4 ${j < 4 ? "fill-warning text-warning" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        High-quality dataset with comprehensive coverage and regular updates.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-bold">${Math.floor(Math.random() * 500) + 50}</div>
                      <Link href="/marketplace">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/marketplace">
                <Button size="lg">Browse Full Marketplace</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About B2eXchange</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Revolutionizing Data Trading
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  B2eXchange is built on the principle that data should be accessible, verifiable, and tradable in a
                  secure environment. Our platform connects data producers with consumers, creating a vibrant ecosystem
                  for knowledge exchange.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/about">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Active Datasets</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="text-3xl font-bold">10k+</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">B2eXchange</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 B2eXchange. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
