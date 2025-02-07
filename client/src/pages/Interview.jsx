import QuestionsIndex from '@/components/Question/QuestionsIndex';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { LucideWebcam } from 'lucide-react';
import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';

const Interview = () => {
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [interview, setInterview] = useState({});
    const { mockId } = useParams();
    const { user , isLoaded } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
      fetch(`${backendUrl}/api/interviews/${email}?mockId=${mockId}`)
        .then((response) => response.json())
        .then((data) => setInterview(data))
        .catch((error) => console.error(error));
    }, [mockId, email]);
  
    if (!interview) return <div>Loading...</div>;  

  return (
    <div className='mx-24 mt-8 flex flex-row gap-12'>
      <div className='border border-gray-200 p-4 bg-gray-10 rounded-md'>
        <QuestionsIndex questions={interview.questions}/>
      </div>
      <div className="flex flex-col flex-1 justify-center gap-4">
          {!webcamEnabled ? (
            <div className="bg-gray-100 h-72 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
              {" "}
              <LucideWebcam className="h-1/2 w-1/2" />
            </div>
          ) : (
            <div className="bg-black h-72 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
                <Webcam mirrored={true} style={{ width: "100%", height: "100%" }} />
            </div>
          )}
          <Button
            className="bg-primary text-white font-bold p-4 rounded-md"
            onClick={() => setWebcamEnabled(!webcamEnabled)}
          >
            {webcamEnabled?"Disable":"Enable"} WebCam & Microphone
          </Button>
          <Button  variant="ghost" className="bg-gray-100 font-bold p-4 rounded-md"> Start Interview</Button>
        </div>
    </div>
  )
}

export default Interview
