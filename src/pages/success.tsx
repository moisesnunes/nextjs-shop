import BuyBtn from "@/components/Button";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { fetchLineItems } from "../../utils/fetchLineItems";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}

function Success({ products }: Props) {
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );
  const {data: session} = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // react-responsive showOrderSumary always true for desktop but only conditional true for mobile
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;
  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
  return (
    <div>
      <header className="mx-auto max-w-xl">
        <Link href="/">
          <div className="relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
            <Image src="https://rb.gy/vsvv2o" fill objectFit="contain" alt="" />
          </div>
        </Link>
      </header>

      <main className="grid gri-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl lg:col-span-5 pb-12 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16">
          <Link href="/">
            <div className="relative hidden h-24 w-12 ml-14 cursor-pointer transition lg:inline-flex">
              <Image
                src="https://rb.gy/vsvv2o"
                fill
                objectFit="contain"
                alt=""
              />
            </div>
          </Link>

          <div className="my-8 flex ml-4 space-x-4 lg:ml-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Ordem #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Obrigado {""}
                {session ? session.user?.name?.split(" ")[0] : "Usúario"}
              </h4>
            </div>
          </div>
          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3 ">
              <p>Sua ordem foi confirmada</p>
              <p className="text-sm text-gray-600">
                Nós aceitamos a sua ordem e estamos preparando tudo. Volta para
                está página em instantes com atualizações sobre a entrega.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">Outro número: </p>
              <p>CNB56692174</p>
            </div>
          </div>
          <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Outras atualizações</p>
            <p className="text-sm text-gray-600">
              Você receberá atualizações do envio e entrega por e-mail e mesagem
              de texto.
            </p>
          </div>
          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">
              Precisa de ajuda? Entre em contato.{" "}
            </p>
            {mounted && (
              <BuyBtn
                title="Continue comprando"
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "" : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummary && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <p>Mostrar o resumo:</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  R$
                  {subtotal
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </p>
              </div>
            </div>
            {showOrderSummary && (
              <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:mx-w-lg lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 text-sm font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white ">
                        <div className="relative h-7 w-7 animate-bounce rounded-md">
                          <Image
                            src="https://rb.gy/vsvv2o"
                            fill
                            objectFit="contain"
                            alt=""
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description} </p>
                      <p>
                        R$
                        {(product.price.unit_amount / 100)
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-medium">
                      R$
                      {subtotal
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Desconto</p>
                    <p className="text-[gray]">R$ - </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Frete</p>
                    <p className="text-[gray]">Grátis</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p className="text-lg">Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    BRL{" "}
                    <span className="text-xl font-medium text-black">
                      {subtotal
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Success;

// Server side rendering
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);
  return {
    props: {
      products,
    },
  };
};
