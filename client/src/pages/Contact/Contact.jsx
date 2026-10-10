import { useState } from "react";
import PageSection from "../../components/PageSection/PageSection";
import { sendContactMessage } from "../../services/api";
import styles from "./Contact.module.css";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  // status is one of: "idle", "sending", "success", "error"
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  // One handler for all inputs: the input's name attribute says which field changed
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // stops the browser from reloading the page
    setStatus("sending");
    setFeedback("");

    try {
      const data = await sendContactMessage(formData);
      setStatus("success");
      setFeedback(data.message);
      setFormData(emptyForm); // clear the form
    } catch (err) {
      setStatus("error");
      setFeedback(err.message);
    }
  };

  return (
    <PageSection
      title="Contact"
      intro="Have a question or an opportunity? Send me a message and I'll get back to you."
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="subject">Subject (optional)</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            maxLength={150}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Disabled while sending so the user can't click twice */}
        <button
          type="submit"
          className={styles.button}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {/* aria-live makes screen readers announce the result */}
        <p
          aria-live="polite"
          className={status === "error" ? styles.error : styles.success}
        >
          {feedback}
        </p>
      </form>
    </PageSection>
  );
}
