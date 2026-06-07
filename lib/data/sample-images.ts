/** Curated Unsplash URLs for mock catalog display. */

function unsplash(
  photoId: string,
  width: number,
  height: number,
  focal: 'center' | 'top' = 'center'
) {
  const params = new URLSearchParams({
    w: String(width),
    h: String(height),
    fit: 'crop',
    crop: focal,
    auto: 'format',
    q: '80',
  });
  return `https://images.unsplash.com/${photoId}?${params.toString()}`;
}

export const SAMPLE_IMAGES = {
  heroes: {
    home: unsplash('photo-1469334031218-e382a71b716b', 1920, 1080),
    women: unsplash('photo-1594938298603-c8148c4dae35', 1920, 500, 'top'),
    men: unsplash('photo-1556821840-3a63f95609a7', 1920, 500, 'top'),
    unisex: unsplash('photo-1529131516924-56934f2a6270', 1920, 500, 'top'),
    newDrops: unsplash('photo-1441984904996-e96234309752', 1920, 500),
  },
  products: {
    blackTee: {
      primary: unsplash('photo-1521572163474-6864f9cf17ab', 600, 750),
      hover: unsplash('photo-1503342217507-d2b934854d69', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1521572163474-6864f9cf17ab', 800, 1000),
        unsplash('photo-1503342217507-d2b934854d69', 800, 1000, 'top'),
        unsplash('photo-1618354691373-c851696219c8', 800, 1000),
        unsplash('photo-1576566588028-4147f3842f27', 800, 1000, 'top'),
      ],
    },
    cargoOlive: {
      primary: unsplash('photo-1624378439575-d8705ad7ae80', 600, 750),
      hover: unsplash('photo-1594938298603-c8148c4dae35', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1624378439575-d8705ad7ae80', 800, 1000),
        unsplash('photo-1594938298603-c8148c4dae35', 800, 1000, 'top'),
        unsplash('photo-1541099649105-f69ad21f3246', 800, 1000, 'top'),
      ],
    },
    voltHoodie: {
      primary: unsplash('photo-1556821840-3a63f95609a7', 600, 750, 'top'),
      hover: unsplash('photo-1578587018453-ba907957088c', 600, 750),
      gallery: [
        unsplash('photo-1556821840-3a63f95609a7', 800, 1000, 'top'),
        unsplash('photo-1578587018453-ba907957088c', 800, 1000),
        unsplash('photo-1503342217507-d2b934854d69', 800, 1000, 'top'),
      ],
    },
    whiteTee: {
      primary: unsplash('photo-1583743814966-8936f5b7be1a', 600, 750),
      hover: unsplash('photo-1576566588028-4147f3842f27', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1583743814966-8936f5b7be1a', 800, 1000),
        unsplash('photo-1576566588028-4147f3842f27', 800, 1000, 'top'),
      ],
    },
    charcoalHoodie: {
      primary: unsplash('photo-1578587018453-ba907957088c', 600, 750),
      hover: unsplash('photo-1556821840-3a63f95609a7', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1578587018453-ba907957088c', 800, 1000),
        unsplash('photo-1556821840-3a63f95609a7', 800, 1000, 'top'),
      ],
    },
    cargoShorts: {
      primary: unsplash('photo-1591195853828-11db59a44f6b', 600, 750, 'top'),
      hover: unsplash('photo-1591047139829-d91aecb6c7ed', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1591195853828-11db59a44f6b', 800, 1000, 'top'),
        unsplash('photo-1591047139829-d91aecb6c7ed', 800, 1000, 'top'),
      ],
    },
    creamSweatshirt: {
      primary: unsplash('photo-1578587018453-ba907957088c', 600, 750),
      hover: unsplash('photo-1529131516924-56934f2a6270', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1578587018453-ba907957088c', 800, 1000),
        unsplash('photo-1529131516924-56934f2a6270', 800, 1000, 'top'),
      ],
    },
    redTee: {
      primary: unsplash('photo-1618354691373-c851696219c8', 600, 750),
      hover: unsplash('photo-1503342217507-d2b934854d69', 600, 750, 'top'),
      gallery: [
        unsplash('photo-1618354691373-c851696219c8', 800, 1000),
        unsplash('photo-1503342217507-d2b934854d69', 800, 1000, 'top'),
      ],
    },
  },
} as const;
