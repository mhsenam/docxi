"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useDocumentStore from "@/lib/store"; // Import the store

const NewDocumentPage = () => {
  const router = useRouter();
  const addDocument = useDocumentStore((state) => state.addDocument); // Get the addDocument action
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      // Basic validation: prevent creating documents with empty titles
      alert("Title cannot be empty."); // Replace with a proper UI notification later
      return;
    }
    const newDocument = addDocument(title, content); // Use the store action
    router.push(`/documents/${newDocument.id}`); // Redirect to the new document's page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Document</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document Title"
            className="dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your document here..."
            rows={10}
            className="dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Document</Button>
        </div>
      </div>
    </div>
  );
};

export default NewDocumentPage;
