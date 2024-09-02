import Image from "next/image";

interface CarouselProps {
  items: Array<CarouselItem>;
}
export interface CarouselItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function Carousel(props: CarouselProps) {
  return (
    <div className="flex justify-center">
      <div className="carousel carousel-center max-w-max space-x-4 rounded-box bg-neutral p-4">
        {props.items.map((item, index) => (
          <div key={index} className="carousel-item">
            <Image src={item.src} className="rounded-box" alt={item.alt} width={300} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
}
