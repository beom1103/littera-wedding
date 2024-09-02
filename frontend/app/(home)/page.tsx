"use client";
import { Carousel, CarouselItem } from "@components/common/Carousel";
import Hero from "@components/common/Hero";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const items: CarouselItem[] = [
    { src: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg", alt: "Image 1" },
    { src: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg", alt: "Image 1" },
    { src: "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg", alt: "Image 1" },
    { src: "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg", alt: "Image 1" },
    { src: "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg", alt: "Image 1" },
  ];

  return (
    <div>
      <Hero
        title="나만의 청첩장 Littera에서 만들어보세요"
        descriptions={["다양하고 특별한 디자인의 청첩장", "무료 제작 후 구매 결정"]}
        buttonText="무료 제작하기"
        buttonOnclick={() => router.push("/invitations/add")}
      />
      <Carousel items={items} />
    </div>
  );
};

export default Home;
