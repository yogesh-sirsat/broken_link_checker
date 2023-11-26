"use client";
import { useState } from "react";
import LinkCheckerForm from "@/components/LinkCheckerForm";
import LinkCheckerResult from "@/components/LinkCheckerResult";

const Home = () => {
  const [brokenLinks, setBrokenLinks] = useState([
    "https://example.com",
    "https://example.com",
    "https://example.com",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckLinks = async (url) => {
    setBrokenLinks([]);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/checklinks?url=${url}`);
      if (!response.ok) {
        throw new Error("Failed to check links");
      }
      const data = await response.json();
      if (Object.keys(data.invalidLinks).length === 0) {
        alert("No broken links found");
      } else {
        setBrokenLinks(data.invalidLinks);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error checking links:", error);
    }
  };

  return (
    <main className="container mx-auto bg-base-100 p-4 h-screen">
      <section className="flex flex-col items-center ">
        <h1 className="text-3xl font-bold">Broken Link Checker</h1>
        <div className="w-full xs:max-w-xs">
          <LinkCheckerForm onSubmit={handleCheckLinks} isLoading={isLoading} />
          {brokenLinks.length > 0 && <LinkCheckerResult links={brokenLinks} />}
        </div>
      </section>
    </main>
  );
};

export default Home;
