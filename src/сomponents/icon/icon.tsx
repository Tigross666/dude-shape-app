export interface IconProps {
  src: string;
  alt?: string;
}

export const Icon = ({ src, alt }: IconProps) => {
  return <img src={src} alt={alt} />;
};
