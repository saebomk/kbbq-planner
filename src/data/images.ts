const U = (path: string, w = 160, h = 160) => `${path}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const PROTEIN_IMAGES: Record<string, string> = {
  samgyeopsal: U('https://images.unsplash.com/photo-1708388464065-e418c2a75077', 320, 320),
  moksal: U('https://images.unsplash.com/photo-1708388064894-878781b1db43', 320, 320),
  hangjeongsal: '/images/hangjeongsal.png',
  buchaesal: '/images/buchaesal.png',
  galbi: U('https://images.unsplash.com/photo-1708388465069-1fc76ec68b1d', 320, 320),
  kkotsal: '/images/kkotsal.png',
  'smoked-duck': '/images/smoked-duck.png',
}

export const BANCHAN_IMAGES: Record<string, string> = {
  kongnamul: '/images/kongnamul.png',
  sigeumchi: U('https://images.unsplash.com/photo-1771573042838-8b3adf17562e'),
  'gamja-jorim': '/images/gamja-jorim.png',
  'gyeran-jjim': '/images/gyeran-jjim.png',
  japchae: '/images/japchae.png',
  eomuk: '/images/eomuk.png',
}

export const DRINK_IMAGES: Record<string, string> = {
  makgeoli: U('https://images.unsplash.com/photo-1652893825955-0a370b3e90a1'),
  soju: U('https://images.unsplash.com/photo-1752555559453-5dcd151b0efb'),
  beer: U('https://images.unsplash.com/photo-1646092555203-81d28b44e061'),
  softdrink: U('https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9'),
}

export const DESSERT_IMAGES: Record<string, string> = {
  naengmyeon: U('https://images.unsplash.com/photo-1616627052149-22c4f8a6316e'),
  'kimchi-jjigae': U('https://plus.unsplash.com/premium_photo-1669687759596-8d6d8836f480'),
  surprise: U('https://images.unsplash.com/photo-1564836235910-c3055ca0f912'),
}
