import Basket from "@/components/Basket";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Product from "@/components/Product";
import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { fetchCategories } from "../../utils/fectchCategories";
import { fetchProducts } from "../../utils/fetchProdutcs";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}
export default function Home({ categories, products, session }: Props) {
  // Filtrando os produtos pelas categorias
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />);
  };
  return (
    <>
      {/* Header */}
      <Header />

      {/* Carrinho */}
      <Basket />

      {/* Main */}
      <main className="relative h-[200vh] bg-[#232428]">
        {/* Landing */}
        <Landing />
      </main>

      {/* Section */}
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#111111] borderGradientTop">
        <div className="space-y-4 py-16">
          <h1 className="text-center text-4xl font-bold tracking-wide text-white uppercase md:text-5xl">
            Choose your size.
          </h1>
          <h1 className="text-center text-4xl font-medium tracking-wide uppercase text-white md:text-5xl">
            Choose your chip.
          </h1>
          <h1 className="text-center text-4xl font-semibold tracking-wide md:text-5xl bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
            Let it rip.
          </h1>
        </div>

        {/* Headless Ui */}
        <Tab.Group>
          <Tab.List className="grid items-center justify-center md:flex ">
            {categories.map((category) => (
              <Tab
                key={category._id}
                id={category._id}
                className={({
                  selected,
                }) => `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-normal outline-none md:py-4 md:px-6 md:text-base 
                  ${
                    selected
                      ? "borderGradient bg-[#35383C] text-white"
                      : "border-b-2 border-[#35383C] text-[#747474]"
                  }`}
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
            <Tab.Panel className="tabPanel"> {showProducts(0)} </Tab.Panel>
            <Tab.Panel className="tabPanel"> {showProducts(1)} </Tab.Panel>
            <Tab.Panel className="tabPanel"> {showProducts(2)} </Tab.Panel>
            <Tab.Panel className="tabPanel"> {showProducts(3)} </Tab.Panel>
            <Tab.Panel className="tabPanel"> {showProducts(4)} </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </>
  );
}

{
  /*  Server Side Rendering */
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);
  return {
    props: {
      categories,
      products,
      session
    },
  };
};
