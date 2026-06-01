# Public submissions (Admin Inbox)

All visitor tips are stored here and read by **Admin → Tips**:

| File | API |
|------|-----|
| `place-submissions.json` | `POST /api/submit-place` |
| `media-submissions.json` | `POST /api/submit-media` |
| `video-submissions.json` | `POST /api/submit-video` |

Every submission uses `status: "pending"` until an admin approves or rejects it.

## Local development

Writes go to `data/submissions/*.json` on disk (no extra setup).

## Vercel production

The serverless filesystem is read-only. Enable **Vercel Blob**:

1. In the Vercel project → **Storage** → create a Blob store
2. Connect it to the project (sets `BLOB_READ_WRITE_TOKEN` automatically)
3. Redeploy

Public submit routes and the admin inbox then use the same JSON documents in Blob storage.

Without Blob on Vercel, saves fail with a clear error (not “disabled in production”).
