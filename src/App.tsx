/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: 'Ceiling-mounted dehumidifier',
    usage: 'Residential use',
    size: '',
    height: '',
    falseCeiling: 'N',
    freshAir: 'N',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setStatus('success');
      setFormData({
        name: '',
        contact: '',
        type: 'Ceiling-mounted dehumidifier',
        usage: 'Residential use',
        size: '',
        height: '',
        falseCeiling: 'N',
        freshAir: 'N',
        message: '',
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#4ade80] to-[#20948b] px-6 py-8 sm:p-10 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 40px)'
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
              Dehumidifier Inquiry Form
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90 drop-shadow-sm font-medium">
              Please fill out the form below and we will get back to you shortly.
            </p>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:pt-10 sm:pb-2">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-8">Your inquiry has been successfully submitted. We will contact you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name / Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5"
                      placeholder="Enter your name or company name"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact (Email / Phone) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5"
                      placeholder="How can we reach you?"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type of Dehumidifier Inquire <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5 bg-white"
                    >
                      <option value="Ceiling-mounted dehumidifier">Ceiling-mounted dehumidifier</option>
                      <option value="Portable dehumidifier">Portable dehumidifier</option>
                      <option value="Commercial dehumidifier">Commercial dehumidifier</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="usage" className="block text-sm font-medium text-gray-700">
                    What is your place used for? <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="usage"
                      name="usage"
                      required
                      value={formData.usage}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5 bg-white"
                    >
                      <option value="Residential use">Residential use</option>
                      <option value="Office">Office</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Store room">Store room</option>
                      <option value="Factory">Factory</option>
                      <option value="Other commercial or industrial use">Other commercial or industrial use</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    Size of the place (sqm) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="size"
                      id="size"
                      min="0"
                      step="any"
                      required
                      value={formData.size}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5"
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height of the ceiling (m) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="height"
                      id="height"
                      min="0"
                      step="any"
                      required
                      value={formData.height}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5"
                      placeholder="e.g. 2.8"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    False Ceiling <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        id="falseCeiling-Y"
                        name="falseCeiling"
                        type="radio"
                        value="Y"
                        checked={formData.falseCeiling === 'Y'}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="falseCeiling-Y" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="falseCeiling-N"
                        name="falseCeiling"
                        type="radio"
                        value="N"
                        checked={formData.falseCeiling === 'N'}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="falseCeiling-N" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fresh Air Inflow <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        id="freshAir-Y"
                        name="freshAir"
                        type="radio"
                        value="Y"
                        checked={formData.freshAir === 'Y'}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="freshAir-Y" className="ml-2 block text-sm text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="freshAir-N"
                        name="freshAir"
                        type="radio"
                        value="N"
                        checked={formData.freshAir === 'N'}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="freshAir-N" className="ml-2 block text-sm text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message / Additional Details
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2.5"
                      placeholder="Any specific requirements or questions?"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 pb-6">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#4ade80] to-[#20948b] hover:from-[#4ade80] hover:to-[#1a7a72] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20948b] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="-ml-1 mr-2 h-5 w-5 text-white" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#4ade80] to-[#20948b] py-6 px-6 sm:px-10">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 40px)'
            }}
          ></div>
          <div className="flex justify-end relative z-10">
            <h2 className="text-white text-base sm:text-xl md:text-2xl font-extrabold tracking-wider sm:tracking-widest drop-shadow-sm whitespace-nowrap">
              DBA ELECTRIC PTE. LTD.
            </h2>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

