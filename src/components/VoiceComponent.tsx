"use client";

import React, { useEffect, useState, useRef } from "react";

// ElevenLabs
import { useConversation } from "@11labs/react";

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { refreshReservations } from "./ReservationTable";

type ConversationMessage = {
  source: 'user' | 'ai';
  message: string;
};

// Add type definition for the conversation object to fix TypeScript errors
interface ConversationWithSend {
  startSession: (options: any) => Promise<string>;
  endSession: () => Promise<void>;
  setVolume: (options: { volume: number }) => Promise<void>;
  send: (options: { message: string }) => void;
  status: string;
  isSpeaking: boolean;
}

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingReservation, setPendingReservation] = useState<any>(null);
  const [conversationContext, setConversationContext] = useState<string>("");
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);
  const fullConversationText = useRef<string>("");
  const completeConversationRef = useRef<boolean>(false);

  // When conversation ends, this will be triggered to save the data
  useEffect(() => {
    // Only run this effect when conversation is marked as complete
    if (completeConversationRef.current && conversationHistory.length > 0) {
      console.log("Conversation marked complete, saving final data");
      
      // Submit one final request to save the data
      const finalConversationText = conversationHistory
        .map(msg => `${msg.source}: ${msg.message}`)
        .join("\n");
        
      fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: "FINAL_SAVE",
          conversationContext: finalConversationText
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.reservation) {
          console.log("Successfully saved final reservation:", data.reservation);
          // Force an immediate refresh of the reservation table
          forceDataRefresh();
          setReservationSuccess(true);
        }
      })
      .catch(err => console.error("Error saving final data:", err));
      
      // Reset the complete flag
      completeConversationRef.current = false;
    }
  }, [completeConversationRef.current, conversationHistory.length]);

  // Function to force data refresh
  const forceDataRefresh = () => {
    console.log("Forcing data refresh");
    setTimeout(() => {
      refreshReservations();
      // Try a second refresh after 2 seconds to ensure data is updated
      setTimeout(() => {
        refreshReservations();
      }, 2000);
    }, 500);
  };

  // Update the full conversation text whenever history changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      fullConversationText.current = conversationHistory
        .map(msg => `${msg.source}: ${msg.message}`)
        .join("\n");
      console.log("Full conversation updated:", fullConversationText.current);
    }
  }, [conversationHistory]);

  // Update the conversation type to include the send method
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
      
      // Mark conversation as complete to trigger the final save effect
      if (conversationHistory.length > 0) {
        completeConversationRef.current = true;
        
        // Trigger the effect manually since we're in a callback
        if (completeConversationRef.current && conversationHistory.length > 0) {
          console.log("Conversation disconnected, saving final data");
          
          // Submit one final request to save the data
          const finalConversationText = conversationHistory
            .map(msg => `${msg.source}: ${msg.message}`)
            .join("\n");
            
          fetch('/api/reservation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: "FINAL_SAVE",
              conversationContext: finalConversationText
            }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.success && data.reservation) {
              console.log("Successfully saved final reservation:", data.reservation);
              // Force an immediate refresh of the reservation table
              forceDataRefresh();
              setReservationSuccess(true);
            } else {
              console.log("No reservation found in final save");
            }
          })
          .catch(err => console.error("Error saving final data:", err));
        }
      }
      
      // Reset state when conversation ends
      setPendingReservation(null);
      setConversationContext("");
      setConversationHistory([]);
      fullConversationText.current = "";
      
      // Force a final refresh when conversation ends
      if (reservationSuccess) {
        forceDataRefresh();
        setReservationSuccess(false);
      }
    },
    onMessage: async (message) => {
      console.log("Received message:", message);
      
      // Add message to conversation history
      const newMessage: ConversationMessage = {
        source: message.source,
        message: message.message
      };
      
      setConversationHistory(prev => {
        const updated = [...prev, newMessage];
        return updated;
      });
      
      try {
        // Check if this is a confirmation response
        if (pendingReservation && conversationContext === "awaiting_confirmation") {
          const userMessage = message.message.toLowerCase();
          
          // Look for confirmation in the message
          if (userMessage.includes("yes") || 
              userMessage.includes("confirm") || 
              userMessage.includes("correct") || 
              userMessage.includes("that's right")) {
            
            // Send confirmation to the API
            const confirmResponse = await fetch('/api/reservation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                isConfirmation: true, 
                reservationId: pendingReservation.id 
              }),
            });

            const confirmData = await confirmResponse.json();
            if (confirmData.success) {
              console.log('Reservation confirmed:', confirmData.reservation);
              // Reset the pending reservation now that it's confirmed
              setPendingReservation(null);
              setConversationContext("");
              setReservationSuccess(true);
              
              // Trigger an immediate refresh of the reservation table
              forceDataRefresh();
              
              // Respond to the user
              conversation.send({
                message: "Great! Your reservation has been confirmed. We look forward to seeing you!",
              });
            }
            
            return;
          } else if (userMessage.includes("no") || 
                     userMessage.includes("cancel") || 
                     userMessage.includes("incorrect") || 
                     userMessage.includes("wrong")) {
            
            // Handle rejection/cancellation
            setPendingReservation(null);
            setConversationContext("");
            
            // Respond to the user
            conversation.send({
              message: "I understand. Let's start over with the reservation. Please provide your details again.",
            });
            
            return;
          }
        }
        
        // Only process for reservation data if it's a user message
        if (message.source === 'user') {
          // Send the entire conversation history for context
          console.log("Sending full conversation for analysis:", fullConversationText.current);
          
          // Regular message processing for new reservations
          const response = await fetch('/api/reservation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              message: message.message,
              conversationContext: fullConversationText.current
            }),
          });

          const data = await response.json();
          if (data.success && data.reservation) {
            console.log('Reservation stored successfully:', data.reservation);
            
            // Set the pending reservation
            setPendingReservation(data.reservation);
            setConversationContext("awaiting_confirmation");
            setReservationSuccess(true);
            
            // Trigger immediate refresh of the reservation table to show pending reservation
            forceDataRefresh();
            
            // Ask for confirmation
            if (data.message) {
              conversation.send({
                message: data.message + "\n\nIs this information correct? Please say 'yes' to confirm or 'no' to start over.",
              });
            }
          } else {
            console.log('No reservation data found in message');
          }
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  }) as unknown as ConversationWithSend;

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
    
    // When component mounts, refresh the data once
    forceDataRefresh();
  }, []);

  const handleStartConversation = async () => {
    try {
      // Reset the conversation history when starting a new conversation
      setConversationHistory([]);
      fullConversationText.current = "";
      // Replace with your actual agent ID or URL
      const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
      });
      console.log("Started conversation:", conversationId);
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      // Before ending the conversation, do a final check for reservation data
      if (conversationHistory.length > 0 && !pendingReservation && !reservationSuccess) {
        // Try one last time to find reservation data
        console.log("Final check for reservation data before ending conversation");
        await checkForReservationData();
      }
      
      await conversation.endSession();
      // Reset state when conversation ends
      setPendingReservation(null);
      setConversationContext("");
      setConversationHistory([]);
      fullConversationText.current = "";
      
      // Force a final refresh
      if (reservationSuccess) {
        forceDataRefresh();
        setReservationSuccess(false);
      }
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  // Function to check for reservation data in the conversation
  const checkForReservationData = async () => {
    if (conversationHistory.length > 0) {
      console.log("Checking conversation for reservation data");
      try {
        const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: "MANUAL_CHECK",
            conversationContext: fullConversationText.current
          }),
        });
        
        const data = await response.json();
        if (data.success && data.reservation) {
          setPendingReservation(data.reservation);
          setConversationContext("awaiting_confirmation");
          setReservationSuccess(true);
          forceDataRefresh();
          conversation.send({
            message: data.message + "\n\nIs this information correct? Please say 'yes' to confirm or 'no' to start over.",
          });
          return true;
        } else {
          console.log('No reservation data found in conversation');
          return false;
        }
      } catch (err) {
        console.error("Error checking reservation data:", err);
        return false;
      }
    }
    return false;
  };

  const handleManualDataCheck = () => {
    // Use the shared function
    checkForReservationData();
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Voice Chat
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              disabled={status !== "connected"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            {status === "connected" ? (
              <div className="w-full flex flex-col gap-2">
                <Button
                  variant="destructive"
                  onClick={handleEndConversation}
                  className="w-full"
                >
                  <MicOff className="mr-2 h-4 w-4" />
                  End Conversation
                </Button>
                <Button
                  variant="outline"
                  onClick={handleManualDataCheck}
                  className="w-full text-sm"
                >
                  Check Conversation for Reservation
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleStartConversation}
                disabled={!hasPermission}
                className="w-full"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Conversation
              </Button>
            )}
          </div>

          <div className="text-center text-sm">
            {status === "connected" && (
              <p className="text-green-600">
                {isSpeaking ? "Agent is speaking..." : (
                  pendingReservation && conversationContext === "awaiting_confirmation" 
                  ? "Awaiting confirmation..." 
                  : "Listening..."
                )}
              </p>
            )}
            {reservationSuccess && (
              <p className="text-blue-600 mt-2">
                Reservation data updated. Click "Refresh Now" in the table below to view.
              </p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {!hasPermission && (
              <p className="text-yellow-600">
                Please allow microphone access to use voice chat
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;
