const profiles = {
  OwenBates: {
    mode: "professional",
    name: "Owen Bates",
    initials: "OB",
    title: "Product designer & creative developer",
    lede: "I turn complex ideas into clear, thoughtful digital experiences. Available for selected freelance and collaboration opportunities.",
    location: "United Kingdom",
    availability: "Available for work",
    email: "hello@hearabout.me",
    about: "I combine strategy, design and development to create work that feels useful, distinctive and easy to understand.",
    detail: "I am interested in digital products, brand experiences and ambitious ideas that deserve careful execution.",
    projects: [
      { title: "Product Platform", description: "An end-to-end digital experience focused on clarity, speed and a strong visual system.", tags: ["Strategy", "UX / UI", "Development"] },
      { title: "Brand System", description: "A flexible identity and web presence created to scale across every customer touchpoint.", tags: ["Art direction", "Identity", "Web"] },
      { title: "Creative Tool", description: "A focused digital tool that makes a complicated workflow feel simple and natural.", tags: ["Research", "Prototype", "Product"] }
    ]
  },
  N3moz: {
    mode: "gaming",
    name: "N3moz",
    initials: "N3",
    title: "Competitive gamer & content creator",
    lede: "Chasing high-level plays, building community and creating content with a competitive edge.",
    location: "Europe",
    availability: "Open to teams",
    email: "n3moz@hearabout.me",
    about: "I play to improve, stream to connect and create moments worth coming back to.",
    detail: "Building a reputation for sharp decision-making, consistent performance and a community-first approach.",
    projects: [
      { title: "Tournament Series", description: "Competitive highlights and peak moments from recent tournament appearances.", tags: ["Competitive", "Highlights"] },
      { title: "Live Streams", description: "Regular live sessions featuring ranked matches, analysis and community games.", tags: ["Twitch", "Community"] },
      { title: "Creator Clips", description: "A curated selection of plays, edits and moments shared across social platforms.", tags: ["Montage", "Shorts"] }
    ]
  }
};

function getProfileKey() {
  const params = new URLSearchParams(window.location.search);
  const queryProfile = params.get("profile");
  if (profiles[queryProfile]) return queryProfile;

  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts.find((part) => profiles[part]) || null;
}

function basePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const keyIndex = parts.findIndex((part) => profiles[part]);
  if (keyIndex > 0) return "/" + parts.slice(0, keyIndex).join("/");
  return "";
}

function profileUrl(key) {
  if (window.location.protocol === "file:") {
    return `./index.html?profile=${encodeURIComponent(key)}`;
  }
  return `${basePath()}/${key}`;
}

function nav(profile) {
  const alternate = profile.mode === "gaming" ? "OwenBates" : "N3moz";
  const label = profile.mode === "gaming" ? "Professional profile" : "Gaming profile";
  return `
    <nav class="nav">
      <a class="brand" href="${basePath() || "/"}" aria-label="HearAboutMe home">
        <span class="brand-mark">H</span>
        <span class="brand-name">HearAboutMe</span>
      </a>
      <div class="nav-links">
        <a href="#work">Work</a>
        ${profile.mode === "gaming" ? '<a href="#socials">Links</a>' : ""}
        <a href="#about">About</a>
        <a class="profile-link" href="${profileUrl(alternate)}">${label} <span>↗</span></a>
      </div>
    </nav>`;
}

function landing() {
  document.title = "HearAboutMe";
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.className = "";
  document.getElementById("app").innerHTML = `
    <main class="landing">
      ${nav({ mode: "professional" })}
      <div class="landing-main">
        <a class="landing-card" href="${profileUrl("OwenBates")}">
          <span class="landing-kicker">Professional portfolio / 01</span>
          <h1>Owen<br>Bates</h1>
          <div class="landing-card-bottom">
            <p>Design, development and digital work selected for professional opportunities.</p>
            <span class="circle-arrow">↗</span>
          </div>
        </a>
        <a class="landing-card gaming-card" href="${profileUrl("N3moz")}">
          <span class="landing-kicker">Gaming profile / 02</span>
          <h1>N3moz</h1>
          <div class="landing-card-bottom">
            <p>Competitive gaming, live streams and a community built around the next play.</p>
            <span class="circle-arrow">↗</span>
          </div>
        </a>
      </div>
    </main>`;
}

