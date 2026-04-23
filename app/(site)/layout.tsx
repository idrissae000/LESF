import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
