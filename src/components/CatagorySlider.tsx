"use client";

import {
  Apple,
  Milk,
  Wheat,
  Cookie,
  Flame,
  Coffee,
  User,
  Home,
  Package,
  Baby,
  Dog,
  Croissant,
  Droplet,
  Nut,
  Candy,
  Snowflake,
  CookingPot,
  HeartPulse,
  Leaf,
  SprayCan,
  Utensils,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CatagorySlider = () => {
  const categories = [
    {
      id: 1,
      name: "Fruits & Vegetables",
      icon: Apple,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      icon: Milk,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "Rice, Atta & Grains",
      icon: Wheat,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 4,
      name: "Snacks & Biscuits",
      icon: Cookie,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 5,
      name: "Spices & Masalas",
      icon: Flame,
      color: "bg-red-100 text-red-700",
    },
    {
      id: 6,
      name: "Beverages & Drinks",
      icon: Coffee,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: 7,
      name: "Personal Care",
      icon: User,
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: 8,
      name: "Household Essentials",
      icon: Home,
      color: "bg-slate-100 text-slate-700",
    },
    {
      id: 9,
      name: "Instant & Packaged Food",
      icon: Package,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 10,
      name: "Baby Care",
      icon: Baby,
      color: "bg-rose-100 text-rose-700",
    },
    { id: 11, name: "Pet Care", icon: Dog, color: "bg-teal-100 text-teal-700" },
    {
      id: 12,
      name: "Bakery & Breads",
      icon: Croissant,
      color: "bg-yellow-50 text-yellow-800",
    },
    {
      id: 13,
      name: "Cooking Oils & Ghee",
      icon: Droplet,
      color: "bg-lime-100 text-lime-700",
    },
    {
      id: 14,
      name: "Dry Fruits & Nuts",
      icon: Nut,
      color: "bg-amber-200 text-amber-800",
    },
    {
      id: 15,
      name: "Sweets & Chocolates",
      icon: Candy,
      color: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
      id: 16,
      name: "Frozen Foods",
      icon: Snowflake,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: 17,
      name: "Ready to Cook",
      icon: CookingPot,
      color: "bg-orange-50 text-orange-800",
    },
    {
      id: 18,
      name: "Health & Wellness",
      icon: HeartPulse,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 19,
      name: "Organic Products",
      icon: Leaf,
      color: "bg-green-50 text-green-800",
    },
    {
      id: 20,
      name: "Cleaning Supplies",
      icon: SprayCan,
      color: "bg-sky-100 text-sky-700",
    },
    {
      id: 21,
      name: "Kitchen Essentials",
      icon: Utensils,
      color: "bg-neutral-100 text-neutral-700",
    },
  ];
  const [showLeft, setShowLeft] = useState<Boolean>();
  const [showRight, setShowRight] = useState<Boolean>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth <= scrollWidth - 5);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(autoScroll)
  }, []);

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <motion.div
      className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center ">
        🛒Shop by Category
      </h2>

      {showLeft && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/5 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all "
          onClick={() => {
            scroll("left");
          }}
        >
          <ChevronLeft className="w-6 h-6 text-green-700" />
        </button>
      )}

      <div
        className="flex gap-6 overflow-x-auto px-10 scrollbar-hide scroll-smooth"
        ref={scrollRef}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              className={`min-w-[150px] md:min-w-[180px] flex flex-col items-center justify-center rounded-2xl ${cat.color} shadow-md hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex flex-col items-center justify-center p-5">
                <Icon className="w-10 h-10  mb-3" />
                <p className="text-center text-sm md:text-base font-semibold text-gray-700">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {showRight && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/5 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all "
          onClick={() => {
            scroll("right");
          }}
        >
          <ChevronRight className="w-6 h-6 text-green-700" />
        </button>
      )}
    </motion.div>
  );
};

export default CatagorySlider;
