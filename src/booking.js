const URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/,'');
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const useCloud = Boolean(URL && KEY);
const headers = {apikey:KEY,Authorization:`Bearer ${KEY}`,'Content-Type':'application/json'};
const key='prime-car-rental-bookings-v1';
function read(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
function overlap(a,b,c,d){return new Date(a)<new Date(d)&&new Date(c)<new Date(b)}
export function isCloudEnabled(){return useCloud}
export async function getBookings(){
  if(!useCloud)return read().map(({carId,startAt,endAt})=>({car_id:carId,start_at:startAt,end_at:endAt}));
  const r=await fetch(`${URL}/rest/v1/public_car_availability?select=car_id,start_at,end_at`,{headers});
  if(!r.ok)throw new Error('Could not load current availability. Please try again.');
  return r.json();
}
export function isCarAvailable(bookings,carId,startAt,endAt){
  if(!startAt||!endAt)return true;
  return !bookings.some(b=>(b.car_id??b.carId)===carId&&overlap(b.start_at??b.startAt,b.end_at??b.endAt,startAt,endAt));
}
export async function saveBooking(booking){
  if(!useCloud){
    const existing=read();
    if(!isCarAvailable(existing,booking.carId,booking.startAt,booking.endAt))throw new Error('This car is already reserved for those dates. Choose another time or car.');
    localStorage.setItem(key,JSON.stringify([...existing,{...booking,createdAt:new Date().toISOString()}]));
    return;
  }
  const r=await fetch(`${URL}/rest/v1/rpc/create_public_booking`,{method:'POST',headers,body:JSON.stringify({p_car_id:booking.carId,p_customer_name:booking.name,p_customer_phone:booking.phone,p_start_at:booking.startAt,p_end_at:booking.endAt,p_rental_type:booking.rentalType,p_package:booking.packageType})});
  if(!r.ok){let e={};try{e=await r.json()}catch{};throw new Error(/exclusion|overlap|already reserved|conflict/i.test(e.message||'')?'This car is already reserved for those dates. Choose another time or car.':(e.message||'Booking failed. Try again.'))}
}
