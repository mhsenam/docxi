interface DocumentIdPageProps {
  params: Promise<{ documentID: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const awaitedProps = await params;
  return <div>DocumentId : {awaitedProps.documentID}</div>;
};

export default DocumentIdPage;
