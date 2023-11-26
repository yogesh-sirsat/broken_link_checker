"use client";
import { useState } from "react";
import LinkCheckerForm from "@/components/LinkCheckerForm";
import LinkCheckerResult from "@/components/LinkCheckerResult";

const Home = () => {
  const [brokenLinks, setBrokenLinks] = useState([]);

  const handleCheckLinks = async (url) => {
    try {
      const response = await fetch(`/api/checklinks?url=${url}`);
      if (!response.ok) {
        throw new Error("Failed to check links");
      }
      const data = await response.json();
      console.log(data);
      setBrokenLinks(data.invalidLinks || []);
    } catch (error) {
      console.error("Error checking links:", error);
    }
  };

  return (
    <main className="container mx-auto text-center">
      <h1 className="text-3xl font-bold">Broken Link Checker</h1>
      <LinkCheckerForm onSubmit={handleCheckLinks} />
      {brokenLinks.length > 0 && <LinkCheckerResult links={brokenLinks} />}
    </main>
  );
};

export default Home;
