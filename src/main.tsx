import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const bootStatus = document.getElementById('boot-status')
window.addEventListener('error', (event) => {
  if (bootStatus) bootStatus.innerHTML = '<div style="max-width:560px"><b style="color:#e0c99e">Не удалось запустить сайт</b><p style="color:#eee5dc">' + String(event.message || 'Ошибка загрузки JavaScript') + '</p><small style="color:#a99b92">Обновите страницу. Если ошибка повторится, сообщите этот текст.</small></div>'
})
window.addEventListener('unhandledrejection', (event) => {
  if (bootStatus) bootStatus.innerHTML = '<div style="max-width:560px"><b style="color:#e0c99e">Ошибка приложения</b><p style="color:#eee5dc">' + String(event.reason?.message || event.reason || 'Неизвестная ошибка') + '</p></div>'
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
bootStatus?.remove()
