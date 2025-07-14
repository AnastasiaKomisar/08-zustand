import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { NoteTag } from "@/types/note";

const tags: NoteTag[] = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
];
  
export default function SidebarNoteTags() {

    return (
        <ul className={css.menuList}>
            {tags.map(tag => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
};