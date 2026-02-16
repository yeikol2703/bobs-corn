export function Banner() {
  return (
    <section className="relative flex-1 min-h-0 overflow-hidden bg-gray-100 border border-gray-200 w-full">
      <img
        src="/banner.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full"
        aria-hidden
        loading="eager"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-1">
        <span className="text-[3rem] font-semibold tracking-wide text-white/90">Bob Sell Corn</span>
        <p className="text-white text-sm leading-relaxed">You are helping a farmer named Bob sells corn 🌽.</p>
      </div>
    </section>
  );
}
