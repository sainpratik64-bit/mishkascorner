'use client';

import { useState } from 'react';

interface CollectionDescriptionProps {
  description: string;
  truncateAt?: number;
}

export function CollectionDescription({
  description,
  truncateAt = 220,
}: CollectionDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = description.length > truncateAt;
  const displayText =
    expanded || !needsTruncate
      ? description
      : `${description.slice(0, truncateAt).trim()}...`;

  return (
    <div className="mx-auto max-w-3xl px-[15px] py-8 text-center md:px-[50px] md:py-10">
      <p className="bc-collection-desc text-sm leading-relaxed md:text-base">
        {displayText}
        {needsTruncate && !expanded && (
          <>
            {' '}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="bc-text-link inline underline"
            >
              Read more
            </button>
          </>
        )}
      </p>
    </div>
  );
}
