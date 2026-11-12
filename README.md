# Prime Car Rentals — React Website

Multi-page responsive Vite + React car rental website with premium frosted-glass styling, Inter sans-serif typography, clickable filters, car detail pages, WhatsApp-only business contact, package pricing, rental terms and booking form.

## Run locally

1. Install Node.js 20+.
2. Open this folder in VS Code, run `npm install` then `npm run dev`.
3. Open the local URL shown in the terminal.
4. For production, run `npm run build`; upload/deploy `dist` using Vercel (the included `vercel.json` supports direct page URLs).

## Change the business details

Edit `src/data.js`:
- `business.name`, `business.location`, and `business.whatsapp` (currently **91987456321**).
- `business.googleReviewsUrl` and `business.googleMapsUrl` when genuine profile links are available.
- The vehicle names, photos, pricing, mileage limits, per-hour and per-kilometre charges. **The supplied cars and their prices, images, included kilometres and extra fees are illustrative—not verified client inventory.**

The business WhatsApp number is embedded only in the URL generated for buttons. It is **not printed on any webpage**. Note: a visitor can still discover the number by inspecting/clicking the WhatsApp link; any functional wa.me link necessarily contains its target number.

## Real-time availability across customers

By default, bookings use browser `localStorage`, so they persist **only in the visitor's browser**. This is useful for reviewing the booking flow but **does not synchronize availability across devices** and must not be treated as a live multi-customer booking system.

To enable shared availability and prevent overlapping bookings:
1. Create a Supabase project.
2. Run `supabase.sql` in the project's SQL Editor. The database has a PostgreSQL exclusion constraint that rejects overlapping confirmed intervals, even under concurrency.
3. Copy `.env.example` to `.env`, fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the **public / anon** key (never the service-role key).
4. Rebuild/redeploy. Add those variables in Vercel project environment settings as well.
5. Bookings are recorded immediately upon submission (no admin confirmation). The booking form attempts to open a prefilled WhatsApp enquiry; the user's browser may block popups, so a WhatsApp retry button is shown.

**Production security:** Public automatic booking is susceptible to spam and malicious reservation blocking. Before accepting actual customers, add bot protection and server-side rate limiting (for example, a verified CAPTCHA and rate-limited Supabase Edge Function). Verify legal requirements, cancellation/deposit terms, document checks, privacy notice and consent practices with the business. No payment gateway or admin dashboard is included.

## Reviews and location

No fabricated review counts/ratings are shown. Populate `googleReviewsUrl` to provide an external Google reviews link. Automatic review fetching would require a separate Google-compliant API/integration and is not implemented. Add a real business address and optionally the public Google Maps share URL. No Google Maps API key is needed.

## Pages

Home `/`, Find Cars `/cars`, vehicle details `/cars/:id`, Booking `/booking`, About `/about`, Terms `/terms`, Reviews `/reviews`, Contact `/contact`.

Photos use remotely hosted Unsplash image URLs. Replace them with licensed vehicle-specific photography before going live; current photos are illustrative and may not match specific models.
