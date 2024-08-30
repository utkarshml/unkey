"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book, ChevronRight, LogOut, Rocket, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
export const UserButton: React.FC = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed inset-x-0 z-20 bottom-0 flex items-center justify-between gap-2 px-6 py-3 w-60 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer">
        <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
          {/* TODO: Add Image or Name from Lucia */}
          <Avatar className="w-8 h-8">
            {/* {user.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt="Profile picture" />
            ) : null} */}
            <AvatarFallback className=" w-8 h-8 overflow-hidden text-gray-700 bg-gray-100 border border-gray-500 rounded-md">
              {/* {(user?.fullName ??*/} "U".slice(0, 2).toUpperCase()
            </AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger className="w-full overflow-hidden text-ellipsis">
              {/* TODO Add User from Lucia */}
              <span className="overflow-hidden text-ellipsis text-sm font-semibold">
                {/* {user.username ??
                  user.fullName ??
                  user.primaryEmailAddress?.emailAddress} */}
                James
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {/* TODO: Add User from Lucia */}
              <span className="text-sm font-semibold">
                {/* {user.username ??
                  user.fullName ??
                  user.primaryEmailAddress?.emailAddress} */}
                James
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
        <ChevronRight className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-96">
        <DropdownMenuGroup>
          <Link href="/new">
            <DropdownMenuItem className="cursor-pointer">
              <Rocket className="w-4 h-4 mr-2" />
              <span>Onboarding</span>
            </DropdownMenuItem>
          </Link>
          <Link href="https://unkey.dev/docs" target="_blank">
            <DropdownMenuItem className="cursor-pointer">
              <Book className="w-4 h-4 mr-2" />
              <span>Docs</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings/user">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* TODO: Add Sign out from Lucia */}
          <Button onClick={() => router.push("/auth/sign-in")}>
            <DropdownMenuItem asChild className="cursor-pointer">
              <span>
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </span>
            </DropdownMenuItem>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
