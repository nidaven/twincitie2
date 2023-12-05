import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Twincitie</h1>
      <p>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </p>
    </main>
  )
}
