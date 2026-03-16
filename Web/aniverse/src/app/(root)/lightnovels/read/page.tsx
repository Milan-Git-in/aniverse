import EpubReaderWrapper from "@/components/EpubReaderWrapper";

interface ReadPageProps {
  searchParams: Promise<{ url?: string; title?: string }>;
}

const ReadPage = async ({ searchParams }: ReadPageProps) => {
  const { url, title } = await searchParams;

  if (!url) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <p>No epub URL provided.</p>
      </div>
    );
  }

  const decodedUrl = decodeURIComponent(url);
  const decodedTitle = title ? decodeURIComponent(title) : undefined;

  return <EpubReaderWrapper url={decodedUrl} title={decodedTitle} />;
};

export default ReadPage;