function renderProfile(key) {
  const profile = profiles[key];
  document.title = `${profile.name} — HearAboutMe`;
  document.body.className = profile.mode === "gaming" ? "gaming" : "";

  if (profile.mode === "gaming") {
    document.getElementById("app").innerHTML = `
      <main class="gaming-link-page">
        <video class="gaming-background-video" autoplay muted loop playsinline poster="./assets/n3moz-pfp.png">
          <source src="./assets/video/city-skyline.mp4" type="video/mp4" />
        </video>
        <div class="gaming-background-shade"></div>
        <section class="gaming-profile-card">
          <div class="gaming-card-topbar">
            <button class="sound-toggle" type="button" aria-label="Toggle music" title="Toggle music">
              <span class="sound-icon">♪</span>
              <div class="volume-popover">
                <span class="volume-value">70</span>
                <input class="volume-slider" type="range" min="0" max="100" value="70" aria-label="Volume" />
              </div>
            </button>
            <div class="view-count" title="Profile views">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.2c-5.2 0-9.2 4.5-10.3 6.8 1.1 2.3 5.1 6.8 10.3 6.8s9.2-4.5 10.3-6.8C21.2 9.7 17.2 5.2 12 5.2zm0 11.1a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm0-2.2a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z"/></svg>
              <strong>0</strong>
            </div>
          </div>

          <div class="gaming-profile-main">
            <div class="gaming-avatar" aria-label="N3moz avatar"></div>
            <p class="gaming-big-time uk-time-large" aria-label="United Kingdom local time"></p>
            <h1>N3moz</h1>
            <p class="gaming-tagline">Developer <span class="tagline-divider">·</span> <button class="dm-link" type="button">DM me</button></p>
            <p class="gaming-location"><span class="location-pin" aria-hidden="true">◆</span> The UK</p>

            <div class="discord-status is-offline" role="button" tabindex="0" aria-label="Open Discord profile">
              <div class="discord-avatar" style="background-image: url('./assets/n3moz-pfp.png')"></div>
              <div class="discord-copy">
                <div class="discord-name">
                  <span class="discord-username">N3moz_</span>
                  <button class="guild-tag" type="button" data-tag-info="OceanMC server tag" aria-label="Open TIDE tag menu"><img class="guild-tag-icon" src="./assets/oceanmc-logo.png" alt="" /><span>TIDE</span></button>
                </div>
                <div class="discord-presence"><span class="presence-dot"></span><span class="presence-text">Offline</span></div>
              </div>
            </div>

            <div class="gaming-socials-inline" aria-label="Social links">
              <a href="https://twitch.tv/n3mozzzz" target="_blank" rel="noopener" aria-label="Twitch"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h17v11l-5 5h-4l-3 3v-3H4V3zm3 3v10h3v3l3-3h3l3-3V6H7zm7 2h2v5h-2V8zm-4 0h2v5h-2V8z"/></svg></a>
              <a href="https://tiktok.com/@N3m0zzz" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.4 2.2 1.8 3.7 4 4v3c-1.5 0-2.8-.4-4-1.1V15a6 6 0 1 1-5.2-5.9v3.1A3 3 0 1 0 12 18V3h3z"/></svg></a>
              <a href="https://discord.gg/OceanMC" target="_blank" rel="noopener" aria-label="Discord"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.7 5.3A18 18 0 0 0 15.2 4l-.5 1a16 16 0 0 0-5.4 0l-.5-1a18 18 0 0 0-4.5 1.3C1.7 9.2 1.1 13 1.4 16.7A18 18 0 0 0 6.9 19l1.1-1.5c-.6-.2-1.1-.5-1.6-.8l.4-.3c3.1 1.4 6.5 1.4 9.5 0l.4.3c-.5.3-1 .6-1.6.8l1.1 1.5a18 18 0 0 0 5.5-2.3c.4-4.3-.7-8.1-3.4-11.4zM8.7 14.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg></a>
              <a href="https://youtube.com/@n3mozz" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5S5 4.5 3.1 5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9A3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 16.9a31 31 0 0 0 .5-4.9A31 31 0 0 0 23 7.1zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg></a>
              <button class="comment-toggle" type="button" aria-label="Open guestbook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-4.2A3 3 0 0 1 2 14V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9zM6 8h12M6 12h8"/></svg>
              </button>
              <button class="owner-badge" type="button" data-tooltip="Owner" aria-label="Owner">OWNER</button>
            </div>

            <div class="music-player">
              <button class="album-art" type="button" aria-label="Open lyrics">♫</button>
              <div class="music-info">
                <button class="track-title" type="button" aria-label="Open lyrics">Toxic Humans / Listen To This If You're Lost</button>
                <div class="track-line">
                  <span class="track-time elapsed">0:00</span>
                  <div class="track-progress" role="progressbar" aria-label="Track progress" aria-valuemin="0" aria-valuemax="231" aria-valuenow="0"><div class="track-progress-fill"></div></div>
                  <span class="track-time duration">0:00</span>
                </div>
              </div>
              <button class="track-control previous" type="button" aria-label="Previous track">|‹</button>
              <button class="track-control play" type="button" aria-label="Play track">▶</button>
              <button class="track-control next" type="button" aria-label="Next track">›|</button>
            </div>
          </div>
        </section>
        <div class="lyrics-overlay" aria-hidden="true">
          <button class="lyrics-backdrop" type="button" aria-label="Close lyrics"></button>
          <section class="lyrics-card" role="dialog" aria-modal="true" aria-label="Timed lyrics">
            <button class="lyrics-close" type="button" aria-label="Close lyrics">×</button>
            <div class="lyrics-meta">
              <span>Now playing</span>
              <strong class="lyrics-track-title">Toxic Humans / Listen To This If You're Lost</strong>
            </div>
            <div class="lyrics-lines" aria-live="polite"></div>
            <div class="lyrics-progress"><div class="lyrics-progress-fill"></div></div>
          </section>
        </div>
        <aside class="guestbook-sidebar" aria-hidden="true" aria-label="Guestbook">
          <div class="guestbook-header">
            <div>
              <span>Guestbook</span>
              <strong>Leave a message</strong>
            </div>
            <button class="guestbook-close" type="button" aria-label="Close guestbook">×</button>
          </div>
          <form class="guestbook-form">
            <input name="name" maxlength="30" placeholder="Your name" aria-label="Your name" required />
            <textarea name="message" maxlength="240" placeholder="Write a message..." aria-label="Message" required></textarea>
            <button type="submit">Post message</button>
          </form>
          <div class="guestbook-messages">
            <div class="guestbook-empty">Be the first to leave a message.</div>
          </div>
        </aside>
        <div class="profile-confirm-overlay" aria-hidden="true">
          <button class="profile-confirm-backdrop" type="button" aria-label="Close"></button>
          <section class="profile-confirm-card" role="dialog" aria-modal="true" aria-label="Open Discord profile">
            <div class="profile-confirm-avatar"></div>
            <div>
              <span>Discord profile</span>
              <strong>Open N3moz_?</strong>
            </div>
            <div class="profile-confirm-actions">
              <button class="profile-confirm-cancel" type="button">Cancel</button>
              <button class="profile-confirm-open" type="button">Open Discord</button>
            </div>
          </section>
        </div>
        <div class="discord-overlay" aria-hidden="true">
          <button class="discord-overlay-backdrop" type="button" aria-label="Close Discord overlay"></button>
          <article class="discord-server-card" role="dialog" aria-modal="true" aria-label="OceanMC Discord server">
            <button class="discord-overlay-close" type="button" aria-label="Close">×</button>
            <div class="discord-server-cover"></div>
            <div class="discord-server-identity">
              <div class="discord-server-icon"><img src="./assets/oceanmc-logo.png" alt="" /></div>
              <h2>OceanMC <span class="guild-tag"><img class="guild-tag-icon" src="./assets/oceanmc-logo.png" alt="" /><span>TIDE</span></span></h2>
            </div>
            <div class="discord-server-stats"><span><i class="status-online"></i>238 Online</span><span><i class="status-member"></i>1,264 Members</span></div>
            <p>Est. Jul 2026</p>
            <p class="discord-server-description">Join OceanMC for an exciting survival experience featuring PvP, a player-driven economy, custom events, crates, spawners, and more! Build your wealth, compete for rewards, and become the best.</p>
            <div class="discord-server-categories">
              <div><span class="category-icon mc-icon">◈</span><strong>Minecraft</strong></div>
              <div><span>⚔ PVP</span><span>🌿 Economy</span><span>🛒 Shop</span></div>
              <div><span>♟ Active</span><span>🌐 NA AND EU SUPPORT</span></div>
            </div>
            <a class="discord-server-button" href="https://discord.gg/OceanMC" target="_blank" rel="noopener">Go to Server</a>
            <a class="discord-server-tag-link" href="https://discord.com/servers" target="_blank" rel="noopener"><span>Want your own Server Tag?</span><strong>Create one</strong></a>
          </article>
        </div>
      </main>`;

    const playButton = document.querySelector(".track-control.play");
    const soundToggle = document.querySelector(".sound-toggle");
    const progress = document.querySelector(".track-progress");
    const fill = document.querySelector(".track-progress-fill");
    const elapsed = document.querySelector(".elapsed");
    const volumeSlider = document.querySelector(".volume-slider");
    const volumeValue = document.querySelector(".volume-value");
    const discordStatusCard = document.querySelector(".discord-status");
    const discordOverlay = document.querySelector(".discord-overlay");
    const closeOverlay = () => {
      discordOverlay.classList.remove("open");
      discordOverlay.setAttribute("aria-hidden", "true");
    };
    let playing = false;
    let seconds = 0;
    let timer = null;
    let trackIndex = 0;
    let duration = 231;
    const previousTrackButton = document.querySelector(".track-control.previous");
    const nextTrackButton = document.querySelector(".track-control.next");
    const trackTitle = document.querySelector(".track-title");
    const durationLabel = document.querySelector(".duration");
    const albumArt = document.querySelector(".album-art");
    const lyricsOverlay = document.querySelector(".lyrics-overlay");
    const lyricsLines = document.querySelector(".lyrics-lines");
    const lyricsTrackTitle = document.querySelector(".lyrics-track-title");
    const lyricsProgressFill = document.querySelector(".lyrics-progress-fill");
    const tracks = [
      {
        title: "Toxic Humans / Listen To This If You're Lost",
        artist: "Juice WRLD",
        src: "./assets/music/01-toxic-humans.mp3",
        duration: 231,
        thumbnail: "./assets/toxic-humans.jpg",
        lyricsFile: "./assets/lyrics/01-toxic-humans.lrc",
        lyricLines: []
      },
      {
        title: "Cigarettes",
        artist: "Juice WRLD",
        src: "./assets/music/02-cigarettes.mp3",
        duration: 231,
        thumbnail: "./assets/cigarettes.jpg",
        lyricsFile: "./assets/lyrics/02-cigarettes.lrc",
        lyricLines: []
      },
      {
        title: "Flaws and Sins",
        artist: "Juice WRLD",
        src: "./assets/music/03-flaws-and-sins.mp3",
        duration: 231,
        thumbnail: "./assets/flaws-and-sins.jpg",
        lyricsFile: "./assets/lyrics/03-flaws-and-sins.lrc",
        lyricLines: []
      }
    ];
    const audio = new Audio();
    audio.preload = "metadata";

    async function loadDiscordPresence() {
      const statusCard = document.querySelector(".discord-status");
      const username = document.querySelector(".discord-username");
      const guildTag = document.querySelector(".guild-tag");
      const presenceText = document.querySelector(".presence-text");

      try {
        const response = await fetch("https://api.lanyard.rest/v1/users/778349018891812867");
        if (response.status === 404) {
          statusCard.className = "discord-status is-offline";
          presenceText.textContent = "Offline";
          statusCard.title = "Join the Lanyard Discord server to enable live presence";
          throw new Error("Discord presence setup required");
        }
        if (!response.ok) throw new Error("Discord presence unavailable");
        const payload = await response.json();
        const data = payload.data;
        if (!data) throw new Error("Discord presence unavailable");

        const statusLabels = { online: "Online", idle: "Away", dnd: "Do not disturb", offline: "Offline" };
        const status = data.discord_status || "offline";
        statusCard.className = `discord-status is-${status}`;
        presenceText.textContent = statusLabels[status] || "Unknown";

        if (data.discord_user?.username) {
          const liveUsername = data.discord_user.username;
          username.textContent = liveUsername.charAt(0).toUpperCase() + liveUsername.slice(1);
        }
        const clan = data.discord_user?.clan || data.discord_user?.primary_guild;
        if (clan?.tag) {
          guildTag.innerHTML = `<img class="guild-tag-icon" src="./assets/oceanmc-logo.png" alt="" /><span>${clan.tag}</span>`;
          guildTag.dataset.tagInfo = clan.identity_guild_id ? `Discord server tag · Server ID ${clan.identity_guild_id}` : "Discord server tag";
          guildTag.title = guildTag.dataset.tagInfo;
          guildTag.hidden = false;
        } else {
          guildTag.hidden = true;
        }
      } catch (error) {
        statusCard.className = "discord-status is-offline";
        presenceText.textContent = "Offline";
      }
    }

    loadDiscordPresence();
    window.setInterval(loadDiscordPresence, 30000);

    const ukTimeLarge = document.querySelector(".uk-time-large");
    const updateUkTime = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(new Date()) + " UK";
      ukTimeLarge.textContent = formatted;
    };
    updateUkTime();
    window.setInterval(updateUkTime, 1000);

    const viewCount = document.querySelector(".view-count strong");
    const viewsKey = "n3moz-profile-views";
    const sessionKey = "n3moz-view-counted";
    const viewResetKey = "n3moz-profile-view-reset";
    if (sessionStorage.getItem(viewResetKey) !== "2026-11-22") {
      localStorage.setItem(viewsKey, "0");
      sessionStorage.removeItem(sessionKey);
      sessionStorage.setItem(viewResetKey, "2026-11-22");
    }
    let totalViews = Number(localStorage.getItem(viewsKey) || 0);
    if (!sessionStorage.getItem(sessionKey)) {
      totalViews += 1;
      localStorage.setItem(viewsKey, String(totalViews));
      sessionStorage.setItem(sessionKey, "true");
    }
    viewCount.textContent = totalViews.toLocaleString();

    const updateViews = (count) => {
      totalViews = count;
      viewCount.textContent = totalViews.toLocaleString();
    };
    window.addEventListener("storage", (event) => {
      if (event.key === viewsKey) updateViews(Number(event.newValue || 0));
    });
    const viewsChannel = "BroadcastChannel" in window ? new BroadcastChannel("n3moz-profile-views") : null;
    if (viewsChannel) {
      viewsChannel.addEventListener("message", (event) => {
        if (Number.isFinite(event.data)) updateViews(event.data);
      });
      viewsChannel.postMessage(totalViews);
    }

    function updatePlayer() {
      playButton.textContent = playing ? "Ⅱ" : "▶";
      playButton.setAttribute("aria-label", playing ? "Pause track" : "Play track");
      elapsed.textContent = formatTime(seconds);
      fill.style.width = `${Math.min(100, (seconds / duration) * 100)}%`;
      progress.setAttribute("aria-valuenow", String(seconds));
      lyricsProgressFill.style.width = `${Math.min(100, (seconds / duration) * 100)}%`;
      updateTimedLyrics();
    }

    function formatTime(value) {
      const safeValue = Math.max(0, Math.round(value));
      return `${Math.floor(safeValue / 60)}:${String(safeValue % 60).padStart(2, "0")}`;
    }

    function renderLyrics() {
      lyricsTrackTitle.textContent = `${tracks[trackIndex].title} — ${tracks[trackIndex].artist}`;
      loadLyricsFile(trackIndex);
    }

    async function loadLyricsFile(index) {
      const track = tracks[index];
      try {
        const response = await fetch(track.lyricsFile);
        if (!response.ok) throw new Error("Lyrics file not found");
        const lrc = await response.text();
        const timedLines = parseLrc(lrc);
        track.lyricLines = timedLines.map((line) => line.text);
        track.timedWords = timedLines;
        if (!track.lyricLines.length) throw new Error("No timed lyrics found");
        lyricsLines.innerHTML = timedLines.map((line) =>
          `<div class="lyrics-line" data-time="${line.time}">${line.text.split(" ").map((word) => `<span>${word}</span>`).join(" ")}</div>`
        ).join("");
      } catch (error) {
        track.lyricLines = [];
        track.timedWords = [];
        lyricsLines.innerHTML = `<div class="lyrics-empty">Add authorized timed lyrics for this track</div>`;
      }
      updateTimedLyrics();
    }

    function parseLrc(lrc) {
      return lrc.split(/\r?\n/)
        .map((line) => {
          const match = line.match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.*)$/);
          if (!match || !match[4].trim()) return null;
          const minutes = Number(match[1]);
          const seconds = Number(match[2]);
          const fraction = Number((match[3] || "0").padEnd(3, "0")) / 1000;
          return { time: minutes * 60 + seconds + fraction, text: match[4].trim() };
        })
        .filter(Boolean)
        .sort((a, b) => a.time - b.time);
    }

    function updateTimedLyrics() {
      const lines = [...lyricsLines.querySelectorAll(".lyrics-line")];
      if (!lines.length) return;
      let lineIndex = 0;
      for (let index = 0; index < lines.length; index++) {
        if (Number(lines[index].dataset.time) <= seconds) lineIndex = index;
      }
      const wordsInLine = [...lines[lineIndex].querySelectorAll("span")];
      const lineTime = Number(lines[lineIndex].dataset.time);
      const nextLine = lines[lineIndex + 1];
      const lineEnd = nextLine ? Number(nextLine.dataset.time) : duration;
      const lineProgress = Math.max(0, Math.min(1, (seconds - lineTime) / Math.max(0.001, lineEnd - lineTime)));
      const wordIndex = Math.min(wordsInLine.length - 1, Math.floor(lineProgress * wordsInLine.length));

      lines.forEach((line, index) => {
        line.classList.toggle("active", index === lineIndex);
        line.classList.toggle("past", index < lineIndex);
      });
      const activeLine = lines[lineIndex];
      if (activeLine) activeLine.scrollIntoView({ block: "center", behavior: "smooth" });
      wordsInLine.forEach((word, index) => word.classList.toggle("lit", index <= wordIndex));
    }

    function loadTrack(index, autoplay = false) {
      trackIndex = (index + tracks.length) % tracks.length;
      const track = tracks[trackIndex];
      seconds = 0;
      duration = track.duration;
      playing = false;
      trackTitle.textContent = `${track.title} — ${track.artist}`;
      albumArt.style.background = `url("${track.thumbnail}") center / cover no-repeat`;
      albumArt.textContent = "";
      durationLabel.textContent = formatTime(track.duration);
      progress.setAttribute("aria-valuemax", String(track.duration));
      renderLyrics();
      updatePlayer();
      audio.src = track.src;
      audio.load();
      playing = false;
      soundToggle.classList.remove("playing");
      if (autoplay) {
        audio.play().then(() => {
          playing = true;
          soundToggle.classList.add("playing");
          updatePlayer();
        }).catch(() => {});
      }
      updatePlayer();
    }

    volumeSlider.addEventListener("input", () => {
      volumeValue.textContent = volumeSlider.value;
      soundToggle.style.setProperty("--volume", `${volumeSlider.value}%`);
    });
    volumeSlider.addEventListener("pointerdown", (event) => event.stopPropagation());
    volumeSlider.addEventListener("click", (event) => event.stopPropagation());

    const openDiscordProfile = () => {
      const profileConfirm = document.querySelector(".profile-confirm-overlay");
      profileConfirm.classList.add("open");
      profileConfirm.setAttribute("aria-hidden", "false");
    };
    const profileConfirm = document.querySelector(".profile-confirm-overlay");
    const closeProfileConfirm = () => {
      profileConfirm.classList.remove("open");
      profileConfirm.setAttribute("aria-hidden", "true");
    };
    document.querySelector(".profile-confirm-backdrop").addEventListener("click", closeProfileConfirm);
    document.querySelector(".profile-confirm-cancel").addEventListener("click", closeProfileConfirm);
    document.querySelector(".profile-confirm-open").addEventListener("click", () => {
      closeProfileConfirm();
      window.open("https://discord.com/users/778349018891812867", "_blank", "noopener,noreferrer");
    });
    discordStatusCard.addEventListener("click", (event) => {
      if (!event.target.closest(".guild-tag")) openDiscordProfile();
    });
    discordStatusCard.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest(".guild-tag")) {
        event.preventDefault();
        openDiscordProfile();
      }
    });
    const guildTag = document.querySelector(".guild-tag");
    guildTag.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      discordOverlay.classList.add("open");
      discordOverlay.setAttribute("aria-hidden", "false");
    });
    document.querySelector(".discord-overlay-backdrop").addEventListener("click", closeOverlay);
    document.querySelector(".discord-overlay-close").addEventListener("click", closeOverlay);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeOverlay();
        closeLyrics();
        closeProfileConfirm();
      }
    });

    const guestbookSidebar = document.querySelector(".guestbook-sidebar");
    const guestbookToggle = document.querySelector(".comment-toggle");
    const guestbookClose = document.querySelector(".guestbook-close");
    const guestbookForm = document.querySelector(".guestbook-form");
    const guestbookMessages = document.querySelector(".guestbook-messages");
    const dmLink = document.querySelector(".dm-link");
    dmLink.addEventListener("click", openDiscordProfile);

    const readGuestbook = () => {
      try {
        return JSON.parse(localStorage.getItem("n3moz-guestbook") || "[]");
      } catch {
        return [];
      }
    };

    const renderGuestbook = () => {
      const messages = readGuestbook();
      guestbookMessages.replaceChildren();
      if (!messages.length) {
        const empty = document.createElement("div");
        empty.className = "guestbook-empty";
        empty.textContent = "Be the first to leave a message.";
        guestbookMessages.appendChild(empty);
        return;
      }
      messages.forEach((entry) => {
        const message = document.createElement("article");
        message.className = "guestbook-message";
        const name = document.createElement("strong");
        name.textContent = entry.name;
        const text = document.createElement("p");
        text.textContent = entry.message;
        message.append(name, text);
        guestbookMessages.appendChild(message);
      });
    };

    guestbookToggle.addEventListener("click", () => {
      guestbookSidebar.classList.add("open");
      guestbookSidebar.setAttribute("aria-hidden", "false");
      renderGuestbook();
    });
    guestbookClose.addEventListener("click", () => {
      guestbookSidebar.classList.remove("open");
      guestbookSidebar.setAttribute("aria-hidden", "true");
    });
    guestbookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(guestbookForm);
      const messages = readGuestbook();
      messages.unshift({
        name: String(data.get("name")).trim().slice(0, 30),
        message: String(data.get("message")).trim().slice(0, 240)
      });
      localStorage.setItem("n3moz-guestbook", JSON.stringify(messages.slice(0, 50)));
      guestbookForm.reset();
      renderGuestbook();
    });

    const profileCard = document.querySelector(".gaming-profile-card");
    document.querySelector(".gaming-link-page").addEventListener("pointermove", (event) => {
      if (window.innerWidth < 680) return;
      const rect = profileCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      profileCard.style.transform = `perspective(1100px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg)`;
    });
    document.querySelector(".gaming-link-page").addEventListener("pointerleave", () => {
      profileCard.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });

    playButton.addEventListener("click", () => {
      playing = !playing;
      soundToggle.classList.toggle("playing", playing);
      if (playing) {
        audio.play().catch(() => {
          playing = false;
          soundToggle.classList.remove("playing");
        });
      } else {
        audio.pause();
      }
      updatePlayer();
    });

    previousTrackButton.addEventListener("click", () => loadTrack(trackIndex - 1, playing));
    nextTrackButton.addEventListener("click", () => loadTrack(trackIndex + 1, playing));

    const lyricsBackdrop = document.querySelector(".lyrics-backdrop");
    const lyricsClose = document.querySelector(".lyrics-close");
    const closeLyrics = () => {
      lyricsOverlay.classList.remove("open");
      lyricsOverlay.setAttribute("aria-hidden", "true");
    };
    const openLyrics = () => {
      renderLyrics();
      lyricsOverlay.classList.add("open");
      lyricsOverlay.setAttribute("aria-hidden", "false");
    };
    const lyricsCard = document.querySelector(".lyrics-card");
    let lyricsPosition = null;
    let lyricsWidth = null;
    let draggingLyrics = false;
    let dragOffset = { x: 0, y: 0 };

    lyricsCard.addEventListener("wheel", (event) => {
      event.preventDefault();
      const currentWidth = lyricsWidth || lyricsCard.getBoundingClientRect().width;
      lyricsWidth = Math.max(280, Math.min(720, currentWidth - event.deltaY * 0.35));
      lyricsCard.style.width = `${lyricsWidth}px`;
    }, { passive: false });

    lyricsCard.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || event.target.closest("a")) return;
      const rect = lyricsCard.getBoundingClientRect();
      draggingLyrics = true;
      if (!lyricsPosition) {
        lyricsPosition = { x: rect.left, y: rect.top };
      }
      lyricsCard.style.position = "fixed";
      lyricsCard.style.left = `${lyricsPosition.x}px`;
      lyricsCard.style.top = `${lyricsPosition.y}px`;
      lyricsCard.style.margin = "0";
      dragOffset.x = event.clientX - lyricsPosition.x;
      dragOffset.y = event.clientY - lyricsPosition.y;
      lyricsCard.setPointerCapture(event.pointerId);
    });

    lyricsCard.addEventListener("pointermove", (event) => {
      if (!draggingLyrics) return;
      lyricsPosition = {
        x: Math.max(8, Math.min(window.innerWidth - lyricsCard.offsetWidth - 8, event.clientX - dragOffset.x)),
        y: Math.max(8, Math.min(window.innerHeight - lyricsCard.offsetHeight - 8, event.clientY - dragOffset.y))
      };
      lyricsCard.style.left = `${lyricsPosition.x}px`;
      lyricsCard.style.top = `${lyricsPosition.y}px`;
    });

    lyricsCard.addEventListener("pointerup", (event) => {
      draggingLyrics = false;
      if (lyricsCard.hasPointerCapture(event.pointerId)) lyricsCard.releasePointerCapture(event.pointerId);
    });
    document.querySelectorAll(".album-art, .track-title").forEach((button) => button.addEventListener("click", openLyrics));
    lyricsBackdrop.addEventListener("click", closeLyrics);
    lyricsClose.addEventListener("click", closeLyrics);

    volumeSlider.addEventListener("input", () => {
      const volume = Number(volumeSlider.value);
      audio.volume = volume / 100;
    });
    audio.volume = Number(volumeSlider.value) / 100;

    audio.addEventListener("loadedmetadata", () => {
      if (Number.isFinite(audio.duration)) {
        duration = audio.duration;
        tracks[trackIndex].duration = duration;
        durationLabel.textContent = formatTime(duration);
        progress.setAttribute("aria-valuemax", String(Math.round(duration)));
      }
    });
    audio.addEventListener("timeupdate", () => {
      seconds = audio.currentTime;
      updatePlayer();
    });
    audio.addEventListener("play", () => {
      playing = true;
      soundToggle.classList.add("playing");
      updatePlayer();
    });
    audio.addEventListener("pause", () => {
      if (!audio.ended) {
        playing = false;
        soundToggle.classList.remove("playing");
        updatePlayer();
      }
    });
    audio.addEventListener("ended", () => loadTrack(trackIndex + 1, true));

    loadTrack(0, false);

    soundToggle.addEventListener("click", () => playButton.click());
    return;
  }

  const projectCards = profile.projects.map((project, index) => `
    <article class="project-card">
      <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tag-row">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    </article>`).join("");

  document.getElementById("app").innerHTML = `
    <main class="site-shell">
      ${nav(profile)}
      <section class="hero">
        <div class="hero-copy">
          <div>
            <div class="eyebrow">${profile.availability}</div>
            <h1>${profile.name}</h1>
            <p class="hero-lede">${profile.lede}</p>
          </div>
          <div class="hero-actions">
            <a class="button" href="#work">Explore work <span>↓</span></a>
            <a class="button secondary" href="mailto:${profile.email}">Get in touch</a>
          </div>
        </div>
        <div class="hero-visual" aria-label="${profile.name} profile visual">
          <div class="portrait">
            <div class="portrait-initials">${profile.initials}</div>
          </div>
          <div class="visual-note">${profile.title}<br>${profile.location}</div>
        </div>
      </section>

      <section class="section" id="work">
        <div class="section-heading">
          <h2>${profile.mode === "gaming" ? "Selected highlights" : "Selected work"}</h2>
          <span class="section-index">01 — 03</span>
        </div>
        <div class="project-grid">${projectCards}</div>
      </section>

      ${profile.mode === "gaming" ? `
      <section class="section gaming-socials" id="socials">
        <div class="section-heading">
          <h2>Stay in the lobby</h2>
          <span class="section-index">Live links</span>
        </div>
        <div class="live-strip">
          <div class="live-status"><span class="live-dot"></span> Current status</div>
          <div class="live-copy">Streaming when the queue starts</div>
          <a class="live-action" href="https://guns.lol/n3moz" target="_blank" rel="noopener">View all links ↗</a>
        </div>
        <div class="social-grid">
          <a class="social-card" href="https://guns.lol/n3moz" target="_blank" rel="noopener">
            <span class="social-platform">Twitch</span>
            <strong>Watch live</strong>
            <span class="social-arrow">↗</span>
          </a>
          <a class="social-card" href="https://guns.lol/n3moz" target="_blank" rel="noopener">
            <span class="social-platform">YouTube</span>
            <strong>Latest videos</strong>
            <span class="social-arrow">↗</span>
          </a>
          <a class="social-card" href="https://guns.lol/n3moz" target="_blank" rel="noopener">
            <span class="social-platform">Discord</span>
            <strong>Join the squad</strong>
            <span class="social-arrow">↗</span>
          </a>
          <a class="social-card" href="https://guns.lol/n3moz" target="_blank" rel="noopener">
            <span class="social-platform">Socials</span>
            <strong>All platforms</strong>
            <span class="social-arrow">↗</span>
          </a>
        </div>
      </section>
      ` : ""}

      <section class="section" id="about">
        <div class="section-heading">
          <h2>About</h2>
          <span class="section-index">02 — 03</span>
        </div>
        <div class="about-grid">
          <div>
            <div class="eyebrow">${profile.title}</div>
          </div>
          <div>
            <p>${profile.about}</p>
            <p>${profile.detail}</p>
            <div class="about-detail">
              <div class="detail-block"><span>Location</span>${profile.location}</div>
              <div class="detail-block"><span>Status</span>${profile.availability}</div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <h2>Let’s make<br>something matter.</h2>
        <a class="footer-link" href="mailto:${profile.email}">Start a conversation ↗</a>
      </footer>
    </main>`;
}

