import Image from "next/image";

export default function BannerPage() {
  return (
    <main className="flex flex-row items-center justify-center w-full h-full">
      <section className="flex flex-col items-center space-y-4">
        <img
          className="rounded-full shadow-2xl"
          src="/me.png"
          alt="Profile picture"
          width={150}
          height={150}
        />
        <p className="text-5xl">Toni Petrina</p>
        <p className="text-2xl">
          Site Reliability Engineer @ Visma e-conomic a/s
        </p>
      </section>
    </main>
  );
}
