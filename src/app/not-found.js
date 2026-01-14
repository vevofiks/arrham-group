import ScrollVelocity from "@/components/ScrollVelocity";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function NotFound() {
  return (
    <div className=" rounded-4xl h-[90vh] mt-28  bg-linear-to-b from-red-800 px-2 mx-2 to-black">
      {/* <div className=" rounded-4xl h-[90vh] mt-28 bg-linear-to-b from-lgreen px-2 to-black"> */}
      <div className=" pt-32 overflow-x-hidden">

        <ScrollVelocity
          texts={['Page Not Found', '404 Error']}
          velocity={50}
          className={`custom-scroll-text ${montserrat.className} text-white text-6xl md:text-8xl`}
        />

      </div>

    </div>
  );
}
