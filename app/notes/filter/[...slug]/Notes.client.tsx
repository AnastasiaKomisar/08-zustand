'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NotesResponse } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';
import Link from "next/link";

interface NotesClientProps {
  initialData: NotesResponse;
  tag?: string;
}

export default function NotesClient({ initialData, tag = '' }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const perPage = 12;

  const trimmedSearch = debouncedSearch.trim();
  const isFirstLoad = page === 1 && trimmedSearch === '' && !tag;
  
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', page, trimmedSearch, tag],
    queryFn: () => fetchNotes(trimmedSearch, page, perPage, tag),
    placeholderData: keepPreviousData,
     ...(isFirstLoad ? { initialData } : {}),
    staleTime: 60 * 1000,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value = {search} 
          onChange={(value: string) => {
            setSearch(value); 
            setPage(1);
            }} 
        />

        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button} onClick={openModal}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}
      
      {Array.isArray(data?.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />)
      }

      {isModalOpen && (<Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
}
