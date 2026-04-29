import { useState } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // ⚠️ IMPORTANT: Replace this URL with your actual Formspree Endpoint!
      const response = await fetch("https://formspree.io/f/xjgjnjkn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Message: formData.message,
          _replyto: formData.email, // Tells Formspree to set the "Reply-To" to the user's email
          _subject: `New Inquiry from ${formData.name} - Aarukè` // Sets the email subject line
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Auto-close after showing success message
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message.");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMessage("Something went wrong. Please try again or email support@aaruke.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0a0c0c] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 animate-in fade-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#050707]">
          <div>
            <h2 className="font-serif text-2xl text-white italic tracking-wide">Get in Touch</h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#c5a059] mt-1">
              Bespoke Inquiries & Support
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
                ✓
              </div>
              <p className="font-serif text-lg text-white">Message Received.</p>
              <p className="text-xs text-white/50 font-sans">Our concierge will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[9px] tracking-widest uppercase text-white/60">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-white/20 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-white/60">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-white/20 font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-white/60">Contact Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-white/20 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] tracking-widest uppercase text-white/60">Your Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="How can we assist you today?"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-xs text-white focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-white/20 font-sans resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-red-400 text-xs text-center font-sans mt-2">{errorMessage}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a059] text-black py-3 rounded-md text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#d4af37] transition-all active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};