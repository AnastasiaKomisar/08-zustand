import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(Number(id));
  // const { title, content, tag } = await fetchNoteById(Number(id));

  if (!note) {
    return {
      title: "Note not found",
      description: "No note was found with the provided ID.",
    };
  }

  const shortContent = note.content.length > 100
    ? note.content.slice(0, note.content.lastIndexOf(' ', 100)) + "..."
    : note.content;

  return {
    title: note.title,
    description: shortContent,
    metadataBase: new URL("https://08-zustand-zeta.vercel.app"),
    openGraph: {
      title: note.title,
      description: shortContent,
      url: `https://08-zustand-xi.vercel.app/notes/filter/${id}`, 
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub styling card',
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const parseId = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(parseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
