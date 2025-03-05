import { CirculatingSupplySection } from "@/components/circulating-supply-section";

export default function Home() {
  return (
    <section>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3">
        <CirculatingSupplySection className="md:col-span-full" />
      </div>
    </section>
  );
}
