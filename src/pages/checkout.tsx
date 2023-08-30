import BuyBtn from "@/components/Button";
import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stripe from "stripe";
import { selectBasketItems, selectBasketTotal } from "../../redux/basketSlice";
import getStripe from "../../utils/get-stripe";
import { fetchPostJSON } from "../../utils/stripe-helpers";

function Checkout() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      { items: items }
    );
    // Se tivermos um erro
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };
  return (
    <div className="min-h-screen overflow-hidden bg-[#232428]">
      <Header />
      <main className="md:mx-auto mx-5 max-w-5xl pb-24">
        <div className="py-5 border-b border-gray-400">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0
              ? "Veja o que você tem no seu carrinho! :)"
              : "Seu carrinho está vazio"}
          </h1>
          <p className="my-4">Fretes grátis para todo brasil.</p>
          {items.length === 0 && (
            <BuyBtn
              onClick={() => router.push("/")}
              title="Continue comprando"
            />
          )}
        </div>
        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divid-y divid-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      R$
                      {basketTotal
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Fretes Grátis</p>
                </div>
              </div>
              <div className="flex justify-between pt-4 text-xl font-semibold">
                <h4>Total</h4>
                <h4 className="text-2xl">
                  R$
                  {basketTotal
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                </h4>
              </div>
              {/* Checkout */}
              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  Vamos finalizar sua compra?
                </h4>
                <BuyBtn
                  noIcon
                  title="Pagar"
                  onClick={() => createCheckoutSession()}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
