'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, StatsCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Phone, 
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
} from 'lucide-react'

// Mock data - would come from API/database
const stats = [
  { 
    value: '247', 
    label: 'Total Leads', 
    icon: Users,
    change: '+12%',
    changeType: 'positive' as const,
  },
  { 
    value: '43', 
    label: 'Qualified', 
    icon: CheckCircle2,
    change: '+8%',
    changeType: 'positive' as const,
  },
  { 
    value: '$12,450', 
    label: 'Revenue (MTD)', 
    icon: DollarSign,
    change: '+23%',
    changeType: 'positive' as const,
  },
  { 
    value: '18', 
    label: 'Policies Sold', 
    icon: TrendingUp,
    change: '-3%',
    changeType: 'negative' as const,
  },
]

const recentLeads = [
  { id: 1, name: 'John Smith', email: 'john@email.com', product: 'Final Expense', status: 'new', time: '5 min ago' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', product: 'Term Life', status: 'contacted', time: '23 min ago' },
  { id: 3, name: 'Mike Davis', email: 'mike@email.com', product: 'IUL', status: 'qualified', time: '1 hour ago' },
  { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', product: 'Final Expense', status: 'new', time: '2 hours ago' },
  { id: 5, name: 'Tom Wilson', email: 'tom@email.com', product: 'Term Life', status: 'quoted', time: '3 hours ago' },
]

const pendingTasks = [
  { id: 1, task: 'Follow up with John Smith', priority: 'high', dueIn: '30 min' },
  { id: 2, task: 'Send quote to Sarah Johnson', priority: 'medium', dueIn: '2 hours' },
  { id: 3, task: 'Review Mike Davis application', priority: 'high', dueIn: 'Today' },
  { id: 4, task: 'Call back Lisa Anderson', priority: 'low', dueIn: 'Tomorrow' },
]

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  quoted: 'bg-purple-100 text-purple-800',
  sold: 'bg-brand-gold text-brand-navy',
  lost: 'bg-gray-100 text-gray-800',
}

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-navy">
            Welcome back, Ray! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your leads today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/leads/import">
            <Button variant="outline">
              Import Leads
            </Button>
          </Link>
          <Link href="/admin/leads/new">
            <Button variant="secondary">
              Add Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-brand-navy mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card padding="none">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-heading font-semibold text-brand-navy">
                Recent Leads
              </h2>
              <Link href="/admin/leads" className="text-sm text-brand-gold hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-brand-navy font-semibold text-sm">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-brand-navy truncate">{lead.name}</p>
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-brand-navy">{lead.product}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {lead.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card padding="none">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-heading font-semibold text-brand-navy">
                Pending Tasks
              </h2>
              <Badge variant="secondary">{pendingTasks.length}</Badge>
            </div>
            <div className="divide-y">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <div className={`mt-0.5 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-navy">{task.task}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due: {task.dueIn}
                    </p>
                  </div>
                  <button className="text-brand-gold hover:text-brand-gold-dark">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full" size="sm">
                View All Tasks
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card padding="lg" className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-heading font-semibold mb-2">
                Ready to make some calls?
              </h2>
              <p className="text-white/80">
                You have 12 new leads waiting to be contacted. Start your calling session now.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Start Calling
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                <Mail className="w-4 h-4 mr-2" />
                Send Emails
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
