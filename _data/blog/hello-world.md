---
template: BlogPost
path: /webflow-memberships-hack
date: 2022-11-14T05:00:53.137Z
title: 'Get Current User In Webflow Memberships '
metaDescription: This article looks at how to get the current user on Webflow Memberships Beta
thumbnail: /assets/webflow-memberships.jpeg
---
Webflow released one of the most anticipated features in Beta, but the release has been met with missed emotions. While the memberships feature has all the makings of a being really good, it almost totally unusable. 

In this tutorial, I will explore one of the most requested features of memberships, which is how do we identify the currently logged in user. We will be doing this using custom javascript code



## Tools Used

* CookiesJs (https://cdn.jsdelivr.net/npm/js-cookie) Used for storing the user info after getting it from webflow memberships



## Lets Dive-In

So webflow memberships allows you display auth and memberships pages to your users, for example:

* Register
* Login
* User Profile etc

Most of our code will be added to the user profile page where the user information is displayed. We are adding the code here because this is only displayed after the user is logged in so we can be sure their information will be available. But before then lets add our only dependency, the CookieJs library. 

You should add this code to all pages where you need the currently logged in user or better yet just add to all pages.

```javascript
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.0-rc.1/dist/js.cookie.min.js"></script>
```

Then on the user profile page 

![](/assets/Xnip2022-11-13_22-00-44.jpg)

we add code for getting the current user.

```javascript
<script>
  (() => {
   	$(document).ready(function () {
      // Rest of the code goes here
    })
  })
<script>
```

The block of code above does nothing yet, its just the wrapper for the actual code and helps prevent our custom code from clashing with anything else on your site.

The user information is fetched from webflow servers and then displayed on the page when its available. Things could have been much easier if the information is available as soon as the page loads, but that would present a security issue. So the way we handle getting what we need is that we
