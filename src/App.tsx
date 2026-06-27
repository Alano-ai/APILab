import { useEffect } from 'react'
import { MainLayout } from './components/layout/MainLayout'
import { migrateFromV1 } from './lib/migration'

function App() {
  useEffect(() => {
    // 应用启动时执行数据迁移
    migrateFromV1()
  }, [])

  return <MainLayout />
}

export default App