---
layout: post
title: "On AFNetworking"
author: mt
date: 2011-10-20
published: false
---

AFNetworking is a delightful networking library for iOS and Mac OS X. It's built on top of familiar Foundation network classes,  using `NSOperation` for scheduling and concurrency, and blocks for convenience and flexibility. 

What follows is an overview of the design principles and guiding ideas behind AFNetworking. After reading this, you should have a solid understanding of how you can integrate it into your project.

## A Solid Foundation

At the core of AFNetworking is `AFURLConnectionOperation`, whose sole purpose is to make asynchronous network requests. Each operation manages a single request, from start to finish.

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://example.com"]];
AFURLConnectionOperation *operation = [[[AFURLConnectionOperation alloc] initWithRequest:request] autorelease];
```

As the name implies, `AFURLConnectionOperation` communicates over an `NSURLConnection`. Also implied by its name, `AFURLConnectionOperation` is a subclass of `NSOperation`. In combination, what we get is something that can execute concurrently with other network operations, and--if the need arises--be cancelled at a moment's notice.

Streaming with `AFURLConnection` is as easy as hooking up an `NSInputStream` and / or `NSOutputStream`, and tracking the progress of a file upload or download is just a matter of setting a callback block. Otherwise, you could simply get all of  the response data when the operation finishes, with `setCompletionBlock:`.

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:8080/encode"]];

AFHTTPRequestOperation *operation = [[[AFHTTPRequestOperation alloc] initWithRequest:request] autorelease];
operation.inputStream = [NSInputStream inputStreamWithFileAtPath:[[NSBundle mainBundle] pathForResource:@"large-image" ofType:@"tiff"]];
operation.outputStream = [NSOutputStream outputStreamToMemory];
```

Because of its self-contained, single-purpose design, `AFURLConnectionOperation` is perfectly suited to be the foundation for the rest of AFNetworking. In fact, one could very well stop here and stick to the bare metal, so to speak. But if your app downloads images, or reads JSON or XML from a web API, AFNetworking has a lot more to offer.

## Consuming JSON, XML, Images, and Property Lists

One step up from `AFURLConnectionOperation` is `AFHTTPRequestOperation`, which is specifically geared towards communicating over HTTP and HTTPS. `AFHTTPRequestOperation` creates a distinction between successful and unsuccessful requests, where uccess or failure, is determined by whether the HTTP response status codes and MIME type are deemed acceptable.

However, what's most significant about `AFHTTPRequestOperation` are the subclasses built on top of it: `AFJSONRequestOperat ion`, `AFXMLRequestOperation`, `AFPropertyListRequestOperation`, and `AFImageRequestOperation`. Each of these subclasses caters to particular types of content, so network operations return JSON objects or images rather than raw NSData.

For example, `AFJSONRequestOperation` provides the class method `JSONRequestOperationWithRequest:success:failure`. The returned operation automatically checks for a JSON MIME type and a status code in the 2XX range, and if those check out, returns a JSON object parsed from the response data in a callback block.

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://gowalla.com/users/mattt.json"]];
AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
    NSLog(@"Name: %@ %@", [JSON valueForKeyPath:@"first_name"], [JSON valueForKeyPath:@"last_name"]);
} failure:nil];
```

JSON (using JSONKit, or NSJSONSerializer when available), XML (using `NSXMLParser`, or `NSXMLDocument` on OS X), Plist (deserializing directly into Foundation objects), and UIImage / NSImage--AFNetworking includes support for all of these out of the box, so you're ready for pretty much anything the web can throw at you.

## Interacting With Web Services

While we're on the subject of the web, let's talk about a typical iOS / Mac application: Chances are, if an application does any sort of networking, it's done interfacing with a particular web API. Perhaps even several. 

Enter `AFHTTPClient`. 

`AFHTTPClient` encapsulates API details, such as its base URL, authentication credentials, and common HTTP headers, like user-agent or API key. Using this information, `AFHTTPClient` constructs `NSMutableURLRequest` objects, which can be used in any manner of `AFHTTPRequestOperation`.

```
[[AFGowallaAPIClient sharedClient] getPath:@"/spots/9223" parameters:nil success:^(id response) {
    NSLog(@"Name: %@", [response valueForKeyPath:@"name"]);
    NSLog(@"Address: %@", [response valueForKeyPath:@"address.street_address"]);
} failure:nil];
```

### Magic When You Want It…

As if that weren't enough, `AFHTTPClient` can even automatically detect the correct kind of operation to use for a particular request. For example, a request with a `.json` extension would be use `AFJSONRequestOperation`, whereas a request with the `Accept` header set to `application/xml` would use `AFXMLRequestOperation`. (See the [`AFRestClientOperation` protocol](http://gowalla.github.com/AFNetworking/Protocols/AFHTTPClientOperation.html) for more details).

### …But Not When You Don't

Magic isn't for everyone all of the time. In the aforementioned case, all you would need to do is override `AFHTTPClient -requestWithMethod:path:parameters:`, and *poof*, like magic… the magic is gone!

## Insanely Fast, On-Demand Image Loading

The final piece of AFNetworking has to do with image loading. You met `AFImageRequestOperation` earlier, along with its `AFHTTPRequestOperation` brethren, but that was only part of the larger picture.

On iOS, AFNetworking adds category methods on `UIImageView`, which make asynchronous image loading ridiculously easy. Observe:

``` obj-c
[imageView setImageWithURL:imageURL];
```

Not only is that easy, but it's unbelievably fast. On a decent WiFi connection, table view cell images will load as fast as you scroll!

`AFImageRequestOperation` can even make 3G or EDGE connection feel downright snappy. Remember that part about being able to cancel an `AFURLConnectionOperation`? This turns out to be especially useful for image loading. As table view cells are recycled, for instance, setting a new image URL will cancel the previous request.

## Go Forth, And Network

Thus concludes our whirlwind tour of AFNetworking. Hopefully you'll have come away from this emboldened and excited to give AFNetworking a try.

Looking for a place to start? Check out the [README](https://github.com/gowalla/AFNetworking/blob/master/README.md) for some really useful code samples. AFNetworking also has some [great documentation](http://gowalla.github.com/AFNetworking/) (if I don't say so myself)

## Colophon 

AFNetworking was created by [Scott Raymond](http://github.com/sco/) and [Mattt Thompson](http://github.com/mattt/) during the development of Gowalla for iPhone 4.0. It's the culmination of months of work by the authors and collaboration with dozens of open source contributors.

AFNetworking was open-sourced in June of 2011, and of this writing, just 4 months later, reached 1000 watchers on GitHub.

If you'd like to contribute to AFNetworking, we would most certainly appreciate the help. Open an issue on GitHub, or if you feel so inclined, create a patch and submit a pull request. Also, if you are a a native non-English speaker, we'd love to have translations of documentation available in other languages.