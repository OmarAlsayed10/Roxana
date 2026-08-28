export const siteRoutes = {
  home: '/',
  products: '/products',
  productDetail: '/products/:slug',
  about: '/about',
  contact: '/contact'
}

export const productPath = (slug: string) => `/products/${slug}`

export const navigationLinks = [
  { to: siteRoutes.products, label: { en: 'Products', ar: 'المنتجات' } },
  { to: siteRoutes.about, label: { en: 'About', ar: 'عن روكسانا' } },
  { to: siteRoutes.contact, label: { en: 'Contact', ar: 'تواصل' } }
]
