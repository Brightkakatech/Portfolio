import { useState } from "react";

/**
 * The name and message boxes with a Send button.
 * It keeps track of what is being typed and hands the finished message
 * to the page, which sends it. The button is disabled while sending,
 * so a message cannot be sent twice by double-clicking.
 * @param {object} props
 * @param {(name: string, text: string) => Promise<boolean>} props.onSend -
 *   Resolves to true if the message was sent, so the box can be cleared.
 */
function MessageInput({ onSend }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); // handle the message here instead of reloading the page
    setSending(true);
    const sent = await onSend(name, text);
    setSending(false);
    // Clear only the message; keep the name for the next one
    if (sent) setText("");
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
        maxLength={50}
      />
      <input
        type="text"
        className="chat-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message and press Enter"
        aria-label="Message"
        maxLength={1000}
      />
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

export default MessageInput;
