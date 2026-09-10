"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductVideo } from "@/lib/product-videos";

export function ProductVideoDialog({ video }: { video: ProductVideo }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b8cfdf] bg-white px-6 font-bold text-[#154b7a] transition hover:border-[#154b7a] hover:bg-[#f7fbfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
      >
        Assistir apresentação
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`video-title-${video.slug}`}
        aria-describedby={`video-description-${video.slug}`}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setOpen(false)}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto max-h-[94vh] w-[min(94vw,760px)] overflow-hidden rounded-[28px] border border-[#c8dce8] bg-white p-0 text-[#0b2947] shadow-2xl backdrop:bg-[#061d31]/70"
      >
        <div className="grid max-h-[94vh] overflow-y-auto lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-h-[520px] items-center justify-center bg-[#061d31] p-4 sm:p-6">
            {video.assetPresent && open ? (
              <video
                className="aspect-[512/910] max-h-[78vh] w-auto max-w-full rounded-2xl bg-black object-contain shadow-2xl"
                controls
                playsInline
                preload="none"
                poster={video.poster}
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                Seu navegador não conseguiu reproduzir esta apresentação em vídeo.
              </video>
            ) : (
              <div className="aspect-[512/910] max-h-[72vh] w-full max-w-[360px] rounded-2xl border border-white/15 bg-[#0b2947] p-8 text-center text-white shadow-2xl">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8dc4e5]">{video.productName}</div>
                  <div className="mt-4 text-3xl font-bold">Apresentação em vídeo</div>
                  <p className="mt-5 text-sm leading-6 text-[#c3d7e4]">A interface está preparada, mas o arquivo de mídia ainda não está materialmente disponível nesta branch de preview.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <button
              type="button"
              onClick={closeDialog}
              autoFocus
              aria-label="Fechar apresentação"
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d2e0e9] bg-white text-xl font-bold text-[#154b7a] transition hover:bg-[#eef6fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              ×
            </button>
            <div className="mt-8 text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">Assistir apresentação</div>
            <h2 id={`video-title-${video.slug}`} className="mt-3 text-3xl font-bold tracking-[-.035em]">{video.title}</h2>
            <p id={`video-description-${video.slug}`} className="mt-5 text-[15px] leading-7 text-[#64748b]">{video.description}</p>
            <p className="mt-auto pt-8 text-xs leading-5 text-[#7890a3]">Formato vertical 9:16. Reprodução somente sob ação do visitante, com controles nativos e sem autoplay.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
