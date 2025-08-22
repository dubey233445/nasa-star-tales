import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Rocket, Sparkles, Moon, Star, Globe } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful space view with Earth, stars, and nebulae for children's bedtime stories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Rocket className="h-12 w-12 text-accent animate-float" />
              <h1 className="text-4xl md:text-6xl font-bold">
                NASA Space Stories
              </h1>
              <Star className="h-8 w-8 text-accent animate-twinkle" />
            </div>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Create magical bedtime stories for your little astronaut using 
              <span className="text-accent font-semibold"> real NASA space images</span> and 
              AI-powered storytelling
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="cosmic" 
                size="hero" 
                asChild
                className="animate-pulse-glow"
              >
                <Link to="/create">
                  <Sparkles className="h-5 w-5" />
                  Create Your Space Story
                </Link>
              </Button>
              
              <Button variant="nebula" size="lg" asChild>
                <Link to="/story/demo">
                  <Moon className="h-4 w-4" />
                  Watch Demo Story
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Ages 3-12</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Real NASA Images</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-gradient bg-clip-text text-transparent">
              Why Kids Love NASA Space Stories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Combine real space exploration with personalized storytelling to create 
              unforgettable bedtime adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="cosmic-glow hover:starlight-glow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg cosmic-gradient flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Real NASA Images</CardTitle>
                <CardDescription>
                  Every story features authentic photos from NASA missions, Mars rovers, 
                  and space telescopes to spark curiosity about real space exploration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cosmic-glow hover:starlight-glow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg cosmic-gradient flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Personalized Adventures</CardTitle>
                <CardDescription>
                  AI creates unique stories featuring your child's name, interests, and 
                  preferences, making them the hero of their own space adventure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cosmic-glow hover:starlight-glow transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg cosmic-gradient flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Perfect for Bedtime</CardTitle>
                <CardDescription>
                  Soothing narration, gentle pacing, and calming space themes help 
                  little ones drift off to sleep while learning about the cosmos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="container max-w-4xl mx-auto">
          <Card className="cosmic-glow p-8">
            <CardContent>
              <h3 className="text-3xl font-bold mb-4">Ready to Blast Off?</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Create your child's first personalized space story in just a few clicks. 
                No signup required – start exploring the universe tonight!
              </p>
              <Button variant="cosmic" size="hero" asChild>
                <Link to="/create">
                  <Rocket className="h-5 w-5" />
                  Start Your Space Adventure
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
