import VoiceComponent from "@/components/VoiceComponent";
import ReservationTable from "@/components/ReservationTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 relative overflow-hidden">
      <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse" />

      <div className="w-full max-w-6xl flex flex-col gap-12">
        <section className="flex flex-col items-center">
          <small className="text-sm text-gray-500">Powered by ElevenLabs</small>
          <h1 className="text-4xl font-bold mb-6">Realtime Voice Agent</h1>
          <VoiceComponent />
          <small className="text-xs text-gray-500 my-6">
            The app requires microphone access to work.
          </small>
        </section>

        <section className="w-full">
          <ReservationTable />
        </section>
      </div>
    </main>
  );
}
