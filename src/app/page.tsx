import WaitlistForm from "@/components/WaitlistForm";
import { BellRing, Gem, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="">
            <h1 className="h-20 mb-5 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br  from-cyan-500 to-emerald-200 ">
              Sesuatu yang Besar Akan Datang
            </h1>
            <p className="text-xl md:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
              Jadilah yang pertama tahu saat kami meluncur. Daftarkan email Anda
              di daftar tunggu kami dan dapatkan akses awal.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-sm text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <Gem size={16} className="text-indigo-500" />
                Akses Eksklusif
              </div>
              <div className="flex items-center justify-center gap-2">
                <BellRing size={16} className="text-indigo-500" />
                Notifikasi Prioritas
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-indigo-500" />
                Beta Testing
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <WaitlistForm />

          {/* Footer */}
          <div className="mt-6 text-slate-400 text-sm">
            <p>
              Bergabung dengan lebih dari{" "}
              <span className="text-indigo-400 font-semibold">1,000+</span>{" "}
              orang yang sudah mendaftar
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
