import { useEffect, useRef } from "react";
import { formatTime } from "../../utils/format";
import type { SentMessage } from "../../types";
/**
 * Shows the conversation and keeps the newest message in view.
 * @param messages - The visitor's own sent messages, oldest first.
 */
function MessageList({ messages }: { messages: SentMessage[] }) {
  // A handle on the list element, used to scroll it to the bottom
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-messages" ref={listRef}>
      {messages.length === 0 ? (
        <p className="chat-empty">No messages yet. Say hello!</p>
      ) : (
        messages.map((message) => (
          <div className="chat-bubble" key={message.id}>
            <p className="chat-meta">
              <strong>{message.name}</strong> · {formatTime(message.time)}
            </p>
            <p className="chat-text">{message.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
