"use client";

import { create } from 'zustand';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentStoreState {
  documents: Document[];
  getDocument: (id: string) => Document | undefined;
  addDocument: (title: string, content: string) => Document;
  updateDocument: (id: string, title: string, content: string) => void;
  deleteDocument: (id: string) => void; // Added for completeness, though not in current plan steps
}

const useDocumentStore = create<DocumentStoreState>((set, get) => ({
  documents: [
    // Initial placeholder data
    { id: "1", title: "First Document", content: "This is the first pre-loaded document.", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", title: "Second Document", content: "Content for the second document.", createdAt: new Date(), updatedAt: new Date() },
    { id: "3", title: "Tips for Writing", content: "Start with an outline, then fill in the details.", createdAt: new Date(), updatedAt: new Date() },
  ],
  getDocument: (id) => get().documents.find(doc => doc.id === id),
  addDocument: (title, content) => {
    const newDocument: Document = {
      id: Math.random().toString(36).substring(2, 9), // More robust ID
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set(state => ({ documents: [...state.documents, newDocument] }));
    return newDocument;
  },
  updateDocument: (id, title, content) => {
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === id ? { ...doc, title, content, updatedAt: new Date() } : doc
      ),
    }));
  },
  deleteDocument: (id) => {
    set(state => ({
      documents: state.documents.filter(doc => doc.id !== id),
    }));
  },
}));

export default useDocumentStore;
