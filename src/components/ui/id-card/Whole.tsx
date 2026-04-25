import type React from 'react';

type props = {
  children: React.ReactNode;
};
export function Whole({ children }: props) {
  return (
    <div className="w-[102mm] h-[145mm] bg-white crosshatch-art-light-bg shadow-2xl border border-gray-400 flex flex-col overflow-hidden relative font-sans ">
      {children}
    </div>
  );
}
