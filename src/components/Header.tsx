import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const {data: session} = useSession();
  const items = useSelector(selectBasketItems);
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#111111] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="h-10 relative w-10 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image src="/apple.webp" fill objectFit="contain" alt="" />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerlink" href="">
          Produtos
        </a>
        <a className="headerlink" href="">
          Explore
        </a>
        <a className="headerlink" href="">
          Suporte
        </a>
        <a className="headerlink" href="">
          Negocios
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <MagnifyingGlassIcon className="headerIcon " />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
              {items.length}
            </span>
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {/* Operação ternaria se tiver uma seção mostre o usúario, caso contrario mostre apenas o icone */}
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon
            className="headerIcon"
            onClick={() => signIn()}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
