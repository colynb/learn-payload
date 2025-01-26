"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationSelect } from "@/components/location-select";
import locations from "@/data/locations";

export const HeroWithSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [location] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search:", { keywords, location });
  };

  return (
    <div className="bg-brand-primary relative">
      <div className="container p-4 mx-auto relative lg:h-[590px]  flex items-center">
        <div className="relative z-10">
          <div className="w-full lg:w-1/2 pr-6">
            <h1 className="font-black font-display uppercase text-5xl lg:text-6xl text-white mb-4">
              Discover Your Dream Home in East Tennessee!
            </h1>
            <h2 className="text-3xl lg:text-4xl text-white mb-8 leading-snug">
              Your gateway to mountain living in America&apos;s adventure
              capital!
            </h2>
          </div>
          {/* Search Form */}
          <div className="w-full lg:w-2/3 max-w-5xl bg-white p-8 rounded-2xl shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                type="text"
                spread={"xl"}
                placeholder="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />

              <div className="flex gap-4">
                <LocationSelect locations={locations} onChange={console.log} />
                <Button variant="accent" size="xl" weight="bold" type="submit">
                  Go
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Background Image */}
        <div className="hidden lg:block absolute right-0 top-0 rounded-xl overflow-hidden w-1/2 lg:h-[590px] ">
          <Image
            src="https://images.unsplash.com/photo-1588732583352-0a684221c9f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlbm5lc3NlZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="East Tennessee Mountains"
            className="object-cover aspect-square h-full w-full"
            width={590}
            height={590}
          />
        </div>
      </div>
    </div>
  );
};
