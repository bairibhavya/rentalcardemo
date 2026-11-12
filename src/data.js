// Edit these settings to match the actual rental business before launch.

export const business = {
  name: 'Prime Car Rentals',
  subtitle: 'Self Drive & With Driver',
  location: "Vijaywada car rental demo location",

  // WhatsApp number — hidden from website text
  whatsapp: '91987456321',

  // Google Maps embedded location
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61203.093345803514!2d80.5958289244497!3d16.516334412605264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9482d944b%3A0x939b7e84ab4a0265!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1794467750371!5m2!1sen!2sin",

  // Opens location in Google Maps
googleMapsUrl: "https://www.google.com/maps/place/Vijayawada,+Andhra+Pradesh/@16.5163344,80.5958289,13z",
};


// Illustrative prices & kilometre limits. Update from the company's actual tariff before launch.
export const cars = [
  {id:'dzire',name:'Maruti Suzuki Dzire',type:'Sedan',seats:5,fuel:'Petrol',transmission:'Manual',image:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=85',description:'A comfortable, efficient choice for city drives and weekend escapes.',self:{h12:2000,h24:4000},driver:{h12:3000,h24:5500},km12:120,km24:240,extraHour:200,extraKm:12},
  {id:'creta',name:'Hyundai Creta',type:'SUV',seats:5,fuel:'Diesel',transmission:'Automatic',image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85',description:'Roomy comfort, confident road presence and smooth long-distance drives.',self:{h12:3000,h24:5500},driver:{h12:4000,h24:7000},km12:120,km24:240,extraHour:300,extraKm:15},
  {id:'innova',name:'Toyota Innova Crysta',type:'MPV',seats:7,fuel:'Diesel',transmission:'Manual',image:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1100&q=85',description:'Extra space for family trips, group travel and comfortable journeys.',self:{h12:5000,h24:9000},driver:{h12:6500,h24:12000},km12:120,km24:240,extraHour:500,extraKm:20},
  {id:'swift',name:'Maruti Suzuki Swift',type:'Hatchback',seats:5,fuel:'Petrol',transmission:'Manual',image:'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1100&q=85',description:'Compact and easy to drive, ideal for daily travel and short getaways.',self:{h12:1800,h24:3300},driver:{h12:2700,h24:4900},km12:120,km24:240,extraHour:180,extraKm:10},
  {id:'city',name:'Honda City',type:'Sedan',seats:5,fuel:'Petrol',transmission:'Automatic',image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85',description:'Refined comfort with a premium feel for business and leisure.',self:{h12:2800,h24:5100},driver:{h12:3800,h24:6800},km12:120,km24:240,extraHour:280,extraKm:14},
  {id:'ertiga',name:'Maruti Suzuki Ertiga',type:'MPV',seats:7,fuel:'Petrol',transmission:'Manual',image:'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1100&q=85',description:'Practical, spacious travel for small groups and family outings.',self:{h12:3500,h24:6300},driver:{h12:4700,h24:8300},km12:120,km24:240,extraHour:350,extraKm:16},
];
export const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`;
export function waLink(message){return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;}
