declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Специально для swiper/css
declare module "swiper/css" {
  const content: any;
  export default content;
}

declare module "swiper/css/*" {
  const content: any;
  export default content;
}
