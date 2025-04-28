import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    const searchFilters = {
      keyword: query,
      Location: '',
      Industry: '',
      Salary: ''
    };
    dispatch(setSearchedQuery(searchFilters));
    navigate("/browse");
  };

  return (
    <section className="relative min-h-[32vh] flex flex-col justify-center items-center bg-gradient-to-br from-[#f6f7fb] via-[#f9f6ff] to-[#fff6f2] px-2 pt-2 pb-8">
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-[#6A38C2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-40 bg-[#F83002]/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
        <span className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#fff] via-[#f4ebff] to-[#ffe8d6] text-[#F83002] font-semibold text-xs border border-[#f830021a] tracking-wider uppercase letter-spacing-[0.15em]">
          No. 1 Job Platform
        </span>
        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-gray-900 drop-shadow-sm">
          <span className="block">Search, Apply &</span>
          <span className="block bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-[#ffbe30] bg-clip-text text-transparent animate-gradient-x">
            Get Your Dream Job
          </span>
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="flex w-full md:w-[90%] bg-white/70 shadow-2xl border border-gray-100 pl-4 pr-2 py-2 rounded-full items-center gap-3 backdrop-blur-xl transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(106,56,194,0.10)]">
            <input
              type="text"
              placeholder="Find your dream job..."
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-transparent text-base md:text-lg px-2 placeholder-gray-400 font-medium"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-full bg-gradient-to-br from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] shadow-lg text-white px-4 py-2 transition-all duration-200 font-bold text-base"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
