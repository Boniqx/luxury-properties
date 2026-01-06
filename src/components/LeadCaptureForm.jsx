import React, { useState } from "react";

const WEBHOOK_URL = "https://example.com/webhook"; // Mock webhook URL

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Truncate to 10 digits
    if (value.length > 10) value = value.slice(0, 10);

    // Format as (123) 456-7890
    let formattedValue = value;
    if (value.length > 0) {
      formattedValue = `(${value.slice(0, 3)}`;
    }
    if (value.length > 3) {
      formattedValue += `) ${value.slice(3, 6)}`;
    }
    if (value.length > 6) {
      formattedValue += `-${value.slice(6)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "phone") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted to:", WEBHOOK_URL, formData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="w-16 h-16 mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-gray-900 mb-2">
          Access Granted
        </h3>
        <p className="text-gray-600">
          Please check your email for the exclusive listing details.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-8 bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl border border-white/20"
    >
      <h2 className="text-3xl font-serif text-gray-900 mb-2">Inquire Now</h2>
      <p className="text-gray-500 mb-8 text-sm">
        Tell us a little bit about yourself.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] outline-none transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0F172A] text-white font-medium py-4 px-6 rounded-md hover:bg-[#1E293B] transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <span className="text-[#C5A059]">Unlock Access</span>
              <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Your information is secure. Verified Investors Only.
        </p>
      </div>
    </form>
  );
}
