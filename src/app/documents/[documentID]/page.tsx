"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useDocumentStore, { Document } from "@/lib/store"; // Import the store and Document type

const DocumentIdPage = () => {
  const router = useRouter();
  const params = useParams();
  const documentId = params.documentID as string;

  const { getDocument, updateDocument } = useDocumentStore((state) => ({
    getDocument: state.getDocument,
    updateDocument: state.updateDocument,
  }));

  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (documentId) {
      setLoading(true);
      const doc = getDocument(documentId);
      if (doc) {
        setCurrentDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
        setNotFound(false);
      } else {
        // If document not found in store, it might be a new one just created
        // or an invalid ID. The store handles creation, so if it's not there,
        // it's likely an invalid/old ID.
        setNotFound(true);
        setCurrentDocument(null);
      }
      setLoading(false);
    }
  }, [documentId, getDocument]);

  const handleSave = () => {
    if (currentDocument) {
      if (!title.trim()) {
        alert("Title cannot be empty."); // Basic validation
        return;
      }
      updateDocument(currentDocument.id, title, content);
      // Refresh local state from store to ensure consistency, though Zustand handles this
      const updatedDoc = getDocument(currentDocument.id);
      if (updatedDoc) setCurrentDocument(updatedDoc);
      setEditing(false);
    }
  };

  const handleEdit = () => {
    if(currentDocument) {
        setTitle(currentDocument.title);
        setContent(currentDocument.content);
        setEditing(true);
    }
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading document...</div>;
  }

  if (notFound) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Document Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The document you are looking for does not exist or may have been deleted.
        </p>
        <Link href="/" passHref>
          <Button variant="outline">Back to Documents List</Button>
        </Link>
      </div>
    );
  }

  if (!currentDocument) {
     // This case should ideally be covered by notFound, but as a fallback:
    return <div className="container mx-auto p-4 text-center">Error loading document details.</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        {!editing ? (
          <h1 className="text-3xl font-bold break-all">{currentDocument.title}</h1>
        ) : (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold dark:bg-gray-800 dark:text-white"
            placeholder="Document Title"
          />
        )}
        <div className="flex space-x-2">
          <Link href="/" passHref>
            <Button variant="outline">Back to Documents</Button>
          </Link>
          {editing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </div>
      </div>

      {!editing ? (
        <div className="prose dark:prose-invert max-w-none p-4 border rounded bg-white dark:bg-gray-800 shadow">
          <div style={{ whiteSpace: "pre-wrap" }}>{currentDocument.content}</div>
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          placeholder="Document content..."
          className="dark:bg-gray-800 dark:text-white text-base p-4 border rounded shadow"
        />
      )}
       <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Created: {new Date(currentDocument.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(currentDocument.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DocumentIdPage;
