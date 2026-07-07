import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_URL } from "@/lib/api";
import {
  FileText,
  Camera,
  Mic,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type InputMode = "text" | "image" | "voice";

interface CheckResult {
  medicine: string;
  status: "safe" | "banned" | "caution";
  bannedChemical?: string;
  category?: string;
  details: string;
}

const CheckPrescription = () => {
  const [mode, setMode] = useState<InputMode>("text");
  const [textInput, setTextInput] = useState("");
  const [results, setResults] = useState<CheckResult[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleCheck = async () => {
  if (!textInput.trim()) {
    toast.error("Please enter medicine names or prescription text");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login again");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  
      },
      body: JSON.stringify({ text: textInput }),
    });

    if (!response.ok) throw new Error("Backend error");

    const data = await response.json();

    setAiExplanation(data.ai_explanation || "");

    if (Array.isArray(data.results) && data.results.length > 0) {
      const formatted = data.results.map((item: any) => ({
        medicine: item.medicine || item.name || "Unknown",
        status:
          item.status?.toLowerCase() === "banned"
            ? "banned"
            : item.status?.toLowerCase() === "safe"
            ? "safe"
            : "caution",
        details: item.details || "No details provided.",
      }));
      setResults(formatted);
    } else {
      setResults([]);
    }

    setHasChecked(true);
  } catch (error) {
    toast.error("Backend connection failed");
    console.error(error);
  }
};

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      const response = await fetch(`${API_URL}/check-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
  
      setAiExplanation(data.ai_explanation || "");

      if (Array.isArray(data.results) && data.results.length > 0) {
        const formatted = data.results.map((item: any) => ({
          medicine: item.medicine || "Unknown",
          status:
            item.status?.toLowerCase() === "banned"
              ? "banned"
              : item.status?.toLowerCase() === "safe"
              ? "safe"
              : "caution",
          details: item.details || "No details provided.",
        }));
        setResults(formatted);
      } else {
        setResults([]);
      }

      setHasChecked(true);
    } catch (error) {
      toast.error("OCR backend connection failed");
      console.error(error);
    }
  };
  const startRecording = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast.error("Speech Recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  setIsRecording(true);

  recognition.onresult = (event: any) => {
    const speechText = event.results[0][0].transcript;
    setTranscript(speechText);
    setTextInput(speechText); // send voice text to textInput
  };

  recognition.onerror = () => {
    toast.error("Voice recognition error");
    setIsRecording(false);
  };

  recognition.onend = () => {
    setIsRecording(false);
  };
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Check Your Prescription
            </h1>
            <p className="text-muted-foreground">
              Enter medicine names or upload prescription details to check for banned substances.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 justify-center mb-8">
            {[
              { key: "text" as InputMode, icon: FileText, label: "Text" },
              { key: "image" as InputMode, icon: Camera, label: "Image" },
              { key: "voice" as InputMode, icon: Mic, label: "Voice" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition ${
                  mode === m.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:bg-muted"
                }`}
              >
                <m.icon className="h-4 w-4" />
                {m.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-card border rounded-xl p-6 mb-8">

            {mode === "text" && (
              <div className="space-y-4">
                <Textarea
                  placeholder="e.g., Aspirin, Prednisolone..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button onClick={handleCheck} className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Check for Banned Substances
                </Button>
              </div>
            )}

            {mode === "image" && (
              <div className="space-y-4 text-center py-6">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload prescription image
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedFile(file);
                  }}
                />
                <Button
                  className="w-full"
                  onClick={() => {
                    if (!selectedFile) {
                      toast.error("Please select an image first");
                      return;
                    }
                    handleImageUpload(selectedFile);
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Image
                </Button>
              </div>
            )}

           {mode === "voice" && (
  <div className="space-y-4 text-center py-6">

    <Mic
      className={`h-12 w-12 mx-auto ${
        isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"
      }`}
    />

    <p className="text-sm text-muted-foreground">
      Click start and speak medicine names clearly.
    </p>

    <Button
      variant={isRecording ? "destructive" : "default"}
      onClick={startRecording}
    >
      {isRecording ? "Recording..." : "Start Recording"}
    </Button>

    {transcript && (
      <div className="mt-4 p-4 border rounded-xl bg-muted text-left">
        <p className="text-sm font-medium">Recognized Text:</p>
        <p className="text-sm text-muted-foreground mt-1">
          {transcript}
        </p>
      </div>
    )}

    {transcript && (
      <Button
        className="w-full mt-3 gap-2"
        onClick={handleCheck}
      >
        <Search className="h-4 w-4" />
        Analyze Voice Input
      </Button>
    )}
  </div>
)}
          </div>

          {/* Results */}
          {hasChecked && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Analysis Results</h2>

              {results.length === 0 && (
                <div className="border rounded-xl p-5 bg-green-50 border-green-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold">
                        No banned substances detected
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The prescription appears safe under WADA guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.map((r, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-5 ${
                    r.status === "safe"
                      ? "bg-green-50 border-green-300"
                      : r.status === "banned"
                      ? "bg-red-50 border-red-300"
                      : "bg-yellow-50 border-yellow-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {r.status === "safe" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : r.status === "banned" ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.medicine}</h3>
                        <span className="text-xs px-2 py-0.5 border rounded-full">
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {r.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {aiExplanation && (
                <div className="p-5 bg-blue-50 border border-blue-300 rounded-xl">
                  <h3 className="font-semibold text-blue-700 mb-2">
                    🤖 AI Explanation
                  </h3>
                  <p className="text-sm whitespace-pre-line">
                    {aiExplanation}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckPrescription;
