import WcaLogo from '#/assets/WCA Logo.svg';

type HeaderProps = {
  name: string;
  date: string;
  venue: string;
};
export function Header({ name, date, venue }: HeaderProps) {
  return (
    <div className="bg-gradient-to-tr from-gray-700 via-gray-800 to-black p-4 text-white">
      <div className="flex justify-between pt-4 items-center">
        <div>
          <h1 className="text-xl font-black leading-none tracking-tighter uppercase">
            {name}
          </h1>
          <p className="text-[12px] font-bold opacity-80 mt-1">
            {date} • {venue}
          </p>
        </div>
        <img
          src={WcaLogo}
          className="w-14 h-14 ml-1 flex item-center"
        />
      </div>
    </div>
  );
}
