import { useEffect, useRef } from "react";

/**
 * Formats a saved time for display, e.g. "28 Sept, 14:05".
 * @param {string} time - An ISO date string.
 * @returns {string}
 */
function formatTime(time) {
  return new Date(time).toLocaleString("en-IE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Shows the conversation and keeps the newest message in view.
 * @param {object} props
 * @param {Array<{id: number, name: string, text: string, time: string}>} props.messages
 */
function MessageList({ messages }) {
  // A handle on the list element, used to scroll it to the bottom
  const listRef = useRef(null);

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
