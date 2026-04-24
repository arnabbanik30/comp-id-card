import clsx from 'clsx';
import { useAutoShrink } from '#/hooks/use-auto-shrink';

type props = {
  name: string;
  wcaId?: string | null;
  registrantId: number;
};
export function CompetitorInfo({ name, wcaId, registrantId }: props) {
  const { containerRef, textRef, fontSize } = useAutoShrink<
    HTMLDivElement,
    HTMLHeadingElement
  >(name, 24, 14);
  return (
    <div
      ref={containerRef}
      className="px-4 py-3 max-h-[113px] overflow-hidden flex justify-between items-center "
    >
      <div className="w-[300px]">
        <p className="text-[11px] font-bold text-cyan-800 uppercase">
          Participant
        </p>
        <h2
          ref={textRef}
          className="flex font-black text-zinc-900 leading-none break-word"
          style={{ fontSize }}
        >
          {name}
        </h2>
        <p
          className={clsx('text-xs font-mono font-bold mt-1', {
            'text-zinc-500': !!wcaId,
            'text-rose-800': !wcaId,
          })}
        >
          {wcaId ?? 'First Timer'}
        </p>
      </div>
      <div className="w-14 h-14 text-cyan-800 flex items-center justify-center text-center overflow-visible">
        <h1
          className={clsx('font-bold break-keep whitespace-nowrap', {
            'text-3xl': registrantId.toString().length < 4,
            'text-2xl': registrantId.toString().length >= 4,
          })}
        >
          {registrantId}
        </h1>
      </div>
    </div>
  );
}
