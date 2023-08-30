import Image from "next/image";
import { urlFor } from "../../sanity";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../../redux/basketSlice";
import toast from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removido do carrinho`, {
      position: "top-center",
    });
  };
  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-400 pb-8 lf:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          fill
          objectFit="contain"
          alt="product-img"
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="space-y-5">
          <div className="flex flex-col gap-x-10 px-4 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96"> {items[0].title} </h4>
            <p className="flex items-end gap-x-2 font-semibold text-2xl">
              {" "}
              {items.length}
              <ChevronDownIcon className="headerIcon w-6 h-6" />
            </p>
          </div>
          <p className="flex cursor-pointer px-4 items-end text-blue-500 hover:underline">
            Veja os detalhes do produto
            <ChevronDownIcon className="headerIcon w-6 h-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4>
            R$
            {items
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </h4>
          <button
            className="text-blue-500 hover:unerline"
            onClick={removeItemFromBasket}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
