# HearAboutMe

A static dual-profile portfolio for Owen Bates and N3moz.

## Run locally

Open `index.html` in a browser, or serve the folder with:

```powershell
python -m http.server 8000
```

Then visit:

- `http://localhost:8000/`
- `http://localhost:8000/?profile=OwenBates`
- `http://localhost:8000/?profile=N3moz`

## GitHub Pages

1. Push this folder to a GitHub repository.
2. In repository settings, open **Pages**.
3. Set the source to **Deploy from a branch**, choose `main`, and select the root folder.
4. Optionally configure the `hearabout.me` custom domain in the Pages settings.

The site supports `/OwenBates` and `/N3moz` on a custom domain or repository Pages URL.

## Guestbook

See `SETUP-GUESTBOOK.md` to enable the shared guestbook and owner delete.
