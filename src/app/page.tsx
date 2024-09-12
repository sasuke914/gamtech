import DesktopUI from "@/components/home/desktopHomeUI";
import MobileUI from "@/components/home/mobileHomeUI";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <DesktopUI />
      <MobileUI />
    </main>
  );
}
