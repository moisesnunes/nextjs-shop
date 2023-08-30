import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../../redux/basketSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function Basket() {
  const items = useSelector(selectBasketItems);

  if (items.length === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-zinc-950">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 text-lg flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-[10px] text-white">
            {items.length}
          </span>
        )}
        <ShoppingBagIcon className="headerIcon w-9 h-9" />
      </div>
    </Link>
  );
}

export default Basket;
