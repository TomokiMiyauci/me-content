---
title: Dynamically create short URL with Bitly and tweet
slug: bitly-short-url
description: "Introduce how to generate short URL dynamically with Bitly. Also, since tweets are an effective use of short URL, I will also explain how to dynamically tweet."
cover_image: ./hero.png
published_at: 2021-08-07T00:00:00.000Z
language: en
---

## Introduction

The official description of Bitly is as follows:

> Bitly is a link management platform that lets you harness the power of your
> links by shortening, sharing, managing and analyzing links to your content.

With Bitly, you can not only create short URL, but also track click data in real
time and assign your own domain to short URL. Bitly also has an public API that
allows you to dynamically generate short URL.

The most popular use of short URL is in tweets, where you want to keep the URL
as short as possible because of the 280-character limit.

In this article, I will show you how to use Bitly to dynamically create short
URL and dynamically tweet them.

## About Bitly

Bitly has a free plan that does not require credit card registration. With the
free plan, you can generate up to 1000 short URL per month.

For example, when I short the URL of this site, it generated the following URL:

[https://miyauchi.dev/](https://miyauchi.dev/) ->
[https://bit.ly/3jzAv7l](https://bit.ly/3jzAv7l)

With the free plan, you cannot change the `bit.ly` domain. However, even with
the free plan, you can customize the path part.

For example, the path `3jzAv7l` in the above short URL can be changed to any
path you want that is not already taken. This path customization can be
generated up to 50 times per month for the free plan.

See [Upgrade your links](https://bitly.com/pages/pricing) for the differences
between the other plans.

## Generate short URL dynamically with Bitly

To generate short URL dynamically, you will need an access token. The access
token can be generated if you are logged in, so please generate it from
[Authentication](https://dev.bitly.com/docs/getting-started/authentication/) or
the dashboard.

The endpoint of the short URL is as follows

[https://api-ssl.bitly.com/v4/shorten](https://api-ssl.bitly.com/v4/shorten)

Give an access token in the request header, and specify the URL to be short in
the body.

You can also test it using the example in `curl`.

```bash
curl \
-H 'Authorization: Bearer {TOKEN}' \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "long_url": "https://miyauchi.dev/"
}' \
https://api-ssl.bitly.com/v4/shorten
```

The response will look like this:

```json
{
  "created_at": "2021-08-07T06:45:15+0000",
  "id": "<id>",
  "link": "https://bit.ly/3jzAv7l",
  "custom_bitlinks": [],
  "long_url": "https://miyauchi.dev/",
  "archived": false,
  "tags": [],
  "deeplinks": [],
  "references": {
    "group": "https://api-ssl.bitly.com/v4/groups/<group>"
  }
}
```

The `link` in the JSON is the short URL, and the `long_url` is the original URL.
The short URL is one-to-one with the original URL. In other words, if you
request the same URL, the same short URL will be returned. Therefore, a request
to generate a short URL for the same URL will not consume 1000 credits per
month.

You can call the endpoint directly with `fetch` or something similar, but Bitly
has a client library that you can use.

### Bitly Client

You can use the Bitly client library to operate type-safely with TypeScript.

```bash
npm i bitly
```

> \[!WARNING] Using top level await syntax

```ts
import { BitlyClient, isBitlyErrResponse } from "bitly";
const bitly = new BitlyClient("<access-token>");

try {
  const bitlyLink = await bitly.shorten("https://miyauchi.dev/");
} catch (error) {
  if (isBitlyErrResponse(error)) {
    // bitly error
  } else if (error.isAxiosError) {
    // axios error
  }
}
```

The `shorten` method corresponds to the request to the endpoint we saw above.
The Bitly client seems to use `axios` for http requests. Therefore, you can use
the `isBitlyErrResponse` function in case of an error to identify whether it is
an error from Bitly or a network error.

Also, Promise's `resolve` is of type `BitlyLink`.

```ts
interface BitlyLink {
  created_at: string;
  id: string;
  link: string;
  custom_bitlinks: string[];
  long_url: string;
  archived: boolean;
  tags: string[];
  deeplinks: DeepLink[];
  references: References;
  title?: string;
  created_by?: string;
}
```

The `BitlyLink` type has an optional definition of `title` and `created_by` that
is not present in the /v4/shorten response.

The `title` is the HTML `title` tag of the URL destination. Also, `created_by`
is set to the account name.

Since the `shorten` method is equivalent to a request to /v4/shorten, the above
two keys cannot be retrieved. To get these as well, use the `info` method or
something similar.

```ts
await bitly.info("https://bit.ly/3jzAv7l"); // BitlyLink
```

The argument of the `info` method is the short URL or id created by Bitly.
Similarly, you can use the `clicks` method and the `referrers` method to get
metrics on short URL.

## Tweeting

Now that we have dynamically generated a short URL, let's tweet it dynamically.

For more information about tweeting, please refer to
[Tweeting with TypeScript](../tweet_typescript/en.md) that I wrote before.

```bash
npm i -D twitter-api-v2
```

```ts
import { BitlyClient } from "bitly";
import Twitter from "twitter-api-v2";

const bitly = new BitlyClient("<access-token>");
const client = new Twitter({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

const bitlyLink = await bitly.shorten("https://miyauchi.dev/");
const tweetContent = bitlyLink; // rendering tweet content
await client.v1.tweet(tweetContent);
```

In the example above, the short URL is tweeted as is.

Normally, you would include more information in the tweet than just the URL.

I recommend using a template engine to render your tweet content, but you should
be aware of the 280-character limit.

Some characters count as 1 or 2 characters, so You will need to handle the
overflow characters well.

I would like to write more about tweet character management in the future.
