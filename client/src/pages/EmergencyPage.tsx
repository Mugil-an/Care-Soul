import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Loader } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { emergencyService } from '../services/emergencyService';

const EmergencyPage = () => {
    // Track what's happening
    const [status, setStatus] = useState<'idle' | 'locating' | 'sending' | 'sent'>('idle');
    const [location, setLocation] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Get user's GPS location
    const getLocation = (): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            // Browser asks user for permission, then gives coordinates
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const handleEmergency = async () => {
        try {
            setStatus('locating');
            setError('');

            let lat = null, lng = null, locationStr = 'Location not available';

            // Try to get GPS coordinates
            try {
                const position = await getLocation();
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                locationStr = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                setCoords({ lat, lng });
                setLocation(locationStr);
            } catch {
                // GPS failed — that's okay, we still send the alert
                locationStr = 'Location not available';
                setLocation(locationStr);
            }

            setStatus('sending');

            // Send emergency to backend
            const response = await emergencyService.raiseAlert({
                location: locationStr,
                latitude: lat,
                longitude: lng,
                description: description || 'Emergency assistance needed'
            });

            if (response.success) {
                setStatus('sent');
            }
        } catch (err: any) {
            setError('Failed to send alert. Please call 102 directly.');
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-red-50">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-red-700">Emergency Services</h1>
                    <p className="text-gray-600 mt-2">Get immediate medical assistance</p>
                </div>

                {/* Emergency contacts — always visible */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <a href="tel:102" className="bg-red-600 text-white rounded-lg p-4 text-center hover:bg-red-700 transition">
                        <Phone className="h-6 w-6 mx-auto mb-2" />
                        <p className="font-bold text-lg">102</p>
                        <p className="text-sm opacity-90">Ambulance</p>
                    </a>
                    <a href="tel:100" className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition">
                        <Phone className="h-6 w-6 mx-auto mb-2" />
                        <p className="font-bold text-lg">100</p>
                        <p className="text-sm opacity-90">Police</p>
                    </a>
                </div>

                {/* Alert sent confirmation */}
                {status === 'sent' ? (
                    <div className="bg-green-100 border border-green-400 rounded-lg p-6 text-center">
                        <div className="text-4xl mb-3">✅</div>
                        <h2 className="text-xl font-bold text-green-800">Alert Sent!</h2>
                        <p className="text-green-700 mt-2">
                            Your emergency has been reported. Help is on the way.
                        </p>
                        {coords && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{location}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Send Another Alert
                        </button>
                    </div>
                ) : (
                    /* Emergency Form */
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Send Emergency Alert
                        </h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        {/* Optional description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Describe your emergency (optional)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="e.g., Chest pain, difficulty breathing..."
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* Location status */}
                        {location && (
                            <div className="flex items-center gap-2 text-gray-600 mb-4 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>{location}</span>
                            </div>
                        )}

                        {/* Big red emergency button */}
                        <button
                            onClick={handleEmergency}
                            disabled={status !== 'idle'}
                            className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
                        >
                            {status === 'locating' && (
                                <><Loader className="h-5 w-5 animate-spin" /> Getting your location...</>
                            )}
                            {status === 'sending' && (
                                <><Loader className="h-5 w-5 animate-spin" /> Sending alert...</>
                            )}
                            {status === 'idle' && (
                                <><AlertTriangle className="h-5 w-5" /> Send Emergency Alert</>
                            )}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-3">
                            This will immediately alert our emergency response team
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmergencyPage;