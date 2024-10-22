import { AppPublicHeader } from "@/components/app-public-header";

export default function Home() {
  return (
    <div>
      <div className="bg-white py-4 shadow-md">
        <AppPublicHeader />
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl gap-8">
        <div className="basis-2/3 bg-white shadow-md">Left Side</div>
        <div className="basis-1/3 bg-white shadow-md">Right Side</div>
      </div>
    </div>
  );
}
