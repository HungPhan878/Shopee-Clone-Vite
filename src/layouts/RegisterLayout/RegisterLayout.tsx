
// components
import Footer from 'src/Components/Footer'
import RegisterHeader from 'src/Components/RegisterHeader'

interface Props {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader></RegisterHeader>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
