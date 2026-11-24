# BIT-WOLF visual redesign

The redesign responds to the request for less blue, more engaging layouts, and considered motion. The original wolf artwork and company information are retained. Cyan is used sparingly; charcoal, soft white, and quiet neutral surfaces carry the layout.

## Reference direction

- [ByteDance](https://www.bytedance.com/): a clear, large hero statement and spacious corporate storytelling.
- [AuraTech](https://auratech-solutions.com/): service-led content, a path from capabilities to enquiry, and practical frequently asked questions.
- [NETSOL](https://netsoltech.com/): a prominent motion-led opening and a confident technology-focused presentation.

These are directional references. Their text, imagery, client claims, and code were not copied. The reference websites were accessed through web tools. Live browser inspection failed because the computer-use runtime could not start, so exact reference animations and the final visual appearance could not be checked interactively in this session.

## Implementation

- Original silver ribbon artwork rendered with Canvas 2D, without a 3D dependency or video download. Pointer movement provides gentle depth. A static SVG fallback remains visible without JavaScript or canvas support.
- The artwork is limited to roughly 30 frames per second, uses lower geometry detail on narrow layouts, and stops when outside the viewport or in a hidden tab.
- Global pause controls stop the canvas and continuous CSS motion. System reduced-motion settings disable decorative movement. Scroll reveals retain visible content rather than hiding important text behind animation.
- An accessible five-service accordion controls concept previews. Each service retains its dedicated detail page. FAQ uses native details/summary controls.
- The neutral visual system covers navigation, home, company pages, service details, portfolio, contact, and legal pages. Mobile layouts stack the service explorer and content grids.
- Manrope and Space Grotesk are self-hosted through next/font/local. Their SIL Open Font Licenses are included beside the font files.

## Verification

Production build and lint must pass before deployment. The existing local verification script covers page routes, custom 404, sitemap, robots, contact validation/security cases, and the development rate limiter without sending email. Browser verification of pointer behavior, keyboard interactions, mobile dimensions, and visual composition remains a manual follow-up because the browser runtime was unavailable.
