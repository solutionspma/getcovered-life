'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Palette,
  BookOpen,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  Search,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Design', href: '/admin/design', icon: Palette },
  { name: 'Book Orders', href: '/admin/orders', icon: BookOpen },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Voice AI', href: '/admin/voice', icon: Phone },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy transform transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
                <span className="text-brand-navy font-bold text-sm">GC</span>
              </div>
              <span className="text-white font-heading font-semibold">Admin</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group',
                    isActive 
                      ? 'bg-brand-gold text-brand-navy' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-brand-navy' : 'text-white/50 group-hover:text-white'
                  )} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-navy font-semibold">RH</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">Ray Hall</p>
                <p className="text-white/50 text-xs truncate">Admin</p>
              </div>
              <button className="text-white/50 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search leads, pages..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link 
                href="/" 
                target="_blank"
                className="text-sm text-gray-500 hover:text-brand-navy"
              >
                View Site →
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
