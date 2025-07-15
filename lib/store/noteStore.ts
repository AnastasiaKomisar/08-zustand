import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: {...initialDraft} }),
    }),
    {
      name: 'note-draft-storage', 
    }
  )
);