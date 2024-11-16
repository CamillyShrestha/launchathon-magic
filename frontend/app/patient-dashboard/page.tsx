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
  MessageSquare
} from "lucide-react";
import { Tooltip, TooltipProps, LineChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "@/components/ui/chart";

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
  const [showChat, setShowChat] = useState(false)

  const [riskHistory, setRiskHistory] = useState([
    { time: '0m', risk: 0.2 },
    { time: '5m', risk: 0.25 },
    { time: '10m', risk: 0.22 },
    { time: '15m', risk: 0.28 },
    { time: '20m', risk: 0.2 },
  ])

  const predictRisk = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newRisk = Number((Math.random() * 0.5).toFixed(2))
    setPatientData(prevData => ({
      ...prevData,
      heartRate: Math.floor(Math.random() * (100 - 60) + 60),
      bloodPressure: `${Math.floor(Math.random() * (140 - 100) + 100)}/${Math.floor(Math.random() * (90 - 60) + 60)}`,
      oxygenLevel: Math.floor(Math.random() * (100 - 95) + 95),
      temperature: Number((Math.random() * (37.5 - 36.0) + 36.0).toFixed(1)),
      withdrawalRisk: newRisk
    }))
    setRiskHistory(prevHistory => [
      ...prevHistory.slice(1),
      { time: `${prevHistory.length * 5}m`, risk: newRisk }
    ])
    setIsLoading(false)
  }

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label })  => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-lg p-2 rounded">
          <p className="label">{`Time: ${label}`}</p>
          <p className="data">{`Risk: ${payload[0]?.value ? (payload[0].value * 100).toFixed(1) : 'N/A'}%`}</p>
        </div>
      );
    }
    return null;
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
        <div className="grid grid-cols-1 gap-10 ">
          {/* Data Tracking and Analysis */}
            
            {/* Withdrawal Risk */}
            <Card
              className="bg-white/10 w-3/4 backdrop-blur-lg border-gray-400 mx-auto text-black 
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
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(0,0,0,0.5)" />
                      <YAxis stroke="rgba(0,0,0,0.5)" domain={[0, 0.5]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="risk" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* <div className="mt-4 text-center">
                <Button onClick={predictRisk} disabled={isLoading} 
                  className="bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300">
                  {isLoading ? 'Updating...' : 'Update Risk'}
                </Button>
              </div> */}
              </CardContent>
            </Card>
          {/* Mood Tracker Chatbot */}
          <Card className="bg-white/10 border-none text-black">
              <CardHeader>
                <CardTitle>Mood Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <Button
                      key={score}
                      onClick={() => setMoodScore(score)}
                      className={`${
                        moodScore === score
                          ? 'bg-black text-white hover:bg-black'
                          : 'bg-white text-black hover:bg-gray-100 '
                      } transition-all duration-300`}
                    >
                      {score}
                    </Button>
                  ))}
                </div>
                <div className="text-2xl font-bold text-center mt-4">
                  Current Mood: {moodScore}
                </div>
              </CardContent>
            </Card>
            
              <CardContent>
                {!showChat ? (
                  <Button onClick={() => setShowChat(true)} className="w-full bg-white text-purple-600 hover:bg-purple-100">
                    <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
                  </Button>
                ) : (
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
                )}
              </CardContent>
                
        </div>
      </div>
    </div>
  );
}
