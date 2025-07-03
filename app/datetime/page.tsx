import SanatanTimeWidget from "@/components/sanatan-time-widget"

export default function DateTimePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sanatan Time & Calendar</h1>
      <p className="mb-4">Explore the current Sanatan time and calendar information.</p>

      <SanatanTimeWidget />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Sanatan Panchang</h2>
        <p>
          Learn about the Sanatan Panchang, a traditional Sanatan calendar system that includes details about tithi,
          nakshatra, yoga, and karana.
        </p>
      </section>
    </div>
  )
}
