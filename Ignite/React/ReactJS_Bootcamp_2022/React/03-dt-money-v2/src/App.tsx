import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/TransactionContext'
import { Transactions } from './pages/Transactions/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
