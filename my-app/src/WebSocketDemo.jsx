import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
  const [socketUrl] = useState('ws://127.0.0.1:3001/');

  const { sendMessage, lastMessage, readyState, getWebSocket, sendJsonMessage } = useWebSocket(socketUrl);

  // const messageHistory = useRef([]);
  // messageHistory.current = useMemo(() => messageHistory.current.concat(lastMessage), [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendJsonMessage({ action: 'Hello' }), [sendJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send 'Hello'
      </button>
      <br />
      <span>The WebSocket is currently {connectionStatus}</span>
      <br />
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      {/* <ul>
        {messageHistory.current.map((message, idx) => (
          <span key={idx}>{JSON.stringify(message)}</span>
        ))}
      </ul> */}
    </div>
  );
};
