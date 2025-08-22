import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon = <Construction className="h-12 w-12 text-primary" />,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-2xl">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                HealPulse
              </span>
            </Link>

            <Link to="/dashboard">
              <Button variant="outline" className="rounded-2xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Placeholder Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="neumorphic rounded-3xl p-12 bg-background">
            <div className="space-y-6">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto">
                {icon}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">{title}</h1>
                <p className="text-xl text-foreground/70">{description}</p>
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-foreground/60">
                  This page is coming soon! We're working hard to build this
                  feature for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button className="rounded-2xl bg-primary hover:bg-primary/90 card-hover">
                      <Heart className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>

                  <Button variant="outline" className="rounded-2xl card-hover">
                    <Construction className="h-4 w-4 mr-2" />
                    Request Feature
                  </Button>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-foreground/50">
                  💡 Want to see this page built? Continue prompting with
                  specific requirements and I'll implement the full
                  functionality for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
