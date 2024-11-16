"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Send,
  Smile,
  Frown,
  Meh,
} from "lucide-react";

export default function Dashboard() {
  const [patientData, setPatientData] = useState({
    heartRate: 85,
    bloodPressure: "120/80",
    oxygenLevel: 98,
    temperature: 36.5,
    withdrawalRisk: 0.2,
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Hello! How are you feeling today?" },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moodScore, setMoodScore] = useState(1);
  const [isTextLoading, setIsTextLoading] = useState(false);

  const predictRisk = async () => {
    setIsLoading(true);
    // Simulating API call to Django backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update with new random data for demonstration
    setPatientData({
      heartRate: Math.floor(Math.random() * (100 - 60) + 60),
      bloodPressure: `${Math.floor(
        Math.random() * (140 - 100) + 100
      )}/${Math.floor(Math.random() * (90 - 60) + 60)}`,
      oxygenLevel: Math.floor(Math.random() * (100 - 95) + 95),
      temperature: Number((Math.random() * (37.5 - 36.0) + 36.0).toFixed(1)),
      withdrawalRisk: Number((Math.random() * 0.5).toFixed(2)),
    });
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setIsTextLoading(true)
    const newMessage = { role: "user", content: userInput };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");

    // Simulating API call to LLM backend
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mood analysis (replace with actual LLM integration)
    const lowMoodWords = [
      "depressed",
      "dark",
      "clouded",
      "anxious",
      "bad",
      "sad",
      "worried",
      "stress",
      "tired",
      "angry",
    ];
    const userWords = userInput.toLowerCase().split(" ");
    const matchedWords = userWords.filter((word) =>
      lowMoodWords.includes(word)
    );
    const newMoodScore = Math.max(moodScore - matchedWords.length * 0.1, 0);
    setMoodScore(newMoodScore);

    const botReply = {
      role: "system",
      content: matchedWords.length
        ? `I'm sorry to hear that you're feeling ${matchedWords.join(
            ", "
          )}. Remember, it's okay to have these feelings. I'm here to support you.`
        : "That's great to hear! How can I assist you further?",
    };
    setChatMessages((prevMessages) => [...prevMessages, botReply]);
    setIsTextLoading(false);
  };

  useEffect(() => {
    predictRisk();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-100 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800">
          Withdrawal Risk and Mood Tracker
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Data Tracking and Analysis */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-stone-800">
              Real-time Health Monitoring
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Heart Rate",
                  value: `${patientData.heartRate} bpm`,
                  icon: Heart,
                  color: "text-red-300",
                },
                {
                  title: "Blood Pressure",
                  value: patientData.bloodPressure,
                  icon: Activity,
                  color: "text-blue-300",
                },
                {
                  title: "Oxygen Level",
                  value: `${patientData.oxygenLevel}%`,
                  icon: Droplet,
                  color: "text-cyan-300",
                },
                {
                  title: "Temperature",
                  value: `${patientData.temperature}°C`,
                  icon: Thermometer,
                  color: "text-yellow-300",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border-gray-400 text-white 
hover:bg-white/20 transition-all duration-300
shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
hover:-translate-y-1 hover:translate-x-1
rounded-xl"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-stone-800 font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-stone-800 font-bold">
                      {item.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Withdrawal Risk */}
            <Card
              className="bg-white/10 backdrop-blur-lg border-gray-400 text-white 
hover:bg-white/20 transition-all duration-300
shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
hover:-translate-y-1 hover:translate-x-1
rounded-xl"
            >
              <CardHeader>
                <CardTitle className="text-stone-800">
                  Predicted Withdrawal Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-stone-800 text-center mb-4">
                  {(patientData.withdrawalRisk * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-white/30 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 h-4 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${patientData.withdrawalRisk * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <div className="text-center">
              <Button
                onClick={predictRisk}
                disabled={isLoading}
                className="bg-white text-stone-800 hover:bg-purple-100 transition-all duration-300"
              >
                {isLoading ? "Updating..." : "Update Data"}
              </Button>
            </div>
          </div>
          {/* Mood Tracker Chatbot */}
          <div className="space-y-6">
            <h2 className="text-2xl text-stone-800 font-semibold mb-4">
              Mood Tracker Chatbot
            </h2>
            <Card className="h-[360px] flex flex-col bg-white/10 backdrop-blur-lg border-gray-400 text-white">
              <CardHeader>
                <CardTitle className="text-stone-800">
                  Chat with AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 overflow-hidden">
                {/* Chat messages container */}
                <div className="flex-1 overflow-y-auto">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-stone-100 to-stone-200 text-stone-800 rounded-tl-none"
                            : "bg-gradient-to-r from-stone-100 to-stone-200 text-stone-800 rounded-tl-none"
                        } ${
                          message.role === "user"
                            ? "ml-12" // Space for long messages from user
                            : "mr-12" // Space for long messages from bot
                        }`}
                      >
                        <div className="text-sm font-medium break-words">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {isTextLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gradient-to-r from-stone-100 to-stone-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Input field fixed at the bottom */}
                <div className="flex items-center mt-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-grow mr-2 bg-white/20 text-black placeholder-white/50 border-gray-400"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isTextLoading}
                    className="bg-white text-stone-600 hover:bg-purple-100"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Mood Score */}
            <Card
              className="bg-white/10 backdrop-blur-lg border-gray-400 text-white 
hover:bg-white/20 transition-all duration-300
shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
hover:-translate-y-1 hover:translate-x-1
rounded-xl"
            >
              <CardHeader>
                <CardTitle className="text-stone-800">Mood Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Frown className="h-6 w-6 text-red-300" />
                  <Meh className="h-6 w-6 text-yellow-300" />
                  <Smile className="h-6 w-6 text-green-300" />
                </div>
                <div className="w-full bg-white/30 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 h-4 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${moodScore * 100}%` }}
                  ></div>
                </div>
                <div className="text-2xl text-stone-800 font-bold text-center mt-2">
                  {(moodScore * 100).toFixed(0)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
