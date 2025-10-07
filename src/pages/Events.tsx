import { Calendar, Clock, Users } from 'lucide-react';
import { eventsData } from '../data/eventsData';

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl">
              Join our workshops, competitions, and networking events to level up your skills
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-6xl">{event.icon}</span>
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-3">
                    {event.type}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{event.registrations} Registered</span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
