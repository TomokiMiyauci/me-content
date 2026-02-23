---
title: Website Renewal (From SSG to RSC)
slug: site-renewal
description: 'We’ve revisited the architecture of this website and migrated from an SSG-based setup to one built around React Server Components. At the same time, the runtime has been moved from Node.js to Deno, and the way content is managed has been updated as well.'
cover_image: /posts/site_renewal/hero.png
published_at: 2026-01-01T06:33:25.123Z
language: en
---

## We’ve Renewed the Website

We have recently updated this website, focusing primarily on its internal structure.

Rather than changing the user-facing experience, this renewal targets the foundation of how the site is designed and operated.

Below is a brief overview of the main technical changes.

## From SSG to RSC

Previously, this site was built around Static Site Generation (SSG).

SSG provides a simple and robust architecture, but it requires everything at build time.

As a result:

* Code changes required a full rebuild
* Content additions and edits also required rebuilding
* Build times increased as the amount of content grew

By switching to React Server Components (RSC),

the site has been restructured as an application running on the server, rather than a collection of static files.

This change improves flexibility and:

* Reducing client-side JavaScript
* Separating responsibilities between rendering and data fetching

## From Node.js to Deno

As part of this renewal, the runtime change from Node.js to Deno.

Since its introduction, Deno has often been discussed as an alternative to Node.js, but it has not been widely adopted for production.

The current setup adopts the following approach:

* Running on Deno
* Without relying on a specific application framework
* Operating an RSC-based architecture

RSC is a technology that can be integrated without requiring a specific framework,

and demonstrating this point through actual operational examples is one objective of this change.

## Separating Source Code and Content

Content management has also been revised.

Previously, both source code and content were managed within the same repository.

While this works at a small scale, several issues became more apparent as content increased:

* Blurred responsibilities between code and content
* Reduced readability and navigability in the editor

With this renewal, content is now managed as an external source,

clearly separating it from the source code.

## Closing

This renewal repositions the site not as a static artifact,

but as an application intended for continuous operation and improvement.

We will continue refining the underlying platform as the site evolves.
