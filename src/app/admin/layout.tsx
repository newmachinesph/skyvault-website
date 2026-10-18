import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-6">
            <Link href="/">
              <Image src="/logo.svg" alt="SKYVAULT" width={120} height={28} className="h-7 w-auto" />
            </Link>
            <span className="hidden sm:inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-x-4">
            <Link
              href="/admin"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View Site
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