/* ---- Professional profile (/OwenBates/) : static HTML, progressive enhancement only ---- */
function initPro() {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const printBtn = document.getElementById("print-cv");
  if (printBtn) {
    printBtn.hidden = false;
    printBtn.addEventListener("click", () => window.print());
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = "Message from your CV";
      const body = `From: ${email}\n\n${message}`;
      window.location.href = `mailto:batesowen468@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Highlight the current section in the sticky nav
  const links = [...document.querySelectorAll(".pro-nav-links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const on = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => spy.observe(section));
  }

  // Gentle reveal on scroll (skipped for reduced motion; content is visible without JS)
  if (!reduce && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".pro-entry, .pro-skills section, .pro-section-head");
    root.classList.add("js-reveal");
    targets.forEach((el) => el.setAttribute("data-reveal", ""));
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); obs.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => reveal.observe(el));
  }
}

if (document.body.classList.contains("pro")) {
  initPro();
} else {
  const key = getProfileKey();
  if (key === "OwenBates") {
    // Legacy URL (/?profile=OwenBates): send to the real static page.
    const file = window.location.protocol === "file:" ? "OwenBates/index.html" : "OwenBates/";
    window.location.replace(new URL(file, window.location.href).href);
  } else if (key) {
    renderProfile(key);
  }
  // No key: the static landing page in index.html is already on screen.
}
