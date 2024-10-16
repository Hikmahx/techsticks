import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh]'>
      <h2 className='font-quicksand text-2xl lg:text-4xl font-bold mb-8'>Not Found</h2>
      <p className='text-muted-foreground'>Could not find requested resource or page is currently in development</p>
    </div>
  )
}