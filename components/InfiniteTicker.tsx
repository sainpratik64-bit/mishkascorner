import { TICKER_MESSAGES } from '@/lib/data/mock-products';

export function InfiniteTicker() {
  const items = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <div
      className="relative w-full overflow-hidden bg-brand-black text-brand-white"
      aria-label="Store announcements"
    >
      <div className="marquee-track py-3.5">
        {items.map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="bc-announcement shrink-0 whitespace-nowrap px-8 uppercase"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
