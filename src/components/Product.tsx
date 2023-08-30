import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/basketSlice";
import { urlFor } from "../../sanity";

interface Props {
  product: Product;
}

function Product({ product }: Props) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} adicionado ao carrinho`, {
      position: "top-center",
    });
  };
  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#232428] p-8 md:h-[500px] md:w-[400px] md:p-10 borderGradient">
      <p className="text-white text-2xl md:text-3xl">{product.title}</p>
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          alt="img-product"
          fill
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>
            R${" "}
            {product.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </p>
        </div>
        <div
          onClick={addItemToBasket}
          className="flex h-16 w-16 flex-shrik-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
        >
          <ShoppingCartIcon className="h-8 w-8 headerIcon" />
        </div>
      </div>
      <div className="md:text-2xl text-sm">
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default Product;
