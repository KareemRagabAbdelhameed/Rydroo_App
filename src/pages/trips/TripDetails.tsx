import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useTripsId from "../../hooks/useTripsId";
import Loader from "../../components/ui/Loader";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function TripDetails() {
  const { id } = useParams();
  const { data: trip, isLoading } = useTripsId(id);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  if (isLoading) return <Loader />;
  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  const {
    source,
    destination,
    date,
    day,
    time,
    availableSeats,
    price,
    driverProfile,
    vehicle,
    _id,
  } = trip.data;

  const totalSeats = vehicle?.totalSeats ?? 14;
  // Simulate some booked seats for display (replace with real data if available)
  const bookedSeats: number[] = trip.data.bookedSeats ?? [];

  const toggleSeat = (seat: number) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.length * price;

  // Build seat rows
  const frontSeats = [1, 2].filter((s) => s <= totalSeats);
  const otherSeats = Array.from({ length: Math.max(0, totalSeats - 2) }, (_, i) => i + 3);

  const getSeatStyle = (seat: number) => {
    if (bookedSeats.includes(seat))
      return "bg-slate-300 cursor-not-allowed text-white opacity-60";
    if (selectedSeats.includes(seat))
      return "bg-[#3f2103] text-white border-2 border-[#3f2103] shadow-lg shadow-[#3f2103]/30";
    return "bg-[#3f2103]/10 border-2 border-[#3f2103]/10 text-[#3f2103] hover:border-[#3f2103] transition-all";
  };

  const isRtl = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#3f2103]/10 bg-white px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-[#3f2103] text-2xl">🚌</span>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">تفاصيل الرحلة وحجز المقاعد</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#3f2103]/10 text-[#3f2103] hover:bg-[#3f2103]/20 transition-colors"
        >
          {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Seat Selection */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Stepper */}
            <div className="flex h-12 items-center justify-center rounded-xl bg-[#3f2103]/5 p-1">
              <span className="flex h-full grow items-center justify-center rounded-lg px-4 bg-white shadow-sm text-[#3f2103] text-sm font-bold">المقاعد</span>
              <span className="flex h-full grow items-center justify-center rounded-lg px-4 text-slate-400 text-sm">الدفع</span>
              <span className="flex h-full grow items-center justify-center rounded-lg px-4 text-slate-400 text-sm">التأكيد</span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center py-4 border-b border-[#3f2103]/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#3f2103]/20 border border-[#3f2103]/30" />
                <span className="text-sm font-medium">متاح</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#3f2103] text-white flex items-center justify-center text-xs">✓</div>
                <span className="text-sm font-medium">محدد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-slate-300" />
                <span className="text-sm font-medium">محجوز</span>
              </div>
            </div>

            {/* Microbus Layout */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#3f2103]/5 max-w-sm mx-auto w-full relative">
              {/* Windshield */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-400 rounded-full" />

              <div className="flex flex-col gap-6">
                {/* Driver Row */}
                <div className="grid grid-cols-3 gap-4 border-b border-[#3f2103]/10 pb-6">
                  {frontSeats[1] ? (
                    <button
                      onClick={() => toggleSeat(frontSeats[1])}
                      className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm ${getSeatStyle(frontSeats[1])}`}
                    >
                      {frontSeats[1]}
                    </button>
                  ) : (
                    <div className="invisible" />
                  )}
                  {frontSeats[0] ? (
                    <button
                      onClick={() => toggleSeat(frontSeats[0])}
                      className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm ${getSeatStyle(frontSeats[0])}`}
                    >
                      {frontSeats[0]}
                    </button>
                  ) : (
                    <div className="invisible" />
                  )}
                  <div className="flex flex-col items-center justify-center text-[#3f2103] bg-[#3f2103]/5 rounded-xl aspect-square gap-1">
                    <span className="text-2xl">🏁</span>
                    <span className="text-[10px] font-bold">السائق</span>
                  </div>
                </div>

                {/* Passenger Rows */}
                {(() => {
                  const rows = [];
                  for (let i = 0; i < otherSeats.length; i += 3) {
                    rows.push(otherSeats.slice(i, i + 3));
                  }
                  return rows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-4">
                      {[...row].reverse().map((seat) => (
                        <button
                          key={seat}
                          onClick={() => toggleSeat(seat)}
                          className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm ${getSeatStyle(seat)}`}
                        >
                          {seat}
                        </button>
                      ))}
                      {Array.from({ length: 3 - row.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="invisible" />
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Right: Trip Summary Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#3f2103]/5 flex flex-col gap-6 sticky top-24">
              <h3 className="text-xl font-bold border-b border-[#3f2103]/10 pb-4">ملخص الرحلة</h3>

              {/* Route Details */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#3f2103] ring-4 ring-[#3f2103]/10" />
                    <div className="w-px grow border-l border-dashed border-[#3f2103]/30" />
                    <div className="w-3 h-3 rounded-full border-2 border-[#3f2103]" />
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">نقطة الانطلاق</span>
                      <span className="font-bold">{source}</span>
                      <span className="text-xs text-slate-400">{time}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">نقطة الوصول</span>
                      <span className="font-bold">{destination}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#3f2103]/10" />

              {/* Booking Info */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">التاريخ</span>
                  <span className="font-bold">{day}، {date?.split("T")[0]}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">الأماكن المتاحة</span>
                  <span className="font-bold text-[#3f2103]">{availableSeats} مقعد</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">السائق</span>
                  <span className="font-bold">
                    {driverProfile?.user?.firstName} {driverProfile?.user?.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">المركبة</span>
                  <span className="font-bold">{vehicle?.make} {vehicle?.model}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">لوحة</span>
                  <span className="font-bold">{vehicle?.plateNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">المقاعد المختارة</span>
                  {selectedSeats.length > 0 ? (
                    <div className="flex gap-1 flex-wrap justify-end">
                      {selectedSeats.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[#3f2103] text-white rounded-md font-bold text-xs">{s}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs">لم يتم الاختيار</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-[#3f2103]/10" />

              {/* Price & CTA */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-medium">إجمالي السعر</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-[#3f2103]">
                      {selectedSeats.length > 0 ? `${totalPrice.toFixed(2)} ج.م` : `${price} ج.م`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {selectedSeats.length > 0 ? `${selectedSeats.length} مقعد × ${price} ج.م` : "للمقعد الواحد"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
  navigate(`/payment/${_id}`, {
    state: {
      selectedSeats,
    },
  })
}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-[#3f2103] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#3f2103]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>المتابعة للدفع</span>
                  <span>💳</span>
                </button>

                <p className="text-[10px] text-center text-slate-400 px-4">
                  بالضغط على المتابعة، فإنك توافق على شروط الخدمة وسياسة الإلغاء الخاصة بنا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#3f2103]/10 p-4 shadow-2xl z-50">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">
              {selectedSeats.length > 0 ? `إجمالي (${selectedSeats.length} مقعد)` : "للمقعد الواحد"}
            </span>
            <span className="text-lg font-black text-[#3f2103]">
              {selectedSeats.length > 0 ? `${totalPrice.toFixed(2)} ج.م` : `${price} ج.م`}
            </span>
          </div>
          <button
            onClick={() =>
  navigate(`/payment/${_id}`, {
    state: {
      selectedSeats,
    },
  })
}
                  disabled={selectedSeats.length === 0}
            className="grow bg-[#3f2103] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <span>احجز الآن</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
