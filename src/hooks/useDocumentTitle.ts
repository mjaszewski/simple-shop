import { useRef, useEffect } from 'react'

const useDocumentTitle = (title: string) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => () => {
      document.title = defaultTitle.current
  })
}

export default useDocumentTitle
