// components/ClientLayout.tsx
'use client';

import Sidebar from '@/components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-white dark:bg-black text-black dark:text-white">
        {children}
      </main>
    </div>
  );
}
