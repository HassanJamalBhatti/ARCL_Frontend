"use client";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">

      <section className="relative bg-[#3f1a7b] py-20 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-black/40" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get in Touch
          </h2>

          <p className="mt-4 text-lg text-yellow-300 max-w-2xl mx-auto">
            Have questions or want to learn more about our programs, events, or publications? Fill out the form below and we’ll get back to you shortly.
          </p>

          {/* FORM */}
          <form
            action="https://formsubmit.co/info@arcl.org.pk"
            method="POST"
            className="mt-10 bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full md:w-auto px-8 py-3 bg-yellow-400 text-[#3f1a7b] font-semibold rounded-full hover:bg-[#3f1a7b] hover:text-white transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
