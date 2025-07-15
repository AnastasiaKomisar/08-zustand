"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation= useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes']});
      clearDraft();
      router.back();
    },
  });

   const handleSubmit = async (formData: FormData) => {
    const note = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };

    if (!note.title || !note.tag) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    mutation.mutate(note);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title" className={css.label}>Title</label>
        <input
          id="title"
          name="title" 
          type="text"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content" className={css.label}>Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={8}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isSubmitting}>
          Create note
        </button>
        <button type="button" className={css.cancelButton} disabled={isSubmitting} onClick={() => { router.back(); }}>
          Cancel
        </button>
      </div>
    </form>
  );
};


