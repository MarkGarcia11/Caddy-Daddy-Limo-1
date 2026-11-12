# Caddy Daddy Limo

Responsive, single-page React + TypeScript site for a classic-car limousine service. Editable fleet, occasion, package, FAQ, journey, and review content lives in `src/content.ts`.

## Local development

```sh
npm install
npm run dev
npm run build
```

## Owner setup before launch

- Update `SITE_CONFIG` in `src/content.ts` with the real phone, email, city, service area, hours, map query, and social URLs.
- Confirm the fleet names, year/model, passenger capacity, guide prices, licensing language, and every policy with the owner.
- Replace the marked hero, fleet, owner, gallery, and celebration photo slots with Caddy Daddy's own photos. The current Pexels photography is representative stock imagery.
- Replace the example review copy with approved, verifiable guest reviews. Review JSON-LD is emitted only for entries marked `verified: true`.
- Add actual dates to `BOOKED_DATES` in `src/content.ts` using `YYYY-MM-DD` format. The calendar is informational and does not hold a date.

## Booking and newsletter delivery

Copy `.env.example` to `.env.local`. The booking form supports two delivery options:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` enable direct inserts to the `public.enquiries` table. Apply `supabase/schema.sql` first. The public role can insert but cannot read enquiries.
- `VITE_ENQUIRY_ENDPOINT` can point to a server-side endpoint or Supabase Edge Function that stores the request and emails the owner. When configured, this endpoint takes precedence over direct Supabase inserts. Keep service-role and mail-provider secrets on the server, never in a `VITE_` variable.
- `VITE_NEWSLETTER_ENDPOINT` can point to the newsletter provider's server-side signup endpoint.

Without a configured service, enquiry and newsletter submissions are stored only in the visitor's browser. The booking confirmation offers a prefilled email hand-off; it does not claim that an owner received the request.

## SEO and launch details

Update the canonical/OG URL and social image in `index.html`, plus the domain in `public/robots.txt` and `public/sitemap.xml`. Add GA4 or Meta Pixel IDs only after the owner selects analytics and a consent approach. Review the privacy, cancellation, and service terms with the owner before launch.