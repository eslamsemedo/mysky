'use client'

import React, { useState } from 'react';
import { X, User, Globe, Phone, Calendar, Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FlightBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (bookingData: any) => void;
}

const FlightBookingModal: React.FC<FlightBookingModalProps> = ({ 
  isOpen, 
  onClose, 
  onBookingSuccess 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    phoneNumber: '',
    departureCity: '',
    destinationCity: '',
    travelDate: '',
    passengers: '1'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          nationality: formData.nationality,
          phoneNumber: formData.phoneNumber,
          tripId: "flight-booking",
          tripType: "safariTrip", // Using safariTrip as the closest match for flight bookings
          tripName: "International Flight Booking",
          tripPrice: "Contact for pricing",
          flightDetails: {
            departureCity: formData.departureCity,
            destinationCity: formData.destinationCity,
            travelDate: formData.travelDate,
            passengers: formData.passengers
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        onBookingSuccess?.(data.data);
        
        // Redirect to WhatsApp with flight booking details
        const message = `Hello! I would like to book an international flight:

Flight Details:
From: ${formData.departureCity}
To: ${formData.destinationCity}
Date: ${formData.travelDate}
Passengers: ${formData.passengers}

My details:
Name: ${formData.name}
Nationality: ${formData.nationality}
Phone: ${formData.phoneNumber}

Please contact me for pricing and availability.`;

        const whatsappUrl = `https://wa.me/+201101515111?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        setFormData({
          name: '',
          nationality: '',
          phoneNumber: '',
          departureCity: '',
          destinationCity: '',
          travelDate: '',
          passengers: '1'
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError(data.message || 'Failed to create booking');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        nationality: '',
        phoneNumber: '',
        departureCity: '',
        destinationCity: '',
        travelDate: '',
        passengers: '1'
      });
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Book Your Flight</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Flight Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-gray-600 uppercase">
              International Flight
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">International Flight Booking</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Plane size={16} />
            <span className="font-medium">Contact for pricing</span>
          </div>
        </div>

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nationality *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter your nationality"
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Departure City *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleInputChange}
                  placeholder="e.g., Cairo, Egypt"
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Destination City *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  name="destinationCity"
                  value={formData.destinationCity}
                  onChange={handleInputChange}
                  placeholder="e.g., Paris, France"
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Travel Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                  disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of Passengers *
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                <option value="6">6+ Passengers</option>
              </select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  'Book Flight'
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flight Booking Submitted!</h3>
            <p className="text-gray-600 mb-4">Your flight booking request has been submitted and WhatsApp will open automatically.</p>
            <p className="text-sm text-gray-500">If WhatsApp doesn't open, please contact us directly for flight pricing and availability.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightBookingModal; 