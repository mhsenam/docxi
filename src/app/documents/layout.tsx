interface DocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="w-full bg-red-300">nav</nav>
      {children}
    </div>
  );
};

export default DocumentLayout;