// Floating chat launcher (overlay). Static shell button for now.
export default function ChatLauncher() {
  return (
    <button className="chat-launcher" type="button" aria-label="Open chat">
      <span className="ico" aria-hidden="true" />
    </button>
  );
}
