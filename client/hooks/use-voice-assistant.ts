import { useState, useEffect, useCallback, useRef } from "react";

interface VoiceAssistantOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface VoiceAssistant {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  transcript: string;
  confidence: number;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string, options?: SpeechSynthesisOptions) => void;
  stopSpeaking: () => void;
  toggleListening: () => void;
}

interface SpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}

export const useVoiceAssistant = (
  options: VoiceAssistantOptions = {},
): VoiceAssistant => {
  const {
    language = "en-US",
    continuous = true,
    interimResults = true,
    onResult,
    onError,
    onStart,
    onEnd,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check if browser supports speech recognition and synthesis
  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) &&
    "speechSynthesis" in window;

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      onStart?.();
    };

    recognition.onend = () => {
      setIsListening(false);
      onEnd?.();
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript;
          setConfidence(result[0].confidence);
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      setTranscript(fullTranscript);
      onResult?.(fullTranscript, !!finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      onError?.(event.error);

      // Handle specific errors
      switch (event.error) {
        case "network":
          onError?.("Network error occurred. Please check your connection.");
          break;
        case "not-allowed":
          onError?.(
            "Microphone access was denied. Please allow microphone permissions.",
          );
          break;
        case "no-speech":
          onError?.("No speech detected. Please try again.");
          break;
        default:
          onError?.(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [
    language,
    continuous,
    interimResults,
    onResult,
    onError,
    onStart,
    onEnd,
    isSupported,
  ]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || isListening) return;

    try {
      setTranscript("");
      setConfidence(0);
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      onError?.("Failed to start listening. Please try again.");
    }
  }, [isSupported, isListening, onError]);

  const stopListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || !isListening) return;

    try {
      recognitionRef.current.stop();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }, [isSupported, isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const speak = useCallback(
    (text: string, options: SpeechSynthesisOptions = {}) => {
      if (!isSupported || !synthRef.current) {
        onError?.("Speech synthesis is not supported in this browser.");
        return;
      }

      // Stop any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set options
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      // Set voice if specified
      if (options.voice) {
        const voices = synthRef.current.getVoices();
        const selectedVoice = voices.find(
          (voice) =>
            voice.name.includes(options.voice!) ||
            voice.lang.includes(options.voice!),
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        onError?.(`Speech synthesis error: ${event.error}`);
      };

      synthRef.current.speak(utterance);
    },
    [isSupported, onError],
  );

  const stopSpeaking = useCallback(() => {
    if (!isSupported || !synthRef.current) return;

    synthRef.current.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    confidence,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleListening,
  };
};

// Utility function to get available voices
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }

  return window.speechSynthesis.getVoices();
};

// Utility function to get preferred health assistant voice
export const getHealthAssistantVoice = (): SpeechSynthesisVoice | null => {
  const voices = getAvailableVoices();

  // Prefer female voices for health assistant (generally perceived as more caring)
  const preferredVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith("en") &&
      (voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("karen") ||
        voice.name.toLowerCase().includes("anna")),
  );

  return (
    preferredVoices[0] ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    voices[0] ||
    null
  );
};

export default useVoiceAssistant;
