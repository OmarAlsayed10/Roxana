import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AboutPage } from '../../features/about'
import { ContactPage } from '../../features/contact'
import { HomePage } from '../../features/home'
import { ProductDetailPage, ProductsPage } from '../../features/products'
import type { SiteControls } from '../../shared/types'
import { siteRoutes } from './constant'

const ScrollReset = () => {
  const { pathname } = useLocation()
  useEffect(() => { scrollTo(0, 0) }, [pathname])
  return null
}

export const SiteRoutes = (siteControls: SiteControls) => (
  <>
    <ScrollReset />
    <Routes>
      <Route path={siteRoutes.home} element={<HomePage {...siteControls} />} />
      <Route path={siteRoutes.products} element={<ProductsPage {...siteControls} />} />
      <Route path={siteRoutes.productDetail} element={<ProductDetailPage {...siteControls} />} />
      <Route path={siteRoutes.about} element={<AboutPage {...siteControls} />} />
      <Route path={siteRoutes.contact} element={<ContactPage {...siteControls} />} />
      <Route path="*" element={<ProductsPage {...siteControls} />} />
    </Routes>
  </>
)
