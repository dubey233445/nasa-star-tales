import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Home,
  Share2
} from "lucide-react";

interface StoryScene {
  title: string;
  narrationText: string;
  altText: string;
  imageUrl: string;
  sceneActions?: string[];
}

interface Story {
  storyTitle: string;
  ageRange: string;
  scenes: StoryScene[];
  estimatedReadTimeSeconds: number;
}

// Demo story data (replace with API call)
const demoStory: Story = {
  storyTitle: "Luna's Mars Adventure",
  ageRange: "4-8 years",
  estimatedReadTimeSeconds: 300,
  scenes: [
    {
      title: "The Journey Begins",
      narrationText: "Luna looked up at the twinkling stars and dreamed of visiting Mars, the red planet she'd seen in pictures.",
      altText: "A beautiful view of Mars from space showing its rusty red surface",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800",
    },
    {
      title: "Landing on Mars",
      narrationText: "With a gentle bump, Luna's spaceship landed on Mars. The landscape was covered in beautiful red dust that sparkled in the sunlight.",
      altText: "Mars surface with rocky terrain and red dust",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
    },
    {
      title: "Space Friends",
      narrationText: "As Luna explored, she discovered friendly space creatures who showed her the most amazing crystal caves hidden beneath the red rocks.",
      altText: "Artistic representation of friendly alien creatures on Mars",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800",
    }
  ]
};

const StoryViewer = () => {
  const { id } = useParams();
  const [story] = useState<Story>(demoStory);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Text-to-Speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = isMuted ? 0 : 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
        if (currentScene < story.scenes.length - 1) {
          setTimeout(() => nextScene(), 1000);
        }
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakText(story.scenes[currentScene].narrationText);
      setIsPlaying(true);
    }
  };

  const nextScene = () => {
    if (currentScene < story.scenes.length - 1) {
      speechSynthesis.cancel();
      setCurrentScene(currentScene + 1);
      setIsPlaying(false);
      setProgress(((currentScene + 2) / story.scenes.length) * 100);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      speechSynthesis.cancel();
      setCurrentScene(currentScene - 1);
      setIsPlaying(false);
      setProgress((currentScene / story.scenes.length) * 100);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const currentSceneData = story.scenes[currentScene];

  return (
    <div className="min-h-screen p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="nebula" size="icon" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{story.storyTitle}</h1>
              <p className="text-muted-foreground">For ages {story.ageRange}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="w-full cosmic-glow" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Scene {currentScene + 1} of {story.scenes.length}</span>
            <span>~{Math.round(story.estimatedReadTimeSeconds / 60)} min read</span>
          </div>
        </div>

        {/* Main Story Content */}
        <Card className="cosmic-glow mb-6">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={currentSceneData.imageUrl}
                alt={currentSceneData.altText}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentSceneData.title}
                </h2>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <p className="text-lg md:text-xl leading-relaxed text-foreground">
                {currentSceneData.narrationText}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button 
            variant="nebula" 
            size="icon"
            onClick={prevScene}
            disabled={currentScene === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button 
            variant="cosmic" 
            size="lg"
            onClick={togglePlayback}
            className="gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause Story" : "Play Story"}
          </Button>

          <Button 
            variant="nebula" 
            size="icon"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button 
            variant="nebula" 
            size="icon"
            onClick={nextScene}
            disabled={currentScene === story.scenes.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Story Complete */}
        {currentScene === story.scenes.length - 1 && (
          <Card className="text-center cosmic-glow">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">🌟 Story Complete! 🌟</h3>
              <p className="text-muted-foreground mb-4">
                Sweet dreams, little astronaut! Ready for another space adventure?
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="cosmic" asChild>
                  <Link to="/create">Create New Story</Link>
                </Button>
                <Button variant="nebula" asChild>
                  <Link to="/">Back Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;