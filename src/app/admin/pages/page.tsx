'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Globe,
  Clock,
  FileText,
  Copy,
  ExternalLink,
} from 'lucide-react'

// Mock data for pages
const pages = [
  { id: 1, title: 'Home', slug: '/', status: 'published', lastModified: '2024-01-15', views: 1250 },
  { id: 2, title: 'About Us', slug: '/about', status: 'published', lastModified: '2024-01-14', views: 430 },
  { id: 3, title: 'Final Expense', slug: '/products/final-expense', status: 'published', lastModified: '2024-01-13', views: 890 },
  { id: 4, title: 'Term Life', slug: '/products/term-life', status: 'published', lastModified: '2024-01-12', views: 670 },
  { id: 5, title: 'IUL', slug: '/products/iul', status: 'draft', lastModified: '2024-01-11', views: 0 },
  { id: 6, title: 'Contact', slug: '/contact', status: 'published', lastModified: '2024-01-10', views: 320 },
  { id: 7, title: 'Careers', slug: '/careers', status: 'draft', lastModified: '2024-01-09', views: 0 },
  { id: 8, title: 'Get a Quote', slug: '/quote', status: 'published', lastModified: '2024-01-08', views: 2100 },
]

export default function PagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || page.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-navy">
            Pages
          </h1>
          <p className="text-muted-foreground">
            Manage your website pages and content.
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search pages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card padding="none" hover className="overflow-hidden">
              {/* Preview Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-brand-navy/5 to-brand-gold/5 flex items-center justify-center border-b">
                <FileText className="w-12 h-12 text-gray-300" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-brand-navy">{page.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {page.slug}
                    </p>
                  </div>
                  <Badge variant={page.status === 'published' ? 'default' : 'outline'}>
                    {page.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(page.lastModified).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {page.views.toLocaleString()} views
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/pages/${page.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={page.slug} target="_blank">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* New Page Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: filteredPages.length * 0.05 }}
        >
          <Link href="/admin/pages/new">
            <Card padding="none" hover className="overflow-hidden h-full min-h-[240px] border-2 border-dashed border-gray-200 hover:border-brand-gold transition-colors">
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-brand-navy mb-1">Create New Page</h3>
                <p className="text-sm text-muted-foreground">
                  Add a new page to your website
                </p>
              </div>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
