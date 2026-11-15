import { useState, type SyntheticEvent } from "react";

interface MessageInputProps {
  onSend: (name: string, text: string, email: string) => Promise<boolean>;
}

/**
 * The name, email (optional) and message boxes with a Send button.
 * It keeps track of what is being typed and hands the finished message
 * to the page, which sends it. The button is disabled while sending,
 * so a message cannot be sent twice by double-clicking.
 * @param onSend - Sends the message; resolves to true if it was sent,
 *   so the box can be cleared.
 */
function MessageInput({ onSend }: MessageInputProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault(); // handle the message here instead of reloading the page
    setSending(true);
    const sent = await onSend(name, text, email);
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
        type="email"
        className="chat-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email (optional, for a reply)"
        aria-label="Your email, optional, so I can reply"
        maxLength={100}
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
