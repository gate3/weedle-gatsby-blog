---
template: BlogPost
path: /webflow-memberships-hack
date: 2022-11-14T05:00:53.137Z
title: 'Get Current User In Webflow Memberships '
metaDescription: This article looks at how to get the current user on Webflow Memberships Beta
thumbnail: /assets/webflow-memberships.jpeg
---


Webflow released one of the most anticipated features in Beta, but the release has been met with mixed emotions. While the memberships feature has all the makings of a being really good, it almost totally unusable. 

In this tutorial, I will explore one of the most requested features of memberships, which is how do we identify the currently logged in user. We will be doing this using custom javascript code

## Prerequisites

> Please note that Cookies is not the best option for this scenario. The user can always clear cookies or even disable it completely, but for the sake of this tutorial only we will be using Cookies. The best option would be to use LocalStorage, a really good library can be found here https://github.com/mortzdk/localStorage. Everything else stays thesame, only the storage mechanism changes.

* We need to add CookiesJs (https://cdn.jsdelivr.net/npm/js-cookie) Used for storing the user info after getting it from webflow memberships
* We need to add id's for the fields we want to get data from

## Lets Dive-In

So webflow memberships allows you display auth and memberships pages to your users, for example:

* Register
* Login
* User Profile etc

Most of our code will be added to the user profile page where the user information is displayed. We are adding the code here because this is only displayed after the user is logged in so we can be sure their information will be available.

But before then lets add our only dependency, the CookieJs library. You should add this code to all pages where you need the currently logged in user or better yet just add to all pages.

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

The user information is fetched from webflow servers and then displayed on the page when its available. To get the user information we need to watch for when the data has been displayed on the page and then get the data. 

```javascript
// This bit is used to get the value from the input after it has been set
const { get, set } = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype, 'value'
);
function getInputOnChange (inp, callback) {
  Object.defineProperty(inp, 'value', {
    get() {
      return get.call(this);
    },
    set(newVal) {
      callback(newVal)
      return set.call(this, newVal);
    }
  });
}
```

Getting the data from this page could have been easier if the data is loaded along with the page, but since its only set later on after it has been fetched, we need to use the code above to get the value being set in the input.

```javascript
function setCookie (data) {
  Cookies.set('wf-user', JSON.stringify(data))
  if (isFromLoginPage){
      window.location.href = window.location.href;
  }
}

// For the purpose of this tutorial we are getting email and name alone
const emailInput = document.getElementById('wf-user-account-email');
const nameInput = document.getElementById('wf-user-account-name');

let nm = ''
let em = ''

getInputOnChange(emailInput, function (newVal) {
  em = newVal;
  if (nm && newVal) {
      setCookie({name: nm, email: newVal})
  }
});

getInputOnChange(nameInput, function (newVal) {
  nm = newVal;
  if (em && newVal) {
    setCookie({name: newVal, email: em})
  }
});
```

This next block of code is how we get the value for email and name using the function we wrote earlier. Here after getting one of the values we check if the other has been set, if it has been set we then proceed to add the information to a cookie. 

Why are we using a cookie you might ask. The cookie will help us persist the information permanently such that when the user closes the browser and comes back the data will still be available.

## The Complete Code

```javascript
<script>
  (() => {
   	$(document).ready(function () {
      const { get, set } = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype, 'value'
      );
      
      function getInputOnChange (inp, callback) {
        Object.defineProperty(inp, 'value', {
          get() {
            return get.call(this);
          },
          set(newVal) {
            callback(newVal)
            return set.call(this, newVal);
          }
        });
      }
      
      function setCookie (data) {
      	Cookies.set('wf-user', JSON.stringify(data))
        if (isFromLoginPage){
        	window.location.href = window.location.href;
        }
      }
	
      let em = ''
      let nm = ''
      const emailInput = document.getElementById('wf-user-account-email');
      const nameInput = document.getElementById('wf-user-account-name');
      
      getInputOnChange(emailInput, function (newVal) {
      	em = newVal;
        if (nm && newVal) {
          setCookie({name: nm, email: newVal})
        }
      });
      
      
      getInputOnChange(nameInput, function (newVal) {
	      nm = newVal;
        if (em && newVal) {
          setCookie({name: newVal, email: em})
        }
      });
    });
  })();
</script>
```
