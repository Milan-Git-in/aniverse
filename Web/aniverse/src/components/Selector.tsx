"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Selector({
  position,
  setPosition,
}: {
  position: number;
  setPosition: (position: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-purple-700 bg-black w-42 font-bold">
          {position === 1 ? "Airing Today" : "Recent Activity"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-42 outline-0 border-0 bg-black text-white">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value={1}>
              Airing Today
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value={2}>
              Recent Activity
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
