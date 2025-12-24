'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Download, 
  Upload,
  MoreHorizontal,
  Phone,
  Mail,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Mock data
const leads = [
  { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@email.com', phone: '(555) 123-4567', product: 'Final Expense', coverage: '$25,000', status: 'new', source: 'Website', created: '2024-01-15' },
  { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', phone: '(555) 234-5678', product: 'Term Life', coverage: '$500,000', status: 'contacted', source: 'Facebook', created: '2024-01-14' },
  { id: 3, firstName: 'Mike', lastName: 'Davis', email: 'mike@email.com', phone: '(555) 345-6789', product: 'IUL', coverage: '$250,000', status: 'qualified', source: 'Google', created: '2024-01-14' },
  { id: 4, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@email.com', phone: '(555) 456-7890', product: 'Final Expense', coverage: '$15,000', status: 'quoted', source: 'Referral', created: '2024-01-13' },
  { id: 5, firstName: 'Tom', lastName: 'Wilson', email: 'tom@email.com', phone: '(555) 567-8901', product: 'Term Life', coverage: '$1,000,000', status: 'sold', source: 'Website', created: '2024-01-12' },
  { id: 6, firstName: 'Emily', lastName: 'Brown', email: 'emily@email.com', phone: '(555) 678-9012', product: 'ROP Term', coverage: '$250,000', status: 'new', source: 'Direct Mail', created: '2024-01-12' },
  { id: 7, firstName: 'David', lastName: 'Taylor', email: 'david@email.com', phone: '(555) 789-0123', product: 'Final Expense', coverage: '$35,000', status: 'contacted', source: 'Website', created: '2024-01-11' },
  { id: 8, firstName: 'Jennifer', lastName: 'Martinez', email: 'jennifer@email.com', phone: '(555) 890-1234', product: 'IUL', coverage: '$500,000', status: 'lost', source: 'Facebook', created: '2024-01-10' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'sold', label: 'Sold' },
  { value: 'lost', label: 'Lost' },
]

const productOptions = [
  { value: 'all', label: 'All Products' },
  { value: 'final-expense', label: 'Final Expense' },
  { value: 'term-life', label: 'Term Life' },
  { value: 'iul', label: 'IUL' },
  { value: 'rop-term', label: 'ROP Term' },
]

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  quoted: 'bg-purple-100 text-purple-800',
  sold: 'bg-brand-gold/20 text-brand-navy',
  lost: 'bg-gray-100 text-gray-600',
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [productFilter, setProductFilter] = useState('all')
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map(l => l.id))
    }
  }

  const toggleSelect = (id: number) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(l => l !== id))
    } else {
      setSelectedLeads([...selectedLeads, id])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-navy">
            Leads
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your incoming leads.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import PDF
          </Button>
          <Button variant="secondary">
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search leads by name, email, phone..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <SelectField
              options={statusOptions}
              value={statusFilter}
              onValueChange={setStatusFilter}
            />
            <SelectField
              options={productOptions}
              value={productFilter}
              onValueChange={setProductFilter}
            />
            <Button variant="outline" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card padding="sm" className="bg-brand-navy text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Leads Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Coverage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Source</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-navy">Created</th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedLeads.includes(lead.id) ? 'bg-brand-gold/5' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-navy/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-brand-navy font-medium text-xs">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-brand-navy">{lead.firstName} {lead.lastName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="text-brand-navy">{lead.email}</p>
                      <p className="text-muted-foreground">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-brand-navy">{lead.product}</td>
                  <td className="px-4 py-3 text-sm font-medium text-brand-navy">{lead.coverage}</td>
                  <td className="px-4 py-3">
                    <Badge className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.created).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-brand-gold rounded">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-brand-gold rounded">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-brand-gold rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-brand-navy rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1-8</span> of <span className="font-medium">247</span> leads
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
