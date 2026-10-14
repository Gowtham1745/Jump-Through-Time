import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Clock3,
  Compass,
  Heart,
  MapPin,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type City = {
  id: string
  city: string
  country: string
  continent: string
  zone: string
  lat: number
  lng: number
  fact: string
  image: string
}

type Landmark = {
  name: string
  country: string
  zone: string
  description: string
  fact: string
  image: string
}

const cities: City[] = [
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', continent: 'Asia', zone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, fact: 'Tokyo is one of the few cities that spans both the past and future in a single skyline.', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80' },
  { id: 'seoul', city: 'Seoul', country: 'South Korea', continent: 'Asia', zone: 'Asia/Seoul', lat: 37.5665, lng: 126.978, fact: 'Seoul blends high-speed digital life with centuries-old cultural heritage.', image: 'https://images.unsplash.com/photo-1538485399081-6451ff9e88f2?auto=format&fit=crop&w=900&q=80' },
  { id: 'dubai', city: 'Dubai', country: 'United Arab Emirates', continent: 'Asia', zone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, fact: 'Dubai sits on the edge of the Arabian Desert and the Persian Gulf.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80' },
  { id: 'mumbai', city: 'Mumbai', country: 'India', continent: 'Asia', zone: 'Asia/Kolkata', lat: 19.076, lng: 72.8777, fact: 'Mumbai is a dense coastal metropolis where millions move by sea, rail, and road each day.', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80' },
  { id: 'london', city: 'London', country: 'United Kingdom', continent: 'Europe', zone: 'Europe/London', lat: 51.5072, lng: -0.1276, fact: 'London is straddled by the Greenwich meridian, the historic reference for world time.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80' },
  { id: 'paris', city: 'Paris', country: 'France', continent: 'Europe', zone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, fact: 'Paris has a long-standing relationship with timekeeping and public culture.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80' },
  { id: 'rome', city: 'Rome', country: 'Italy', continent: 'Europe', zone: 'Europe/Rome', lat: 41.9028, lng: 12.4964, fact: 'Rome is layered with history from republic to empire to modern capital.', image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=900&q=80' },
  { id: 'cairo', city: 'Cairo', country: 'Egypt', continent: 'Africa', zone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, fact: 'Cairo sits near the Nile, where cities and civilizations have flourished for millennia.', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=900&q=80' },
  { id: 'nairobi', city: 'Nairobi', country: 'Kenya', continent: 'Africa', zone: 'Africa/Nairobi', lat: -1.2864, lng: 36.8172, fact: 'Nairobi is a gateway between East Africa’s savannahs and global finance.', image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=900&q=80' },
  { id: 'johannesburg', city: 'Johannesburg', country: 'South Africa', continent: 'Africa', zone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, fact: 'Johannesburg is at the heart of South Africa’s economic and cultural rhythm.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80' },
  { id: 'new-york', city: 'New York', country: 'United States', continent: 'North America', zone: 'America/New_York', lat: 40.7128, lng: -74.006, fact: 'New York follows the pulse of the Atlantic and the global financial market.', image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'United States', continent: 'North America', zone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437, fact: 'Los Angeles stretches along a warm coast where time and tide remain closely linked.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80' },
  { id: 'mexico-city', city: 'Mexico City', country: 'Mexico', continent: 'North America', zone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, fact: 'Mexico City is one of the largest and highest-altitude capital cities in the world.', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80' },
  { id: 'sao-paulo', city: 'São Paulo', country: 'Brazil', continent: 'South America', zone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, fact: 'São Paulo is marked by urban energy and dramatic meteorological variety.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80' },
  { id: 'santiago', city: 'Santiago', country: 'Chile', continent: 'South America', zone: 'America/Santiago', lat: -33.4489, lng: -70.6693, fact: 'Santiago sits in a valley between mountains and a dry, high plateau climate.', image: 'https://images.unsplash.com/photo-1529059997568-3d4c1e7f5195?auto=format&fit=crop&w=900&q=80' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', continent: 'Oceania', zone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, fact: 'Sydney’s harbor is famous for its bridges, beaches, and ocean-facing skyline.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80' },
  { id: 'auckland', city: 'Auckland', country: 'New Zealand', continent: 'Oceania', zone: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633, fact: 'Auckland looks out over a harbor of volcanic cones and shimmering bays.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
]

const landmarks: Landmark[] = [
  { name: 'Great Wall of China', country: 'China', zone: 'Asia/Shanghai', description: 'A colossal engineered wonder running across mountain ridges and history.', fact: 'The wall is not a single structure but a network of rebuilt and extended sections.', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80' },
  { name: 'Petra', country: 'Jordan', zone: 'Asia/Amman', description: 'Rose-red cliffs conceal a city carved from stone and sandstone.', fact: 'Petra was a Nabataean trade hub and is now a UNESCO World Heritage site.', image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=900&q=80' },
  { name: 'Machu Picchu', country: 'Peru', zone: 'America/Lima', description: 'A mountain citadel suspended between the Andes and the cloud forest.', fact: 'Its exact purpose remains debated, but its engineering and setting are extraordinary.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80' },
  { name: 'Colosseum', country: 'Italy', zone: 'Europe/Rome', description: 'An iconic amphitheater that still captures the scale of Roman spectacle.', fact: 'The structure could seat around 50,000 spectators in its heyday.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80' },
  { name: 'Taj Mahal', country: 'India', zone: 'Asia/Kolkata', description: 'A marble mausoleum shaped by devotion, geometry, and symmetry.', fact: 'It was commissioned in memory of Mumtaz Mahal and completed in the 17th century.', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80' },
  { name: 'Eiffel Tower', country: 'France', zone: 'Europe/Paris', description: 'A steel symbol of Paris, rising above the Seine and the city skyline.', fact: 'It was once the tallest man-made structure in the world.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80' },
  { name: 'Burj Khalifa', country: 'United Arab Emirates', zone: 'Asia/Dubai', description: 'The world’s tallest building, piercing the desert skyline.', fact: 'Its height is more than 828 meters, with a deliberate vertical sculptural form.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Mount Fuji', country: 'Japan', zone: 'Asia/Tokyo', description: 'An iconic dormant volcano and a symbol of Japan’s landscape identity.', fact: 'It is widely recognized in art, photography, and pilgrimage culture.', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80' },
]

const continents = ['All', 'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'] as const

type ContinentFilter = (typeof continents)[number]

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'World clocks', href: '#clocks' },
  { label: 'Explore the globe', href: '#globe' },
  { label: 'Seven Wonders', href: '#wonders' },
  { label: 'Day & night', href: '#daynight' },
  { label: 'Compare', href: '#compare' },
  { label: 'About', href: '#about' },
]

const formatOffset = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const name = parts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT+0'
  return name.replace('GMT', 'UTC')
}

const formatTime = (date: Date, timeZone: string, hour12: boolean) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12,
  }).format(date)

const formatDate = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)

const getPhase = (date: Date, timeZone: string) => {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      hour12: false,
    }).format(date).split(':')[0],
  )

  if (hour >= 5 && hour < 9) return 'Sunrise'
  if (hour >= 9 && hour < 17) return 'Daytime'
  if (hour >= 17 && hour < 20) return 'Sunset'
  if (hour >= 20 || hour < 5) return 'Night'
  return 'Twilight'
}

const getRelativeLabel = (city: City, now: Date) => {
  const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  const userDate = new Date(now.toLocaleString('en-US', { timeZone: userZone }))
  const cityDate = new Date(now.toLocaleString('en-US', { timeZone: city.zone }))

  return cityDate.getTime() > userDate.getTime() ? 'Ahead of you' : 'Behind you'
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState<ContinentFilter>('All')
  const [sort, setSort] = useState<'name' | 'time'>('time')
  const hour12 = true
  const [selectedCityId, setSelectedCityId] = useState('tokyo')
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('chronosphere-favorites') : null
    return stored ? JSON.parse(stored) : []
  })
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem('chronosphere-intro') !== 'skipped'
  })
  const [compareA, setCompareA] = useState('london')
  const [compareB, setCompareB] = useState('new-york')
  const [visitedIds, setVisitedIds] = useState<string[]>([])
  const [mapPoint, setMapPoint] = useState<{ lat: number; lng: number; zone: string; name: string } | null>(null)
  const [mapZoneLoading, setMapZoneLoading] = useState(false)

  const locateMe = () => {
    if (!navigator.geolocation) {
      window.alert('Your browser does not support location detection.')
      return
    }
    setMapZoneLoading(true)
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = Number(position.coords.latitude.toFixed(4))
      const lng = Number(position.coords.longitude.toFixed(4))
      const point = { lat, lng, zone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', name: 'Your location' }
      setMapPoint(point)
      try {
        const response = await fetch(`https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lng}`)
        if (response.ok) {
          const data = await response.json() as { timeZone?: string; timeZoneName?: string }
          const zone = data.timeZone || data.timeZoneName
          if (zone && zone.includes('/')) setMapPoint({ ...point, zone })
        }
      } catch {
        // The browser's current time zone remains a reasonable fallback for this device.
      } finally {
        setMapZoneLoading(false)
      }
    }, () => {
      setMapZoneLoading(false)
      window.alert('Location access was blocked. Allow location permission in your browser and try again.')
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 })
  }

  const handleWorldMapClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
    const lat = Number((90 - y * 180).toFixed(4))
    const lng = Number((x * 360 - 180).toFixed(4))
    const nearest = [...cities].sort((a, b) => {
      const distance = (city: City) => Math.hypot(city.lat - lat, (city.lng - lng) * Math.cos(lat * Math.PI / 180))
      return distance(a) - distance(b)
    })[0]
    setMapPoint({ lat, lng, zone: nearest.zone, name: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°` })
    setMapZoneLoading(true)
    try {
      const response = await fetch(`https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lng}`)
      if (response.ok) {
        const data = await response.json() as { timeZone?: string; timeZoneName?: string }
        const zone = data.timeZone || data.timeZoneName
        if (zone && zone.includes('/')) setMapPoint({ lat, lng, zone, name: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°` })
      }
    } catch {
      // Keep the nearest known city's IANA time zone if the lookup service is unavailable.
    } finally {
      setMapZoneLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!showIntro) return
    const timer = window.setTimeout(() => {
      setShowIntro(false)
      window.sessionStorage.setItem('chronosphere-intro', 'seen')
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [showIntro])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chronosphere-favorites', JSON.stringify(favoriteIds))
    }
  }, [favoriteIds])

  const selectedCity = cities.find((city) => city.id === selectedCityId) ?? cities[0]

  const visibleCities = useMemo(() => {
    const matches = cities.filter((city) => {
      const query = search.trim().toLowerCase()
      const matchesQuery = !query || city.city.toLowerCase().includes(query) || city.country.toLowerCase().includes(query)
      const matchesContinent = continent === 'All' || city.continent === continent
      return matchesQuery && matchesContinent
    })

    return [...matches].sort((a, b) => {
      if (sort === 'name') return a.city.localeCompare(b.city)
      return formatTime(now, a.zone, false).localeCompare(formatTime(now, b.zone, false))
    })
  }, [continent, hour12, now, search, sort])

  const toggleFavorite = (cityId: string) => {
    setFavoriteIds((current) =>
      current.includes(cityId) ? current.filter((id) => id !== cityId) : [...current, cityId],
    )
  }

  const cityState = getPhase(now, selectedCity.zone)
  const activeLandmarks = landmarks.slice(0, 6)

  const comparisonCities = [
    cities.find((city) => city.id === compareA) ?? cities[0],
    cities.find((city) => city.id === compareB) ?? cities[1],
  ]

  const randomDestination = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    setSelectedCityId(randomCity.id)
    setVisitedIds((prev) => Array.from(new Set([...prev, randomCity.id])).slice(-6))
  }

  const whenCityClicked = (cityId: string) => {
    setSelectedCityId(cityId)
    setVisitedIds((prev) => Array.from(new Set([...prev, cityId])).slice(-6))
  }

  const skipIntro = () => {
    setShowIntro(false)
    if (typeof window !== 'undefined') window.sessionStorage.setItem('chronosphere-intro', 'skipped')
  }

  const dayPhaseMap = {
    Sunrise: 'Cities waking up',
    Daytime: 'Cities in motion',
    Sunset: 'Sunset windows',
    Night: 'Night shifts and lights',
  } as const

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative overflow-hidden rounded-3xl border border-cyan-400/40 bg-slate-900/80 px-8 py-10 text-center shadow-[0_30px_120px_rgba(34,211,238,0.25)]"
            >
              <div className="mb-5 flex justify-center">
                <img src="https://github.com/Gowtham1745.png?size=320" alt="Pixar Prince profile" className="h-20 w-20 rounded-full border-2 border-cyan-300/70 object-cover shadow-[0_0_35px_rgba(34,211,238,0.24)]" />
              </div>
              <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/80">Jump Through Time</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">The world never sleeps.</h1>
              <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                Every second, somewhere on Earth, a new moment begins.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <button type="button" onClick={skipIntro} className="rounded-full border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200">Skip intro</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-cyan-200 uppercase">
            <img src="https://github.com/Gowtham1745.png?size=320" alt="Pixar Prince profile" className="h-10 w-10 rounded-full border border-cyan-300/60 object-cover shadow-[0_0_18px_rgba(34,211,238,0.2)]" />
            Jump Through Time
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-200">{item.label}</a>
            ))}
          </nav>
          <button type="button" onClick={randomDestination} className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20">
            Random destination
          </button>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" /> Live world time
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-5xl font-semibold leading-none tracking-[-0.06em] text-white md:text-7xl">
              The world never sleeps.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-5 max-w-xl text-lg text-slate-300">
              Every second, somewhere on Earth, a new moment begins.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#clocks" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300">
                Explore the planet <ArrowRight className="h-4 w-4" />
              </a>
              <button type="button" onClick={randomDestination} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:text-cyan-100">
                <Compass className="h-4 w-4" /> Jump to a city
              </button>
            </motion.div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">UTC</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatTime(now, 'UTC', true)}</p>
                <p className="mt-1 text-xs text-slate-400">24h · {formatTime(now, 'UTC', false)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Selected</p>
                <p className="mt-2 text-xl font-semibold text-white">{selectedCity.city}</p>
                <p className="text-sm text-slate-300">{formatTime(now, selectedCity.zone, true)} • {formatDate(now, selectedCity.zone)}</p>
                <p className="text-xs text-slate-400">24h · {formatTime(now, selectedCity.zone, false)}</p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="relative mx-auto w-full max-w-xl">
            <div className="globe-shell">
              <div className="world-map interactive-world-map" role="application" aria-label="Interactive world map. Click anywhere to inspect coordinates and local time." onClick={handleWorldMapClick} title="Click anywhere on the map to inspect its coordinates and local time">
                <button type="button" className="map-locate-button" onClick={(event) => { event.stopPropagation(); locateMe() }} title="Use your device location">◎ Locate me</button>
                <span className="map-region region-americas">AMERICAS</span>
                <span className="map-region region-europe">EUROPE</span>
                <span className="map-region region-africa">AFRICA</span>
                <span className="map-region region-asia">ASIA</span>
                <span className="map-region region-oceania">OCEANIA</span>
                {cities.map((city) => (
                  <button key={city.id} type="button" className={`map-city-dot ${city.id === selectedCityId ? 'map-city-dot-active' : ''}`} style={{ left: `${((city.lng + 180) / 360) * 100}%`, top: `${((90 - city.lat) / 180) * 100}%` }} aria-label={`Select ${city.city}`} title={city.city} onClick={(event) => { event.stopPropagation(); whenCityClicked(city.id) }} />
                ))}
                {mapPoint && <span className="map-click-marker" style={{ left: `${((mapPoint.lng + 180) / 360) * 100}%`, top: `${((90 - mapPoint.lat) / 180) * 100}%` }} />}
                <div className="map-live-card">
                  <span className="map-live-indicator" />
                  <div>
                    <span className="map-live-kicker">{mapPoint ? 'CLICKED COORDINATE' : 'NOW EXPLORING'}</span>
                    <strong>{mapPoint ? mapPoint.name : selectedCity.city}</strong>
                    <small>{mapPoint ? (mapZoneLoading ? 'Finding local time zone…' : `${formatTime(now, mapPoint.zone, true)} · 24h ${formatTime(now, mapPoint.zone, false)}`) : `${formatTime(now, selectedCity.zone, true)} · 24h ${formatTime(now, selectedCity.zone, false)}`}</small>
                    {mapPoint && <small className="map-coordinates">LAT {mapPoint.lat.toFixed(4)} · LNG {mapPoint.lng.toFixed(4)} · {mapPoint.zone}</small>}
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-10 bottom-6 rounded-2xl border border-cyan-400/30 bg-slate-950/70 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Focused city</p>
                    <p className="mt-1 text-lg font-semibold text-white">{selectedCity.city}</p>
                  </div>
                  <div className="text-right text-sm text-slate-300">
                    <p>{formatTime(now, selectedCity.zone, true)}</p>
                    <p className="text-xs text-slate-400">24h · {formatTime(now, selectedCity.zone, false)}</p>
                    <p className="text-cyan-200">{cityState}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="clocks" className="space-y-6 py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">World clocks</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Global moments, all at once.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
                <Search className="h-4 w-4 text-cyan-200" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search city or country" className="w-52 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none" />
              </label>
              <select value={continent} onChange={(event) => setContinent(event.target.value as ContinentFilter)} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 outline-none">
                {continents.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select value={sort} onChange={(event) => setSort(event.target.value as 'name' | 'time')} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 outline-none">
                <option value="time">Sort by time</option>
                <option value="name">Sort by name</option>
              </select>
            </div>
          </div>

          {visibleCities.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center text-slate-300">
              No cities match the current search. Try another city or continent.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleCities.map((city) => {
                const localTime = formatTime(now, city.zone, true)
                const localTime24 = formatTime(now, city.zone, false)
                const dateText = formatDate(now, city.zone)
                const phase = getPhase(now, city.zone)
                const isSelected = city.id === selectedCityId
                const isFavorite = favoriteIds.includes(city.id)
                return (
                  <motion.article key={city.id} whileHover={{ y: -4 }} className={`overflow-hidden rounded-3xl border transition ${isSelected ? 'border-cyan-400/50 bg-slate-900/85' : 'border-white/10 bg-slate-900/70'} `}>
                    <div className="relative h-44 overflow-hidden bg-slate-800">
                      <img
                        src={city.image}
                        alt={`${city.city}, ${city.country}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.onerror = null
                          event.currentTarget.src = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />
                      <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-slate-950/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur">{city.continent}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/75">{city.continent}</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">{city.city}</h3>
                          <p className="text-sm text-slate-300">{city.country}</p>
                        </div>
                        <button type="button" onClick={() => toggleFavorite(city.id)} aria-label={`Toggle favorite for ${city.city}`} className={`rounded-full border p-2 ${isFavorite ? 'border-pink-400/80 bg-pink-500/10 text-pink-300' : 'border-white/10 bg-white/5 text-slate-300 hover:text-pink-200'}`}>
                          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-pink-400' : ''}`} />
                        </button>
                      </div>
                      <div className="mt-5 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-3xl font-semibold text-white">{localTime}</p>
                          <p className="mt-1 text-xs font-medium tracking-wide text-cyan-200/80">24-hour: {localTime24}</p>
                          <p className="text-sm text-slate-300">{dateText}</p>
                        </div>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs uppercase tracking-[0.15em] text-cyan-100">{phase}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                        <span>{formatOffset(now, city.zone)}</span>
                        <span>{getRelativeLabel(city, now)}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button type="button" onClick={() => whenCityClicked(city.id)} className="text-sm font-medium text-cyan-200 hover:text-cyan-100">Explore</button>
                        <button type="button" onClick={() => setSelectedCityId(city.id)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-slate-200">Select</button>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </section>

        <section id="globe" className="grid gap-8 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Explore the globe</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Navigate the world as it changes.</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Fly between cities, compare time zones, and trace how the same instant looks from a coast in Sydney to a street corner in New York.
            </p>
            <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focused moment</p>
                  <p className="mt-1 text-lg font-semibold text-white">{selectedCity.city}, {selectedCity.country}</p>
                </div>
                <button type="button" onClick={() => setSelectedCityId('london')} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-slate-200">Reset home</button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Local time</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatTime(now, selectedCity.zone, true)}</p>
                  <p className="text-xs text-slate-400">24h · {formatTime(now, selectedCity.zone, false)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Offset</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatOffset(now, selectedCity.zone)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Phase</p>
                  <p className="mt-2 text-xl font-semibold text-white">{cityState}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{selectedCity.fact}</p>
            </div>
          </div>

          <div className="relative">
            <div className="globe-shell lg:h-[500px]">
              <div className="world-map" role="img" aria-label="Stylized world map">
                <span className="map-region region-americas">AMERICAS</span>
                <span className="map-region region-europe">EUROPE</span>
                <span className="map-region region-africa">AFRICA</span>
                <span className="map-region region-asia">ASIA</span>
                <span className="map-region region-oceania">OCEANIA</span>
                <div className="map-live-card">
                  <span className="map-live-indicator" />
                  <div>
                    <span className="map-live-kicker">NOW EXPLORING</span>
                    <strong>{selectedCity.city}</strong>
                    <small>{formatTime(now, selectedCity.zone, true)} <span>· 24h {formatTime(now, selectedCity.zone, false)}</span></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wonders" className="py-12">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Seven Wonders</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Famous places, living time.</h2>
            </div>
            <button type="button" onClick={randomDestination} className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 md:inline-flex">Discover another</button>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeLandmarks.map((landmark) => (
              <article key={landmark.name} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={landmark.image}
                    alt={landmark.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{landmark.name}</h3>
                      <p className="text-sm text-slate-300">{landmark.country}</p>
                    </div>
                    <button type="button" onClick={() => setSelectedCityId('tokyo')} className="rounded-full border border-cyan-400/40 bg-cyan-500/10 p-2 text-cyan-200">
                      <MapPin className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{landmark.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-400">
                    <span>{landmark.zone}</span>
                    <span className="text-right"><span className="block">{formatTime(now, landmark.zone, true)}</span><span className="block text-xs normal-case tracking-normal text-slate-500">24h · {formatTime(now, landmark.zone, false)}</span></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="daynight" className="space-y-6 py-12">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Day and night explorer</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">How the planet shifts.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(dayPhaseMap).map(([phase, label]) => {
              const matches = cities.filter((city) => getPhase(now, city.zone) === phase)
              return (
                <div key={phase} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
                    {phase === 'Sunrise' ? <SunMedium className="h-5 w-5 text-amber-300" /> : phase === 'Night' ? <MoonStar className="h-5 w-5 text-violet-300" /> : <Clock3 className="h-5 w-5 text-cyan-300" />}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{matches.length}</p>
                  <p className="mt-2 text-sm text-slate-300">{matches.slice(0, 3).map((city) => city.city).join(', ') || 'No cities currently match'}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="compare" className="py-12">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Time comparison</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Compare your world.</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select value={compareA} onChange={(event) => setCompareA(event.target.value)} className="rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                  {cities.map((city) => (
                    <option key={`compareA-${city.id}`} value={city.id}>{city.city}</option>
                  ))}
                </select>
                <select value={compareB} onChange={(event) => setCompareB(event.target.value)} className="rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                  {cities.map((city) => (
                    <option key={`compareB-${city.id}`} value={city.id}>{city.city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {comparisonCities.map((city) => (
                <div key={city.id} className="rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{city.city}</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{formatTime(now, city.zone, true)}</p>
                      <p className="text-xs text-slate-400">24h · {formatTime(now, city.zone, false)}</p>
                    </div>
                    <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">{formatOffset(now, city.zone)}</div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{city.country} • {formatDate(now, city.zone)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Daily discovery</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">A new moment of wonder each day.</h2>
              <p className="mt-4 text-slate-300">{cities[0].fact}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={randomDestination} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 font-medium text-slate-950">Explore random destination <ArrowRight className="h-4 w-4" /></button>
                <button type="button" onClick={() => setSelectedCityId('sydney')} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white">Jump to Sydney</button>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Session progress</p>
              <div className="mt-6 space-y-3">
                {visitedIds.length === 0 ? (
                  <p className="text-slate-300">Explore a few destinations to build your session trail.</p>
                ) : (
                  visitedIds.map((cityId) => {
                    const city = cities.find((entry) => entry.id === cityId)
                    if (!city) return null
                    return (
                      <div key={city.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-slate-200">
                        <span>{city.city}</span>
                        <span className="text-cyan-200">{city.continent}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Jump Through Time</p>
            <p className="mt-4 max-w-md text-sm text-slate-300">One Planet. A Million Moments. A cinematic world time platform built for discovery, comparison, and direction.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}><a href={item.href} className="hover:text-cyan-200">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Sources</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Browser Intl date/time data</li>
              <li>Open travel photography</li>
              <li><a href="https://github.com" className="text-cyan-200 hover:text-cyan-100">GitHub repository</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
