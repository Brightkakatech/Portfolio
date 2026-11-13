import { useState } from "react";

/**
 * The name and message boxes with a Send button.
 * It keeps track of what is being typed and hands the finished
 * message to the page, which decides whether it can be saved.
 * @param {object} props
 * @param {(name: string, text: string) => boolean} props.onSend -
 *   Returns true if the message was accepted, so the box can be cleared.
 */
function MessageInput({ onSend }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Clear only the message; keep the name for the next one
    if (onSend(name, text)) setText("");
  }

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        aria-label="Your name"
      />
      <input
        type="text"
        className="chat-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message and press Enter"
        aria-label="Message"
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}

export default MessageInput;
