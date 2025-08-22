import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Sparkles, ArrowLeft } from "lucide-react";

interface StoryForm {
  childName: string;
  age: number;
  interests: string;
  storyLength: "short" | "medium" | "long";
  language: string;
  voiceStyle: "calm" | "cheerful";
}

const CreateStory = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<StoryForm>({
    childName: "",
    age: 5,
    interests: "",
    storyLength: "short",
    language: "en",
    voiceStyle: "calm"
  });

  const handleInputChange = (field: keyof StoryForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    // TODO: Implement story generation with NASA API + OpenAI
    // For now, simulate API call
    setTimeout(() => {
      navigate("/story/demo");
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="h-8 w-8 text-accent animate-float" />
            <h1 className="text-4xl font-bold cosmic-gradient bg-clip-text text-transparent">
              Create Your Space Story
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Let's create a magical bedtime story with real NASA space images!
          </p>
        </div>

        <Card className="cosmic-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent animate-twinkle" />
              Story Details
            </CardTitle>
            <CardDescription>
              Tell us about your little astronaut to create a personalized space adventure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  placeholder="Enter your child's name"
                  value={formData.childName}
                  onChange={(e) => handleInputChange("childName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="3"
                  max="12"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Favorites</Label>
              <Textarea
                id="interests"
                placeholder="What does your child love? (animals, colors, toys, etc.)"
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Story Length</Label>
                <Select
                  value={formData.storyLength}
                  onValueChange={(value) => handleInputChange("storyLength", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (2-3 min)</SelectItem>
                    <SelectItem value="medium">Medium (5 min)</SelectItem>
                    <SelectItem value="long">Long (8-10 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Voice Style</Label>
                <Select
                  value={formData.voiceStyle}
                  onValueChange={(value) => handleInputChange("voiceStyle", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calm">Calm & Soothing</SelectItem>
                    <SelectItem value="cheerful">Cheerful & Upbeat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerateStory}
              disabled={!formData.childName || isGenerating}
              variant="cosmic"
              size="hero"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Creating Your Space Story...
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  Generate Space Story
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStory;