import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'
import Nav from '../components/nav'

export default function MainLayout({ scrollRef }) {
  return (
    <>
      <Nav />
      <div ref={scrollRef} className='navMargin'></div>
      <div className='mainBody'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
