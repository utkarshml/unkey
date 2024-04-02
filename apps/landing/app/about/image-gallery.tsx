"use client";
import placeholder from "@/images/about/landscape-placeholder.svg";
import { cn } from "@/lib/utils";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useState } from "react";

const imageGallery = [
  { label: "image 0", src: placeholder },
  { label: "image 1", src: placeholder },
  { label: "image 2", src: placeholder },
  { label: "image 3", src: placeholder },
  { label: "image 4", src: placeholder },
  { label: "image 5", src: placeholder },
  { label: "image 6", src: placeholder },
  { label: "image 7", src: placeholder },
  { label: "image 8", src: placeholder },
  { label: "image 9", src: placeholder },
  { label: "image 9", src: placeholder },
];

export function ImageGallery() {
  const [_, setImageToShow] = useState(-1);
  const [showImage, setShowImage] = useState(false);
  return (
    <div className="grid about-image-grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-[62px]">
      <>
        {imageGallery.map((image, i) => {
          if (i === 9) {
            return (
              <div className="image w-full md:w-[200px] h-[400px] hidden md:block xl:hidden bg-black rounded-lg" />
            );
          }
          return (
            <button
              type="button"
              onClick={() => {
                setShowImage(true);
                setImageToShow(i);
              }}
              className="image w-full md:w-[200px] h-[400px] rounded-lg relative"
            >
              <PhotoLabel
                className="absolute bottom-[40px] left-[calc(50%-40px)]"
                text={image.label}
              />
              <Image
                src={image.src}
                alt="photo of a car"
                className="object-cover w-full h-full rounded-lg"
              />
            </button>
          );
        })}
        <FsLightbox toggler={showImage} sources={<div>Something</div>} />
      </>
    </div>
  );
}

function PhotoLabel({ text, className }: { text: string; className: string }) {
  return (
    <div
      className={cn(
        className,
        "bg-gradient-to-r from-black/70 to-black/40 px-4 py-1.5 rounded-[6px] backdrop-blur-md border-[0.75px] border-white/20",
      )}
    >
      <p className="text-xs text-white">{text}</p>
    </div>
  );
}
