# State of Odisha — Govt Project Tracker

Static, no-build-step tracker for government-announced projects in Odisha.
Built for GitHub Pages at **stateofodisha.github.io/tracking**.

## Structure

```
index.html              landing page (5 switchable views)
assets/
  style.css             shared brand styles (light + dark theme)
  script.js             rendering, filtering, view switching, theme toggle
  data.js               ← project data lives here
  logo.svg / wheel.svg   brand marks used in header/footer/background
projects/
  project.html           generic tracking page — reads ?id= and pulls from data.js
  bbi-t3-original.html   the original attached T3 tracker page (full poster + export tools)
```

## Adding a project

Open `assets/data.js` and add an object to the `PROJECTS` array:

```js
{
  id: "unique-id",
  title: "Project name",
  category: "Infrastructure",
  announcedOn: "2025-01-15",           // YYYY-MM-DD
  status: { type: "stuck", label: "Days Pending" }, // type: stuck | progress | completed | review
  summary: "One or two sentence description.",
  location: "City, District",
  budget: "₹100 Cr",                    // optional
  hashtag: "#YourHashtag",              // optional
  timeline: [                           // optional
    { date: "Jan 15, 2025", text: "What happened", badge: "Announced" }
  ]
}
```

It will automatically show up on the landing page in every view, with "Days Passed"
computed live from `announcedOn`, and will link to `projects/project.html?id=unique-id`.

To give a project its own fully custom page (like the T3 example), set
`detailUrl: "projects/your-page.html"` on that project object instead — the card
will link there rather than to the generic template.

## Views

Cards (default), Large Cards, List, Gallery and Carousel — switchable from the
toolbar, with the choice remembered per browser (`localStorage`). Search and the
status filter apply across all views.

## Theme

Light/dark toggle in the header, remembered per browser and defaulting to the
visitor's OS preference on first visit.

## Deploying

Push this folder to a repo named `tracking` under the `stateofodisha` GitHub
org/user, enable GitHub Pages (Settings → Pages → deploy from `main` / root),
and it will be live at `stateofodisha.github.io/tracking`.
