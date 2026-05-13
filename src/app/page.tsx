import TianaSessionFooter from '@/components/TianaSessionFooter'
import TianaAiPositioningWorkshop from '@/content/tiana-ai-positioning-workshop'

export default function HomePage() {
  return (
    <main className="px-6">
      <TianaAiPositioningWorkshop />
      <div className="mx-auto max-w-5xl px-0 pb-16">
        <TianaSessionFooter />
      </div>
    </main>
  )
}
