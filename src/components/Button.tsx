interface Props {
  title: string;
  onClick?: () => void;
  width?: string;
  loading?: boolean;
  padding?: string;
  noIcon?: boolean;
}

function BuyBtn({ title, width, onClick, loading, padding, noIcon }: Props) {
  return (
    <button
      className={`ease group relative z-30 box-border inline-flex ${
        width ? width : "w-auto"
      } ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-blue-600 bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>

      <span className="relative z-20 flex items-center font-semibold">
        {noIcon && (
          <svg
            className="relative mr-2 h-5 w-5 flex-shrink-0 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? "Loading..." : title}
      </span>
    </button>
  );
}

export default BuyBtn;
