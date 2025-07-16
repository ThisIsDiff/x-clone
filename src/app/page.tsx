import Image from "next/image";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {/* add link*/}
        {/* <Link href="/hello" className="text-white"> Go to Hello Page </Link> */}
        {/*FEED*/}
        {/*Widget*/}
        {/*MODAL*/}
      </main>
    </div>
  );
}
