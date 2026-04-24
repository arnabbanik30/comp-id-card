import { useSelector } from '@tanstack/react-store';
import { competitionsStore } from '#/stores/competitions';

export function Footer() {
  const blobUrl = useSelector(
    competitionsStore,
    (state) => state.wcaLiveQRCodeUrlBlob,
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r p-3 flex justify-between items-center text-white">
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 bg-white p-0.5">
          <img
            src={blobUrl ?? ''}
            className="w-full h-full grayscale"
          />
        </div>
        <div>
          <p className="text-[11px] font-bold text-cyan-400 uppercase">
            scan for live results
          </p>
          <p className="text-[11px] font-bold font-mono uppercase opacity-80">
            or visit wca.live
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[7px] opacity-60 italic">
          Please wear badge
          <br />
          at all times.
        </p>
      </div>
    </div>
  );
}
