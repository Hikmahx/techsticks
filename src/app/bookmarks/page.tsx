import { Suspense } from 'react'
import Bookmarks from './Bookmarks'
 
function BookmarksFallback() {
  return <p>Loading...</p>
}
 
export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<BookmarksFallback />}>
          <Bookmarks />
        </Suspense>
      </nav>
    </>
  )
}