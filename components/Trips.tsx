'use client'

import React, { useState, useEffect } from 'react'
import { Star, MapPin, Clock, Zap, Percent, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import BookingModal from './BookingModal'
import VideoModal from './VideoModal'

type HotelEntry = {
  _id: string;
  name: string;
  description: string;
  city: string;
  location: string;
  image: string;
  video?: string;
};

type SeaTripEntry = {
  _id: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  start_time: string;
  end_time: string;
  transportation: string;
  total_price: string;
  image: string;
  video?: string;
};

type SafariTripEntry = {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  start_time: string;
  end_time: string;
  transportation: string;
  video?: string;
  total_price: string;
};

type TripItem = {
  id: string;
  type: 'hotel' | 'seaTrip' | 'safariTrip';
  name: string;
  description: string;
  image: string;
  video?: string;
  location?: string;
  city?: string;
  duration?: string;
  price?: string;
  total_price?: string;
  discount?: string;
  start_time?: string;
  end_time?: string;
  transportation?: string;
  rating?: number;
  reviews?: number;
};

const Trips = () => {
  const [trips, setTrips] = useState<TripItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const filterButtons = [
    { label: "All", value: "all", active: true },
    { label: "Hotels", value: "hotels", active: false },
    { label: "Sea Trips", value: "seaTrips", active: false },
    { label: "Safari", value: "safari", active: false },
  ];

  // Fetch all data from APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting to fetch data from APIs...');

      const [hotelsRes, seaTripsRes, safariTripsRes] = await Promise.all([
        fetch('https://darkgray-termite-166434.hostingersite.com/api/hotels/public'),
        fetch('https://darkgray-termite-166434.hostingersite.com/api/seatrips/public'),
        fetch('https://darkgray-termite-166434.hostingersite.com/api/public/safaris')
      ]);

      console.log('API Responses Status:', {
        hotels: hotelsRes.status,
        seaTrips: seaTripsRes.status,
        safariTrips: safariTripsRes.status
      });

      const hotelsData = await hotelsRes.json();
      const seaTripsData = await seaTripsRes.json();
      const safariTripsData = await safariTripsRes.json();

      console.log('Hotels API Response:', hotelsData);
      console.log('Sea Trips API Response:', seaTripsData);
      console.log('Safari Trips API Response:', safariTripsData);

      // Only check HTTP status, not .success
      if (!hotelsRes.ok || !seaTripsRes.ok || !safariTripsRes.ok) {
        const errors = [];
        if (!hotelsRes.ok) errors.push(`Hotels API: ${hotelsRes.status} ${hotelsRes.statusText}`);
        if (!seaTripsRes.ok) errors.push(`Sea Trips API: ${seaTripsRes.status} ${seaTripsRes.statusText}`);
        if (!safariTripsRes.ok) errors.push(`Safari Trips API: ${safariTripsRes.status} ${safariTripsRes.statusText}`);
        throw new Error(`API Errors: ${errors.join(', ')}`);
      }

      // Transform hotels data (plain array)
      const hotelItems: TripItem[] = (Array.isArray(hotelsData) ? hotelsData : []).map((hotel: HotelEntry) => ({
        id: hotel._id,
        type: 'hotel',
        name: hotel.name,
        description: hotel.description,
        image: hotel.image,
        video: hotel.video,
        city: hotel.city,
        location: hotel.location,
        rating: 4.5,
        reviews: Math.floor(Math.random() * 200) + 50,
      }));

      // Transform sea trips data ({ seatrips: [...] })
      const seaTripItems: TripItem[] = (seaTripsData.seatrips || []).map((trip: SeaTripEntry) => ({
        id: trip._id,
        type: 'seaTrip',
        name: trip.name,
        description: trip.description,
        image: trip.image,
        video: trip.video,
        price: trip.price,
        total_price: trip.total_price,
        discount: trip.discount,
        start_time: trip.start_time,
        end_time: trip.end_time,
        transportation: trip.transportation,
        duration: `${trip.start_time} - ${trip.end_time}`,
        rating: 4.8,
        reviews: Math.floor(Math.random() * 200) + 50,
      }));

      // Transform safari trips data ({ safaris: [...] })
      const safariTripItems: TripItem[] = (safariTripsData.safaris || []).map((trip: SafariTripEntry) => ({
        id: trip._id,
        type: 'safariTrip',
        name: trip.name,
        description: trip.description,
        image: trip.image,
        video: trip.video,
        price: trip.price,
        total_price: trip.total_price,
        start_time: trip.start_time,
        end_time: trip.end_time,
        transportation: trip.transportation,
        duration: `${trip.start_time} - ${trip.end_time}`,
        rating: 4.7,
        reviews: Math.floor(Math.random() * 200) + 50,
      }));

      console.log('Transformed Data:', {
        hotels: hotelItems.length,
        seaTrips: seaTripItems.length,
        safariTrips: safariTripItems.length
      });

      const allTrips = [...hotelItems, ...seaTripItems, ...safariTripItems];
      setTrips(allTrips);

      console.log('Total trips loaded:', allTrips.length);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setError(`Failed to load trips: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter trips based on active filter
  const filteredTrips = trips.filter(trip => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hotels') return trip.type === 'hotel';
    if (activeFilter === 'seaTrips') return trip.type === 'seaTrip';
    if (activeFilter === 'safari') return trip.type === 'safariTrip';
    return true;
  });

  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
  };

  const handleBookNow = (trip: TripItem) => {
    setSelectedTrip(trip);
    setIsBookingModalOpen(true);
  };

  const handleWatchVideo = (trip: TripItem) => {
    if (trip.video) {
      setSelectedVideo({ url: trip.video, title: trip.name });
      setIsVideoModalOpen(true);
    }
  };

  const handleBookingSuccess = (bookingData: any) => {
    // Additional logic can be added here if needed
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing trips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchData} className="bg-orange-500 hover:bg-orange-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="trips" className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-blue-500 font-medium mb-2">Popular Tour</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Amazing Tour Places</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterButtons.map((button, index) => (
            <Button
              key={index}
              variant={activeFilter === button.value ? "default" : "outline"}
              className={`${activeFilter === button.value
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                } px-6 py-2 rounded-full font-medium`}
              onClick={() => handleFilterChange(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tour Cards Grid */}
      {filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No trips found for the selected category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          {filteredTrips.map((trip, i) => {

            console.log(trip.image)
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden">
                  <Image
                    src={trip.image}
                    // src="https://placehold.co/600x400.png"
                    alt={trip.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="w-full h-full object-cover" />
                  <Badge className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${trip.type === 'hotel' ? 'bg-blue-500' :
                    trip.type === 'seaTrip' ? 'bg-green-500' : 'bg-orange-500'
                    } text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium`}>
                    {trip.type === 'hotel' ? 'Hotel' :
                      trip.type === 'seaTrip' ? 'Sea Trip' : 'Safari Trip'}
                  </Badge>
                  {trip.discount && (
                    <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                      {trip.discount}
                    </Badge>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 sm:mb-3 line-clamp-2">{trip.name}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">{trip.description}</p>

                  {/* Location and Duration */}
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                    {trip.location && (
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                        <Link className='text-blue-600 truncate' href={trip.location}>location</Link>
                      </div>
                    )}
                    {trip.city && (
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                        <span className="truncate">{trip.city}</span>
                      </div>
                    )}
                    {trip.duration && (
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                        <span className="truncate">{trip.duration}</span>
                      </div>
                    )}
                    {trip.transportation && (
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                        <span className="truncate">transportation includes</span>
                      </div>
                    )}
                  </div>

                  {/* Price and Buttons */}
                  <div className="flex flex-col min-[890px]:flex-row min-[890px]:items-end min-[890px]:justify-between gap-3 min-[890px]:gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600">
                        {trip.total_price || trip.price || 'Contact'}
                      </span>
                      {trip.price && trip.total_price && (parseInt(trip.price) + parseInt(trip.transportation || "0")) !== parseInt(trip.total_price || "0") && (
                        <span
                          className="text-gray-400 line-through text-xs sm:text-sm">{String(parseInt(trip.price) + parseInt(trip.transportation || "0"))}</span>
                      )}
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {trip.type === 'hotel' ? '/ Night' : '/ Person'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {trip.video && (
                        <Button
                          onClick={() => handleWatchVideo(trip)}
                          variant="outline"
                          className="border-blue-500 text-blue-500 hover:bg-blue-50 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Watch Video</span>
                          <span className="sm:hidden">Video</span>
                        </Button>
                      )}
                      <Button
                        onClick={() => handleBookNow(trip)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 lg:px-6 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Booking Modal */}
      {selectedTrip && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedTrip(null);
          }}
          trip={{
            id: selectedTrip.id,
            name: selectedTrip.name,
            type: selectedTrip.type,
            price: selectedTrip.price,
            total_price: selectedTrip.total_price
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => {
            setIsVideoModalOpen(false);
            setSelectedVideo(null);
          }}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  )
}

export default Trips





