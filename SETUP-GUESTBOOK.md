# Shared guestbook setup (about 10 minutes, free)

Messages are stored in a free Firebase Realtime Database so every visitor sees them.
You log in as owner from the site (click the **OWNER** badge) to delete messages.

1. Go to https://console.firebase.google.com and **Add project** (turn Google Analytics off).
2. **Build > Realtime Database > Create database**. Pick a region (Belgium `europe-west1` is closest to the UK). Start in **locked mode**.
3. Open the **Rules** tab, paste this, replace `YOUR_EMAIL` with your email, and **Publish**:

```json
{
  "rules": {
    "guestbook": {
      ".read": true,
      "$id": {
        ".write": "(auth != null && auth.token.email === 'YOUR_EMAIL') || (!data.exists() && newData.exists())",
        ".validate": "newData.hasChildren(['name','message','ts']) && newData.child('name').isString() && newData.child('name').val().length > 0 && newData.child('name').val().length <= 30 && newData.child('message').isString() && newData.child('message').val().length > 0 && newData.child('message').val().length <= 240 && newData.child('ts').val() === now",
        "name": {}, "message": {}, "ts": {},
        "$other": { ".validate": false }
      }
    }
  }
}
```

4. **Build > Authentication > Get started > Email/Password > Enable**. Then **Users > Add user** with YOUR_EMAIL and a strong password. This is your owner login.
5. **Project settings (gear) > General > Your apps > Web (`</>`)**, register an app and copy the `apiKey`. Copy the database URL from the Realtime Database page.
6. Paste into the top of `script.js`:

```js
const GUESTBOOK_CONFIG = {
  apiKey: "AIza...",
  databaseURL: "https://your-project-default-rtdb.europe-west1.firebasedatabase.app",
  ownerEmail: "YOUR_EMAIL"
};
```

7. Optional: in Google Cloud Console > APIs & Services > Credentials, restrict the API key to HTTP referrers `hearabout.me/*`.

The apiKey and database URL are safe to publish; the rules above are what protect the data
(anyone can read and add a valid message, only your account can delete).
