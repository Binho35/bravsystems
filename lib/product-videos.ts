export type ProductVideo = {
  slug: "bravos" | "bravhas" | "bravacademy" | "bravvideo";
  productName: string;
  src: string;
  poster: string;
  title: string;
  description: string;
  width: 512;
  height: 910;
  assetPresent: boolean;
};

export const productVideos: ProductVideo[] = [
  {
    slug: "bravos",
    productName: "BravOS",
    src: "/product-videos/16623CBB-AD78-4480-B09E-EE8E53335411.mp4",
    poster: "/product-videos/posters/bravos.svg",
    title: "Apresentação do BravOS",
    description: "Vídeo vertical de apresentação do BravOS. O player é carregado somente quando solicitado.",
    width: 512,
    height: 910,
    assetPresent: true,
  },
  {
    slug: "bravhas",
    productName: "BravHAS",
    src: "/product-videos/0CFE05FE-68C5-4278-B49A-594BCA0AFB55(1).mp4",
    poster: "/product-videos/posters/bravhas.svg",
    title: "Apresentação do BravHAS",
    description: "Vídeo vertical de apresentação do BravHAS. O player é carregado somente quando solicitado.",
    width: 512,
    height: 910,
    assetPresent: true,
  },
  {
    slug: "bravacademy",
    productName: "BravAcademy",
    src: "/product-videos/E8FD96E0-0A8D-41C4-8E0C-C77C43EC212F.mp4",
    poster: "/bravsystems-logo.png",
    title: "Apresentação da BravAcademy",
    description: "Vídeo vertical de apresentação da BravAcademy. O player é carregado somente quando solicitado.",
    width: 512,
    height: 910,
    assetPresent: false,
  },
  {
    slug: "bravvideo",
    productName: "BravVideo",
    src: "/product-videos/5A6BC2BF-0A0B-4AFC-B8C9-77BB2AC84FBD.mp4",
    poster: "/product-videos/posters/bravvideo.svg",
    title: "Apresentação do BravVideo",
    description: "Vídeo vertical de apresentação do BravVideo. O player é carregado somente quando solicitado.",
    width: 512,
    height: 910,
    assetPresent: true,
  },
];

export const getProductVideo = (slug: string) => productVideos.find((video) => video.slug === slug);
