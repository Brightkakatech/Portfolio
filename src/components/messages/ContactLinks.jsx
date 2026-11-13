import contact from "../../data/contact";

/**
 * Shows the owner's contact details as clickable cards.
 * Web links open in a new tab; the email link opens the visitor's mail app.
 */
function ContactLinks() {
  return (
    <div className="contact-grid">
      {contact.map((item) => {
        const isExternal = item.url.startsWith("http");

        return (
          <a
            className="contact-card"
            key={item.label}
            href={item.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            <span className="contact-label">{item.label}</span>
            <span className="contact-value">{item.text}</span>
          </a>
        );
      })}
    </div>
  );
}

export default ContactLinks;
