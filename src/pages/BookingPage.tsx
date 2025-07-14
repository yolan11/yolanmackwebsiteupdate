import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWeekend, parseISO } from 'date-fns';
import { Calendar, Clock, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';


interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  location: string;
  message: string;
}


const BookingPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // État pour les dates réservées récupérées de Supabase
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  
  useEffect(() => {
    fetchBookedDates();
  }, []);
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    location: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fonction pour récupérer les dates réservées depuis Supabase
const fetchBookedDates = async () => {
  const { data, error } = await supabase.from('bookings').select('selected_date');
  if (error) {
    console.error('Erreur de récupération des dates réservées :', error.message);
  } else if (data) {
    const dateStrings = data.map((booking) => booking.selected_date);
    setBookedDates(dateStrings);
  }
};

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    // Only allow selecting weekend dates that aren't booked
    const formattedDate = format(day, 'yyyy-MM-dd');
    const isBooked = bookedDates.includes(formattedDate);
    
    if (isWeekend(day) && !isBooked) {
      setSelectedDate(day);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof BookingFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<BookingFormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.eventType) errors.eventType = 'Event type is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    if (!selectedDate) {
      alert('Please select a date from the calendar');
      return;
    }
    
    setIsSubmitting(true);
    
    // Insertion dans supabase
    const { error } = await supabase.from('bookings').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      location: formData.location,
      message: formData.message,
      selected_date: format(selectedDate, 'yyyy-MM-dd')
    });

    setIsSubmitting(false);

    if(error) {
      console.error('Erreur lors de l\'insertion:', error.message);
    }else{
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        location: '',
        message: ''
      });
      setSelectedDate(null);
      fetchBookedDates();
    }

  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2">
          &lt;
        </button>
        <h2 className="text-xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2">
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentMonth);


    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium py-2">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);


    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isBooked = bookedDates.includes(formattedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isWeekendDay = isWeekend(day);
        
        days.push(
          <div
            key={day.toString()}
            className={`relative p-2 h-16 border border-gray-200 ${
              !isCurrentMonth ? 'bg-gray-100 text-gray-400' : ''
            } ${isSelected ? 'bg-black text-white' : ''} ${
              isBooked ? 'bg-red-100' : ''
            } ${
              isWeekendDay && !isBooked ? 'cursor-pointer hover:bg-gray-200' : 'cursor-not-allowed'
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className={isBooked ? 'text-red-500' : ''}>
              {format(day, 'd')}
            </span>
            {isBooked && (
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            {isWeekendDay && !isBooked && (
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div className="bg-black text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Me For Your Event</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Check my availability and send a booking request for your upcoming event.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="mr-2" />
                Check Availability
              </h2>
              <p className="mb-4 text-gray-600">
                Select a weekend date (highlighted in green) to book. Red dates are already booked.
                <br />
                <span className="font-medium">Note: Only weekend dates are available for booking.</span>
              </p>
              
              <div className="calendar">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
              </div>
              
              {selectedDate && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="font-bold">Selected Date:</p>
                  <p>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Booking Form */}
          <div>
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Booking Request Sent!</h3>
                <p className="mb-4">
                  Thank you for your booking request. I'll get back to you within 24 hours to confirm details.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your email address"
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your phone number"
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="eventType" className="block text-gray-700 mb-2">Event Type *</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${formErrors.eventType ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="festival">Festival</option>
                      <option value="club">Club Night</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.eventType && <p className="text-red-500 text-sm mt-1">{formErrors.eventType}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 mb-2">Event Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 border rounded-lg ${formErrors.location ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="City, Country"
                      />
                    </div>
                    {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Tell me more about your event, expected guests, music preferences, etc."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedDate}
                    className={`w-full bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center ${
                      isSubmitting || !selectedDate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                    } transition duration-300`}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Booking Request
                      </>
                    )}
                  </button>
                  
                  {!selectedDate && (
                    <p className="text-amber-600 text-sm mt-2 text-center">
                      Please select an available date from the calendar
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;