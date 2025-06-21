"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import useDocumentStore from "@/lib/store";

const Home = () => {
  const documents = useDocumentStore((state) => state.documents);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <Link href="/documents/new" passHref>
          <Button>Create New Document</Button>
        </Link>
      </div>
      {documents.length > 0 ? (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="p-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Link href={`/documents/${doc.id}`} className="block">
                <h2 className="font-semibold text-lg">{doc.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 dark:text-gray-400">No documents yet. Create one!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
