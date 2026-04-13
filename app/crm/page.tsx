'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CRMPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [invoicing, setInvoicing] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Customer: ${name}\nAddress: ${address}\nService Date: ${serviceDate}\nInvoicing: ${invoicing}`);
    // TODO: Replace alert with actual submission logic (e.g., API call or database save)
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white">Add Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Customer Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Address</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Service Date</label>
              <Input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Invoicing</label>
              <Input
                value={invoicing}
                onChange={(e) => setInvoicing(e.target.value)}
                placeholder="Enter invoicing details (e.g., amount)"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
