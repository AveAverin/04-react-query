import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : "https://placehold.co/1200x675?text=No+Image";

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
                    &times;
                </button>

                <img src={backdropUrl} alt={movie.title} className={css.image} />

                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        modalRoot
    );
}