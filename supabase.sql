-- OPTIONAL: Run in Supabase SQL Editor to enable shared, live availability.
-- Required environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
-- No admin confirmation step: booking is recorded immediately.
create extension if not exists btree_gist;
create table if not exists public.car_bookings (
  id uuid primary key default gen_random_uuid(),
  car_id text not null check (car_id in ('dzire','creta','innova','swift','city','ertiga')),
  customer_name text not null check (char_length(customer_name) between 2 and 100),
  customer_phone text not null check (char_length(customer_phone) between 8 and 17),
  start_at timestamptz not null,
  end_at timestamptz not null,
  rental_type text not null check(rental_type in ('self','driver')),
  package_hours integer not null check(package_hours in (12,24)),
  status text not null default 'reserved' check(status in ('reserved','cancelled')),
  created_at timestamptz not null default now(),
  constraint valid_time check(end_at > start_at),
  constraint no_overlapping_bookings exclude using gist (
    car_id with =,
    tstzrange(start_at,end_at,'[)') with &&
  ) where (status='reserved')
);
alter table public.car_bookings enable row level security;
revoke all on public.car_bookings from anon, authenticated;
-- Only expose the dates and car identifiers needed for availability, not private client data.
create or replace view public.public_car_availability with (security_invoker=false) as
select car_id,start_at,end_at from public.car_bookings where status='reserved' and end_at > now();
revoke all on public.public_car_availability from public;
grant select on public.public_car_availability to anon,authenticated;
create or replace function public.create_public_booking(
  p_car_id text,p_customer_name text,p_customer_phone text,
  p_start_at timestamptz,p_end_at timestamptz,p_rental_type text,p_package integer
) returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  if p_car_id not in ('dzire','creta','innova','swift','city','ertiga') then raise exception 'Invalid car'; end if;
  if p_start_at <= now() or p_start_at > now()+interval '365 days' then raise exception 'Invalid booking date'; end if;
  if p_package not in (12,24) or p_end_at != p_start_at+make_interval(hours=>p_package) then raise exception 'Invalid booking duration'; end if;
  if p_rental_type not in ('self','driver') then raise exception 'Invalid rental type'; end if;
  if length(trim(p_customer_name)) not between 2 and 100 then raise exception 'Invalid customer name'; end if;
  if length(trim(p_customer_phone)) not between 8 and 17 then raise exception 'Invalid contact number'; end if;
  insert into public.car_bookings(car_id,customer_name,customer_phone,start_at,end_at,rental_type,package_hours)
  values(p_car_id,trim(p_customer_name),trim(p_customer_phone),p_start_at,p_end_at,p_rental_type,p_package)
  returning id into new_id;
  return new_id;
end $$;
revoke all on function public.create_public_booking(text,text,text,timestamptz,timestamptz,text,integer) from public;
grant execute on function public.create_public_booking(text,text,text,timestamptz,timestamptz,text,integer) to anon,authenticated;
-- Production note: add Turnstile/CAPTCHA or a rate-limited Edge Function to prevent malicious public reservations.
