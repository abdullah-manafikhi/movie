import '../styles/globals.css'
import { TableProvider } from '../components/context/TableContext.js'

function MyApp({ Component, pageProps }) {
  return (
    <TableProvider>
      <Component {...pageProps} />
    </TableProvider>
  )
}

export default MyApp
