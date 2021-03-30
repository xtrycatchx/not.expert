---
title: FB Messenger Bots as Alternative Contact Tracing App
date: '2021-03-28'
spoiler: The post is about an alternative approach of contact tracing, by using FB’s messaging API, taking advantage of the following 
   (1) capability to help those who only have “free-data” subscription kababayans, and (2) most Filipinos have FB messenger apps installed. Its an alternative to the pen and paper tracing. The proposal is NOT trying to replace any of the good contact tracing apps. It would still be best if there's 1 SINGLE TRACING app strictly mandated by Philippine Government to used by everyone (visitors and establishments) like other countries do.
---

I know a lot of you folks already had seen and some even built very good contract tracing apps to help find and discover possibilities of exposure to nearby covid-positive people. The aim of these apps, I believe, is genuinely good.

## People's excuses
Despite those efforts spent on building, testing, and shipping these apps, the step to have them installed on individual’s phones is quite a challenge; People could say out that they are not able to use such apps for tons of reasons like — “I do not have data, etc.”

## The sad pen and paper tracing
So to rule out possible reasons of people, business owners often resolved to the approach of having the manual “lapis at papel”. Sad. It somehow solves the lack of mobile data problem, however, proposes a greater risk — the viral transmission from using the same pen one after the other. Of course, this can be addressed by using multiple pens, dipped into disinfectants like alcohol, or expose to UV light, etc. However, encoding those manual data later into its digital form is not only expensive but time-consuming. Not to mention, that the virus might have spread vastly and yet consolidating those data is still ongoing. Also, it is difficult to reach out or to broadcast updates to those who filled out those forms manually in the event of close contact/having had potential exposure.

## The proposal
Knowing these, I am proposing something that maybe can address these problems. My proposal would not replace those very good ones, but I am trying to suggest an alternative which in my opinion would be better than the current manual bolpen at papel” approach. Just trying to complement what's missing.
So most of us have Facebook messenger, yes? Let's take advantage of this fact. I propose to piggyback on Facebook’s messenger API.
Yes, you guess it right! It is bots and mini-apps.
Assuming these facts:
    <ul>
        <li>Visitor Juan has Facebook messenger app installed</li>
        <li>Visitor Juan doesn't have a mobile data subscription (meron lang sya free data lang)</li>
        <li>The place to visit has an FB page; for example Maria’s Pharmacy</li>
    </ul>

## The Use Case
The scenario is, using a phone’s camera, the visitor needs to scan a QR code. This QR code will launch the messenger app installed; redirecting to the Facebook Page messenger’s account - in this case, Maria’s Pharmacy.
Maria’s Pharmacy's bot will present 2 buttons/menus: Check-In and Check-Out. Visitor clicks on the Check-In and the bot will respond with something like “Welcome to Maria’s Pharmacy”  and the datetime of the visit. The visitor will click on the Check-out upon leaving the premise. The security guard on duty can check and verify if the visitor had properly checked-in and checked-out.

## Where would record go?
So what will happen when the visitor checks-in or checks-out a vicinity? A record will be added that visitor Juan had been to Maria’s Pharmacy on specific dates and times. This record can be sent to Local Government Units (LGUs) to assist them for tracing purposes. Best if these LGUs (or DOH) have existing APIs where these payloads can be posted to. I also wonder if staysafe.ph have such API to accept tracing record?

## Data Privacy
How about DPA? Yes, since data pulled from FB is kind of sensitive, the minimal permission for messaging API is good enough - it can pull out the public name of the person. And regarding the persistence of Juan’s particulars (name and visit datetimes), I’m not much familiar with the RA 10173, and I wonder if it is possible to keep the data for 2 months and have it purge after?

## It's actually cheap to implement
For the actual tracing for possible exposures, it is possible to broadcast messages to those who had possible close contact with a covid positive person. This will be done thru messenger API as well.  
It is not the best solution, but I think this is safer, better, and faster compared to pen and paper tracing. It is cheaper (close to free) as well knowing you can use the following:
<ul>
<li>Heroku free dyno or AWS Lambda or Google Cloud Functions - for the App callback hosting for messaging bots</li>
<li>Firebase or Dynamo DB - for persisting tracing records</li>
</ul>

## Yo Philippine Government, you interested?
Hmm, I even wondered if DOH’s FB page can do it instead of individual FB pages of those vicinities to be visited by Juans? 
Overall, I think it is still best to stay at home for everybody's safety if kaya.
<br/>
<br/>
Stay safe mga kaigsuonans/kababayans/everyone! Amping kanunay!

## See Proof-of-Concept here
See sample super rough crappy demo video below for the bot I played around over the weekend. 
If you need help, ping me - I can help you set it up (only after office hours or best on weekends, coz I still have a day job). Of course, you need to pay me - but the good news is, it's you who will decide on the “how much” part. But I believe anyone who has a tech team here can do it, the idea is straightforward - feel free to implement it.

[![FB Messenger Bots as Alternative Contact Tracing App](https://img.youtube.com/vi/NVibIeNF6qc/0.jpg)](https://www.youtube.com/watch?v=NVibIeNF6qc)
