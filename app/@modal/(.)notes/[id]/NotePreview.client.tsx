"use client";

import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";

type NotePreviewClientProps = {
  id?: number;
};

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const params = useParams();
  const noteId = id ?? Number(params?.id);
  
  const handleCloseModal = () => {
    router.back();
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });
  
  return (
    <Modal onClose={handleCloseModal}>
      {isLoading && <p>Loading note details...</p>}
      {isError && <p>Failed to load note details.</p>}
      {data && <NotePreview note={data} />}
    </Modal>
  );
}