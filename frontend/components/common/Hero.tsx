interface HeroProps {
  title: string;
  descriptions?: string[];
  buttonText: string;
  buttonOnclick?: () => void;
}

export default function Hero({ title, descriptions, buttonText, buttonOnclick }: HeroProps) {
  return (
    <section className="my-20 p-16 text-center">
      <h2 className="mb-4 text-4xl font-bold">{title}</h2>
      {descriptions?.map((description, index) => (
        <p key={index + description} className="mb-2 text-2xl">
          {description}
        </p>
      ))}
      <button className="btn btn-outline mt-8 bg-white px-24 text-inherit hover:bg-primary hover:text-white" onClick={buttonOnclick}>
        {buttonText}
      </button>
    </section>
  );
}
