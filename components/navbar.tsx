"use client";

import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <SignedIn>
          <Button size={"sm"} variant={"premium"}>
            Upgrade <Sparkles className="h-4 w-4 fill-white ml-2" />
          </Button>
          <ModeToggle />
          <UserButton afterSwitchSessionUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button className="cursor-pointer">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
          {/* <RedirectToSignIn /> */}
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
