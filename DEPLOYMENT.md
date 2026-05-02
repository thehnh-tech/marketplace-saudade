# SAUDADE Production Env

Use these values for the current production setup.

## Backend: `back-saudade.thehnh.tech`

Set these in the backend host:

```env
NODE_ENV=production
API_PUBLIC_URL=https://back-saudade.thehnh.tech
WEB_PUBLIC_URL=https://app-saudade.thehnh.tech
MARKETPLACE_PUBLIC_URL=https://saudade.thehnh.tech
MONGODB_URI=mongodb+srv://...
JWT_SECRET=long-random-secret
ADMIN_LOGIN=saudadeHNH
ADMIN_PASSWORD=strong-production-password
CORS_ORIGINS=https://app-saudade.thehnh.tech,https://saudade.thehnh.tech
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=saudade
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
MAIL_FROM=SAUDADE <orders@saudade.thehnh.tech>
MAIL_REPLY_TO=contact@thehnh.tech
MAIL_ADMIN_BCC=your-admin-email@example.com
```

Stripe live webhook endpoint:

```txt
https://back-saudade.thehnh.tech/api/stripe/webhook
```

Minimum events:

```txt
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
charge.refunded
```

## Marketplace: `saudade.thehnh.tech`

Set these in the marketplace Vercel project:

```env
NEXT_PUBLIC_SITE_URL=https://saudade.thehnh.tech
NEXT_PUBLIC_API_URL=https://back-saudade.thehnh.tech
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

Do not put `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, MongoDB, or Cloudinary secrets in the marketplace.

## QR Capture Web: `app-saudade.thehnh.tech`

Set this in the capture web app:

```env
VITE_API_URL=https://back-saudade.thehnh.tech
```

The capture route must keep the SPA rewrite:

```txt
/capture/* -> /index.html
```

## Mobile Expo / EAS

Set this in EAS production env:

```env
EXPO_PUBLIC_API_URL=https://back-saudade.thehnh.tech
```

Then rebuild:

```bash
cd mobile
eas build --platform ios --profile production
eas submit --platform ios --profile production
```

## Launch Checklist

1. Verify Resend sender domain for `orders@saudade.thehnh.tech`.
2. Switch Stripe keys from test to live in backend and marketplace.
3. Add the live Stripe webhook and copy the `whsec_` value into backend env.
4. Confirm products exist in MongoDB and the launch product status is `available`.
5. Run one live low-price checkout or Stripe test-mode checkout before public launch.
