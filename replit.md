# Job Search Dashboard — David Neher

## Overview

A static single-page dashboard for tracking job applications, interviews, contacts, and activities in the healthcare and technology sectors.

## Architecture

- **Type**: Static HTML site (no build system, no framework, no package manager)
- **Languages**: HTML5, CSS3 (embedded), Vanilla JavaScript (embedded)
- **Single file**: `index.html` contains all structure, styles, and logic

## Features

- Stats strip (Active, On Hold, Applied, Closed counts)
- Active Pipeline cards with stage, last action, and next steps
- Key Contacts table with filtering
- Recent Activity log

## Running Locally

The app is served via Python's built-in HTTP server:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

This is configured as the "Start application" workflow on port 5000.

## Deployment

Configured as a **static** deployment with `publicDir: "."` — Replit serves `index.html` directly from the project root.
