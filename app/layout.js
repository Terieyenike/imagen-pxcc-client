import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public/assets";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Image generator with DALL-E",
  description:
    "Let AI generate an image based on a prompt, which you can then share with the community and save.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
            <Link href='/'>
              <Image
                src={logo}
                className='object-contain'
                style={{ width: "75px", height: "100%" }}
                alt='ai logo'
              />
            </Link>
            <SignedOut>
              <SignInButton className='whitespace-nowrap bg-blue-600 py-2 px-6 tracking-wide text-gray-50 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' />
            </SignedOut>

            <SignedIn>
              <div className='flex ml-auto items-center space-x-8'>
                <Link
                  href='/create-post'
                  className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md whitespace-nowrap'>
                  Create
                </Link>
                <UserButton />
              </div>
            </SignedIn>
          </header>
          <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
