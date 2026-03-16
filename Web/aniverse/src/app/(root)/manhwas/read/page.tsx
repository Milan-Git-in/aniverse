import ReaderWrapper from "@/components/ReaderWrapper";

interface ReadPageProps {
  searchParams: Promise<{ url?: string; title?: string }>;
}

const ReadPage = async ({ searchParams }: ReadPageProps) => {
  const { url, title } = await searchParams;

  if (!url) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <p>No PDF URL provided.</p>
      </div>
    );
  }

  const decodedUrl = decodeURIComponent(url);
  const decodedTitle = title ? decodeURIComponent(title) : undefined;

  return <ReaderWrapper url={decodedUrl} title={decodedTitle} />;
};

export default ReadPage;
