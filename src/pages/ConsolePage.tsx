import { useCallback, useRef, useState } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { WavRecorder } from '../lib/wavtools/index.js';
import { Button } from '../components/button/Button';
import { X, Zap } from 'react-feather';

export function ConsolePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const clientRef = useRef(new RealtimeClient({ apiKey: '' }));
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));

  const connectConversation = useCallback(async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;

    setIsConnected(true);
    await wavRecorder.begin();
    await client.connect();
  }, []);

  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    const client = clientRef.current;
    client.disconnect();
    await wavRecorderRef.current.end();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    await wavRecorderRef.current.record((data) => clientRef.current.appendInputAudio(data.mono));
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await wavRecorderRef.current.pause();
    clientRef.current.createResponse();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {isConnected && (
        <Button
          label={isRecording ? 'Release to Send' : 'Push to Talk'}
          buttonStyle={isRecording ? 'alert' : 'regular'}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
        />
      )}
      <Button
        label={isConnected ? 'Disconnect' : 'Connect'}
        iconPosition={isConnected ? 'end' : 'start'}
        icon={isConnected ? X : Zap}
        buttonStyle={isConnected ? 'regular' : 'action'}
        onClick={isConnected ? disconnectConversation : connectConversation}
      />
    </div>
  );
}