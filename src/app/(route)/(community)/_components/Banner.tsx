import Image from "next/image";

const Banner = ({ url }: { url: string }) => {
  return (
    <header className="w-full h-[160px] relative">
      <Image src={`/${url}`} alt="banner" fill style={{ objectFit: "cover" }} />
    </header>
  );
};

export default Banner;
