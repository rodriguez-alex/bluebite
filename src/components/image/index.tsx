interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div
      style={{
        background: `#4162e7 url(${src}) no-repeat bottom left`,
        backgroundSize: " cover",
        border: "none",
        borderRadius: 10,
        width: "330px",
        height: "150px",
        display: "flex",
      }}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
