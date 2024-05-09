import ContactForm from "@/components/forms/contactForm";

const SupportPage = () => {
  return (
    <main className="w-full lg:w-3/4 bg-green-50 p-5 rounded-3xl flex">
      <div className="w-full md:w-full px-3 md:pr-20 md:pl-4">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full lg:w-2/4 h-fit px-2 lg:px-8 py-3">
            <div className="mb-10 my-2">
              <h2 className="font-bold text-lg lg:text-3xl">CONTACT US</h2>
              <p className="text-xl leading-snug mt-4">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
            </div>
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;
