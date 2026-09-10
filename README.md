# Host your VALORANT portfolio on Render

The download contains `public/` (the complete website) and `render.yaml` (optional automatic configuration). All game images are included locally.

## Upload to GitHub

1. Extract the ZIP on your computer.
2. Create a new GitHub repository, for example `valorant-portfolio`. You can keep the repository private.
3. Upload the extracted `public` folder, `render.yaml`, and this README to the root of the repository. Upload the extracted files, not the ZIP itself. Commit them to `main`.

## Deploy on Render

1. In Render, choose **New → Static Site**, as shown in your dashboard.
2. Connect GitHub and select the repository you just created.
3. Set the following fields:

| Field | Value |
| --- | --- |
| Name | `valorant-collection-vault` (or any available name) |
| Branch | `main` |
| Root Directory | Leave blank |
| Build Command | `true` |
| Publish Directory | `public` |

4. Click **Create Static Site**. Render provides your `onrender.com` link after deployment.
5. To use your own domain, open the site's **Settings → Custom Domains** and follow Render's DNS instructions.

Alternatively, select **New → Blueprint**, connect the same repository, and use the included `render.yaml`.

## What is included

- `public/index.html`: page layout, displayed current rank and spending total.
- `public/style.css`: styling and responsive layouts.
- `public/app.js`: weapon category buttons and skin details.
- `public/data.js`: inventory, item prices, image paths and sources.
- `public/assets/`: weapon, buddy and player-card images.

To preview on your computer, open `public/index.html` in your browser. The page does not need a build step, database, server, or API key. Typography uses Google Fonts with local system-font fallbacks.

The current rank is displayed as Diamond 2; it does not automatically refresh from Tracker. The spending total reproduces the amount displayed in the provided Riot purchase history. It is not converted between currencies. Individual skins and battle passes are included in that spending total; bundle prices shown in VP are not added to it.

No account name, tag, profile link, original screenshots, credentials or Git history are included in this download. Render serves the portfolio publicly once deployed; choose a neutral repository, site and domain name if you want the link to remain anonymous.

All VALORANT images, artwork and game assets are copyright Riot Games, Inc. This is an independent collection portfolio. Asset data and imagery were retrieved through VALORANT-API; price references link to VALORANT Wiki.

Official Render documentation:
- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
