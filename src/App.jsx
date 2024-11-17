import { useState } from 'react';
import './App.css'; // Import CSS file

export default function App() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', or 'sent'

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  if (status === 'sent') {
    return <h1 className="thank-you-message">Thanks for your feedback!</h1>;
  }

  return (
    <div className="form-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <p className="form-title">How was your stay at The Prancing Pony?</p>
        <textarea
          className="form-textarea"
          disabled={status === 'sending'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your feedback here..."
        />
        <br />
        <button
          className="form-button"
          disabled={status === 'sending'}
          type="submit"
        >
          Send
        </button>
        {status === 'sending' && <p className="sending-message">Sending...</p>}
      </form>
    </div>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
