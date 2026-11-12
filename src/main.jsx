import React,{useEffect,useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
  Routes as RouterRoutes,
  Route as RouterRoute
} from 'react-router-dom';
import{CarFront,CalendarDays,Users,Fuel,Gauge,ArrowRight,MapPin,ShieldCheck,Clock3,Menu,X,MessageCircle,CheckCircle2,Search,SlidersHorizontal,ChevronRight,Star,Headphones,KeyRound,Route,PhoneCall,Check,AlertCircle}from'lucide-react';
import{business,cars,money,waLink}from'./data';
import{getBookings,isCarAvailable,saveBooking}from'./booking';
import './style.css';

const today=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const formatDate=v=>v?new Date(v).toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit'}):'';
const dtLocal=(date,hour='09:00')=>date?`${date}T${hour}`:'';
function Chat({label='Chat on WhatsApp',message='Hello, I would like to enquire about car rentals.',outline=false}){return <a className={outline?'btn btn-outline':'btn btn-green'} href={waLink(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{label}</a>}
function Header(){const[open,setOpen]=useState(false);const links=[['/','Home'],['/cars','Find Cars'],['/about','About Us'],['/terms','Rental Terms'],['/ourlocation','Our Location'],['/contact','Contact']];return <header className="site-header"><div className="nav-wrap container"><Link className="brand" to="/" onClick={()=>setOpen(false)}><span className="brand-icon"><CarFront size={30}/></span><span><strong>{business.name}</strong><small>{business.subtitle}</small></span></Link><nav className={open?'nav-links open':'nav-links'}>{links.map(([to,label])=><NavLink onClick={()=>setOpen(false)} key={to} end={to==='/'} to={to} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}<span className="mobile-only"><Chat label="WhatsApp Enquiry"/></span></nav><div className="nav-action"><Chat/><button aria-label="Toggle navigation" className="menu-button" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div></header>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><div className="footer-brand"><CarFront/>{business.name}</div><p>Flexible rentals, straightforward pricing, and a comfortable journey from start to finish.</p><Chat label="Enquire on WhatsApp"/></div><div><h4>Explore</h4><Link to="/cars">Find Cars</Link><Link to="/about">About Us</Link><Link to="/reviews">Our Location</Link></div><div><h4>Helpful links</h4><Link to="/terms">Rental Terms</Link><Link to="/contact">Contact</Link><Link to="/booking">Book a Car</Link></div><div><h4>Location</h4><p><MapPin size={17}/>{business.location}</p><p>12-hour and 24-hour rental packages</p></div></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>Drive with confidence.</span></div></footer>}
function Title({eyebrow,title,subtitle,light=false}){return <div className={light?'section-title light':'section-title'}>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>}
function PriceGrid({car}){return <div className="pricing-grid"><div className="price-col"><div className="price-heading">Self Drive</div><div className="price-line"><span>12 hours · {car.km12} km</span><b>{money(car.self.h12)}</b></div><div className="price-line"><span>24 hours · {car.km24} km</span><b>{money(car.self.h24)}</b></div></div><div className="price-col"><div className="price-heading">With Driver</div><div className="price-line"><span>12 hours · {car.km12} km</span><b>{money(car.driver.h12)}</b></div><div className="price-line"><span>24 hours · {car.km24} km</span><b>{money(car.driver.h24)}</b></div></div></div>}
function CarCard({car,available=true}){return <div className="car-card glass"><div className="car-media"><img src={car.image} alt={`${car.name} rental vehicle`} loading="lazy"/><span className={available?'status available':'status booked'}>{available?'Available':'Unavailable for dates'}</span></div><div className="car-info"><div className="car-card-top"><div><p className="vehicle-type">{car.type}</p><h3>{car.name}</h3></div></div><div className="specs"><span><Users size={15}/>{car.seats} seats</span><span><Fuel size={15}/>{car.fuel}</span><span><Gauge size={15}/>{car.transmission}</span></div><PriceGrid car={car}/><p className="extra-line"><Clock3 size={15}/> Extra hour: {money(car.extraHour)}/hour</p><div className="car-actions"><Link className="btn btn-primary" to={`/booking?car=${car.id}`}>Book Now <ArrowRight size={16}/></Link><Link className="btn btn-outline" to={`/cars/${car.id}`}>View Details</Link></div></div></div>}
function SearchBox({compact=false}){const navigate=useNavigate(),[date,setDate]=useState(today()),[type,setType]=useState('all'),[ride,setRide]=useState('all');return <form className={compact?'search-box glass compact':'search-box glass'} onSubmit={e=>{e.preventDefault();navigate(`/cars?date=${date}&type=${type}&ride=${ride}`)}}><label>Rental Date<input type="date" min={today()} value={date} onChange={e=>setDate(e.target.value)} required/></label><label>Car Type<select value={type} onChange={e=>setType(e.target.value)}><option value="all">All Car Types</option><option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="MPV">MPV</option><option value="Hatchback">Hatchback</option></select></label><label>Rental Type<select value={ride} onChange={e=>setRide(e.target.value)}><option value="all">All Rental Types</option><option value="self">Self Drive</option><option value="driver">With Driver</option></select></label><button className="btn btn-primary" type="submit"><Search size={18}/> Find Cars</button></form>}
function Home(){return <><section className="hero"><div className="hero-shine"/><div className="container hero-inner"><div className="hero-copy"><div className="hero-kicker"><span/> PREMIUM RENTAL EXPERIENCE</div><h1>Every journey deserves <em>a better drive.</em></h1><p>Explore well-maintained cars, flexible rental plans, and transparent pricing. Your next journey starts here.</p><div className="hero-buttons"><Link className="btn btn-white" to="/cars">Explore Cars <ArrowRight size={18}/></Link><Chat label="Ask on WhatsApp" outline/></div></div><div className="hero-search"><SearchBox/></div></div></section><section className="benefits"><div className="container benefits-grid"><span><CarFront/> Choice of Vehicles</span><span><CalendarDays/> 12 & 24 Hour Plans</span><span><KeyRound/> Self Drive or With Driver</span><span><ShieldCheck/> Clear Rental Terms</span></div></section><section className="section container"><div className="section-row"><Title eyebrow="OUR FLEET" title="Find the perfect car" subtitle="Comfortable options for work, travel and everything in between."/><Link className="text-link" to="/cars">View All Cars <ArrowRight size={18}/></Link></div><div className="cards-grid">{cars.slice(0,3).map(car=><CarCard key={car.id} car={car}/>)}</div></section><section className="section section-soft"><div className="container"><Title eyebrow="BUILT AROUND YOU" title="Simple rentals. Better journeys." subtitle="A straightforward experience from choosing your car to hitting the road."/><div className="features-grid"><Feature icon={<Search/>} title="Explore & compare" copy="Compare vehicle categories, rental durations and prices in one place."/><Feature icon={<CalendarDays/>} title="Choose your dates" copy="Check availability for your selected rental period before booking."/><Feature icon={<MessageCircle/>} title="Easy WhatsApp support" copy="Reach the rental team directly through a single WhatsApp button."/></div></div></section><section className="section container"><div className="promo glass"><div><span className="eyebrow">YOUR NEXT TRIP STARTS HERE</span><h2>Choose the car. Enjoy the drive.</h2><p>Explore self-drive and chauffeur options with clear 12-hour and 24-hour packages.</p><Link to="/cars" className="btn btn-primary">Find Your Car <ArrowRight size={17}/></Link></div><div className="promo-icon"><CarFront size={124} strokeWidth={1}/></div></div></section></>}
function Feature({icon,title,copy}){return <div className="feature glass"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{copy}</p></div>}
function PageHero({tag,title,copy}){return <div className="page-hero"><div className="container"><p className="eyebrow">{tag}</p><h1>{title}</h1>{copy&&<p>{copy}</p>}</div></div>}
function Cars(){const[params,setParams]=useSearchParams();const [bookings,setBookings]=useState([]),[error,setError]=useState('');const date=params.get('date')||today(),type=params.get('type')||'all',ride=params.get('ride')||'all';const [duration,setDuration]=useState('12');const start=dtLocal(date),end=start?new Date(new Date(start).getTime()+Number(duration)*3600000).toISOString():'';useEffect(()=>{getBookings().then(setBookings).catch(e=>setError(e.message))},[]);const filtered=cars.filter(c=>type==='all'||c.type===type);return <><PageHero tag="EXPLORE OUR FLEET" title="Find your ideal car" copy="Explore our collection and compare self-drive and with-driver rental packages."/><section className="section container"><div className="listing-filter glass"><div><label>Rental date<input type="date" min={today()} value={date} onChange={e=>setParams(p=>{p.set('date',e.target.value);return p})}/></label></div><div><label>Car type<select value={type} onChange={e=>setParams(p=>{p.set('type',e.target.value);return p})}><option value="all">All types</option>{['Sedan','SUV','MPV','Hatchback'].map(t=><option key={t}>{t}</option>)}</select></label></div><div><label>Rental option<select value={ride} onChange={e=>setParams(p=>{p.set('ride',e.target.value);return p})}><option value="all">All options</option><option value="self">Self Drive</option><option value="driver">With Driver</option></select></label></div><div><label>Duration<select value={duration} onChange={e=>setDuration(e.target.value)}><option value="12">12 hours</option><option value="24">24 hours</option></select></label></div></div><div className="results-title"><h2>{filtered.length} cars to explore</h2><p>Availability below is based on a 9:00 AM start. Choose your exact time when booking.</p></div>{error&&<div className="notice danger"><AlertCircle size={18}/>{error} Availability cannot be verified right now.</div>}<div className="cards-grid">{filtered.map(c=><CarCard key={c.id} car={c} available={error?true:isCarAvailable(bookings,c.id,new Date(start).toISOString(),end)}/>)}</div></section></>}
function CarDetails(){const{id}=useParams(),car=cars.find(x=>x.id===id);if(!car)return <NotFound/>;return <><PageHero tag="VEHICLE DETAILS" title={car.name} copy={`${car.type} · ${car.seats} seats · ${car.transmission}`}/><section className="section container detail-layout"><div><div className="detail-image glass"><img src={car.image} alt={car.name}/></div><div className="glass detail-panel"><h2>Made for the journey</h2><p>{car.description}</p><div className="detail-specs"><span><Users/>{car.seats} seats</span><span><Fuel/>{car.fuel}</span><span><Gauge/>{car.transmission}</span><span><CarFront/>{car.type}</span></div></div></div><aside className="glass detail-aside"><p className="eyebrow">TRANSPARENT PRICING</p><h2>Choose your plan</h2><PriceGrid car={car}/><div className="charges"><p><Clock3 size={18}/> Extra hour <strong>{money(car.extraHour)}/hour</strong></p><p><Route size={18}/> Extra kilometre <strong>{money(car.extraKm)}/km</strong></p></div><p className="mini-note">12-hour plan includes {car.km12} km. 24-hour plan includes {car.km24} km. Additional usage is charged separately.</p><Link className="btn btn-primary btn-full" to={`/booking?car=${car.id}`}>Check Dates & Book <ArrowRight size={17}/></Link><Chat label="Ask about this car" outline message={`Hello, I would like to know more about the ${car.name}.`}/></aside></section></>}
function Booking(){const[params]=useSearchParams(),navigate=useNavigate();const [carId,setCarId]=useState(params.get('car')||cars[0].id),[type,setType]=useState('self'),[pack,setPack]=useState('12'),[date,setDate]=useState(today()),[time,setTime]=useState('09:00'),[name,setName]=useState(''),[phone,setPhone]=useState(''),[bookings,setBookings]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);const car=cars.find(c=>c.id===carId)||cars[0];const start=dtLocal(date,time),end=new Date(new Date(start).getTime()+Number(pack)*3600000).toISOString(),startIso=new Date(start).toISOString();const available=isCarAvailable(bookings,carId,startIso,end);const price=car[type][pack==='12'?'h12':'h24'];useEffect(()=>{getBookings().then(setBookings).catch(e=>setError(e.message))},[]);async function submit(e){e.preventDefault();if(new Date(start)<=new Date()){setError('Choose a future rental date and time.');return}if(!available){setError('This car is unavailable for the selected time. Choose another date or car.');return}setLoading(true);setError('');try{await saveBooking({carId,name:name.trim(),phone:phone.trim(),rentalType:type,packageType:Number(pack),startAt:startIso,endAt:end});setDone(true);const message=`Hello, I have submitted a car booking.\nCar: ${car.name}\nOption: ${type==='self'?'Self Drive':'With Driver'}\nPackage: ${pack} hours (${pack==='12'?car.km12:car.km24} km included)\nRental start: ${formatDate(startIso)}\nRental end: ${formatDate(end)}\nPackage price: ${money(price)}\nName: ${name}\nContact: ${phone}`;window.open(waLink(message),'_blank','noopener,noreferrer')}catch(e){setError(e.message);getBookings().then(setBookings).catch(()=>{})}finally{setLoading(false)}}return <><PageHero tag="BOOK YOUR JOURNEY" title="Reserve your car" copy="Select your rental package and see availability for your chosen dates."/><section className="section container booking-layout"><div className="glass booking-form"><h2>Rental details</h2>{done?<div className="success-box"><CheckCircle2 size={44}/><h3>Booking recorded</h3><p>Your reservation details have been prepared for WhatsApp. If WhatsApp did not open, use the button below.</p><Chat label="Open WhatsApp" message={`Hello, I booked ${car.name} for ${formatDate(startIso)}. My name is ${name}.`}/><button className="btn btn-outline" onClick={()=>navigate('/cars')}>Explore other cars</button></div>:<form onSubmit={submit}><div className="form-row"><label>Choose car<select value={carId} onChange={e=>setCarId(e.target.value)}>{cars.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label><label>Rental type<select value={type} onChange={e=>setType(e.target.value)}><option value="self">Self Drive</option><option value="driver">With Driver</option></select></label></div><div className="form-row"><label>Rental package<select value={pack} onChange={e=>setPack(e.target.value)}><option value="12">12 hours · {car.km12} km included</option><option value="24">24 hours · {car.km24} km included</option></select></label><label>Start date<input type="date" min={today()} required value={date} onChange={e=>setDate(e.target.value)}/></label></div><div className="form-row"><label>Start time<input type="time" required value={time} onChange={e=>setTime(e.target.value)}/></label><label>Your name<input type="text" required minLength={2} maxLength={100} placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)}/></label></div><label>WhatsApp / contact number<input type="tel" required minLength={8} maxLength={17} placeholder="Your contact number" value={phone} onChange={e=>setPhone(e.target.value)}/></label><div className={available?'availability-message':'availability-message unavailable'}>{available?<><CheckCircle2 size={18}/> Car available for selected dates</>:<><AlertCircle size={18}/> Not available for this time. Choose another slot.</>}</div>{error&&<div className="notice danger"><AlertCircle size={18}/>{error}</div>}<button className="btn btn-primary btn-full" type="submit" disabled={!available||loading}>{loading?'Recording booking...':'Reserve & Continue to WhatsApp'} <ArrowRight size={17}/></button><p className="mini-note">Your booking is recorded when you submit this form. WhatsApp opens with your details for convenient communication.</p></form>}</div><aside className="booking-summary glass"><img src={car.image} alt={car.name}/><div className="summary-content"><p className="eyebrow">YOUR SELECTION</p><h3>{car.name}</h3><p>{type==='self'?'Self Drive':'With Driver'} · {pack} hours</p><div className="summary-item"><span>Included distance</span><strong>{pack==='12'?car.km12:car.km24} km</strong></div><div className="summary-item"><span>Extra hour</span><strong>{money(car.extraHour)}/hour</strong></div><div className="summary-item"><span>Extra kilometre</span><strong>{money(car.extraKm)}/km</strong></div><div className="summary-item"><span>Rental begins</span><strong>{formatDate(startIso)}</strong></div><div className="summary-total"><span>Package price</span><strong>{money(price)}</strong></div><p className="mini-note">Extra usage charges, if applicable, are additional to this package price.</p></div></aside></section></>}
function About(){return <><PageHero tag="ABOUT US" title="Driven by better service" copy="A simpler way to choose the right car for every journey."/><section className="section container about-grid"><div><Title eyebrow="OUR APPROACH" title="Comfort, clarity and convenience"/><p>At {business.name}, we focus on making vehicle rentals straightforward. Explore your options, see rental packages clearly and find the vehicle that suits your plans.</p><p>Choose between self-drive independence and a with-driver experience. Every journey deserves a thoughtful start.</p><Link to="/cars" className="btn btn-primary">Explore Our Fleet <ArrowRight size={16}/></Link></div><div className="about-photo glass"/></section><section className="section section-soft"><div className="container features-grid"><Feature icon={<ShieldCheck/>} title="Clear conditions" copy="Know your package duration, kilometre limit and additional usage charges."/><Feature icon={<CarFront/>} title="Choice of vehicles" copy="From practical hatchbacks to spacious family vehicles."/><Feature icon={<Headphones/>} title="Direct assistance" copy="Contact the rental team conveniently through WhatsApp."/></div></section></>}
function Terms(){const terms=[['Booking and availability','Vehicle availability depends on the selected date and time. A reservation is recorded when the booking form is submitted.'],['Rental duration','Choose a 12-hour or 24-hour rental package. The rental period begins at the selected start time.'],['Included kilometres','Each vehicle package includes a stated kilometre allowance. The allowance is displayed on the vehicle card and booking summary.'],['Additional usage','Extra hours and kilometres beyond the selected package are charged at the rates shown for that vehicle. Both charges may apply.'],['Self drive and with driver','Different rates apply to self-drive and with-driver rentals. Valid driving documents are required for self-drive arrangements.'],['Fuel, tolls and parking','Confirm fuel, toll, parking and any driver allowances with the rental team before the journey. These costs are not assumed to be included.'],['Changes and cancellations','Contact the rental team through WhatsApp for cancellations and schedule changes. Any refund or cancellation policy must be confirmed with the business.'],['Vehicle handover','Identification, driver eligibility, security deposit requirements and inspection are subject to the rental business’s final policy.']];return <><PageHero tag="IMPORTANT INFORMATION" title="Rental terms" copy="Clear rental conditions so you can plan your drive with confidence."/><section className="section container terms-layout"><div className="glass terms-card">{terms.map(([title,body],i)=><div key={title} className="term"><span className="term-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div><div className="terms-side glass"><h3>Need clarification?</h3><p>Ask about rental eligibility, kilometre limits, fees or travel plans before you book.</p><Chat label="Ask on WhatsApp"/></div></section></>}

function Reviews() {
  return (
    <>
      <PageHero
        tag="FIND US"
        title="Visit Us on Google Maps"
        copy="Explore our location, directions and customer reviews."
      />

      <section className="section container">
        <div className="reviews-panel glass">
          <h2>Our Business Location</h2>
          <p>{business.location}</p>

          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              marginTop: "24px"
            }}
          >
            <iframe
              title="Business Location"
              src={business.googleMapsEmbedUrl}
              width="100%"
              height="350"
              style={{
                border: 0,
                borderRadius: "12px",
                pointerEvents: "none"
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>

          <a
            className="btn btn-primary"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "20px" }}
          >
            Open in Google Maps <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
function Contact(){return <><PageHero tag="GET IN TOUCH" title="We're here to help" copy="Have a question about a vehicle, package or upcoming journey? Reach us directly."/><section className="section container contact-grid"><div className="contact-card glass"><div className="feature-icon"><MessageCircle/></div><h2>WhatsApp support</h2><p>Get assistance with car selection, packages, availability and rental conditions.</p><Chat label="Message on WhatsApp"/></div><div className="contact-card glass"><div className="feature-icon"><MapPin/></div><h2>Our business location</h2><p>{business.location}</p>{business.googleMapsUrl&&<a className="btn btn-outline" target="_blank" rel="noreferrer" href={business.googleMapsUrl}>View Business Location <ArrowRight size={17}/></a>}<div className="location-surface"><MapPin size={42}/><span>Business location</span></div></div></section></>}
function NotFound(){return <div className="section container missing"><h1>Page not found</h1><p>We couldn't find that page.</p><Link to="/" className="btn btn-primary">Back to Home</Link></div>}
function App(){return <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
><Header/><main><Routes/></main><Footer/><a className="floating-wa" href={waLink('Hello, I would like to enquire about renting a car.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={24}/></a></BrowserRouter>}
function LegacyRoutes(){const path=window.location.pathname;return <React.Suspense fallback={null}>{path==='/'?<Home/>:path==='/cars'?<Cars/>:path.startsWith('/cars/')?<CarDetails/>:path==='/booking'?<Booking/>:path==='/about'?<About/>:path==='/terms'?<Terms/>:path==='/reviews'?<Reviews/>:path==='/contact'?<Contact/>:<NotFound/>}</React.Suspense>}
// Browser back/forward and in-app routes require reactive routing (see wrapper below).
// import{Routes as RouterRoutes,Route}from'react-router-dom';

function Pages() {
  return (
    <RouterRoutes>
      <RouterRoute path="/" element={<Home />} />
      <RouterRoute path="/cars" element={<Cars />} />
      <RouterRoute path="/cars/:id" element={<CarDetails />} />
      <RouterRoute path="/booking" element={<Booking />} />
      <RouterRoute path="/about" element={<About />} />
      <RouterRoute path="/terms" element={<Terms />} />
      <RouterRoute path="/ourlocation" element={<Reviews />} />
      <RouterRoute path="/contact" element={<Contact />} />
      <RouterRoute path="*" element={<NotFound />} />
    </RouterRoutes>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function Root() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Pages />
      </main>
      <Footer />
      <a
        className="floating-wa"
        href={waLink('Hello, I would like to enquire about renting a car.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </BrowserRouter>
  );
}
createRoot(document.getElementById('root')).render(<Root/>);
