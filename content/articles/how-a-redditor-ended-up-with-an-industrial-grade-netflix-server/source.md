---
title: How a Redditor Ended Up With an Industrial-Grade Netflix Server
date: '2026-03-11T02:29:04.197Z'
sourceUrl: >-
  https://www.vice.com/en/article/how-a-redditor-ended-up-with-an-industrial-grade-netflix-server/
lang: source
---
A Redditor says they’ve managed to get a hold of an old Netflix server for free, and has posted a detailed online look at the once mysterious hardware. The devices were part of Netflix’s Open Connect Content Delivery Network (CDN), and can often be found embedded within major ISP networks to ensure your Netflix streams don’t suck.

Reddit user [PoisonWaffle3](https://www.reddit.com/user/PoisonWaffle3/) said the ISP he currently works for has been offloading old Netflix servers as they upgrade to more modern equipment. In a [Reddit thread](https://www.reddit.com/r/homelab/comments/ydollm/comment/ittgzsq/) titled “So I got a Netflix cache server…” he posted a photo of the server, which is bright Netflix red, and explained how he was curious about what’s inside the boxes given how little public information was available.

“All I could find online was overviews, installation/config guides for their proprietary software, etc.,” he said. “No specs, no clue what was inside the red box.”

Dave Temkin, Netflix’s former Vice President of Network Systems Infrastructure told Motherboard there’s nothing too mysterious about what the servers can do, though they significantly help improve video streaming by shortening overall content transit time.

“They’re just an Intel FreeBSD box,” he said. “We got Linux running on some of the generations of that box as well.”

Netflix’s Open Connect Content Delivery Network hardware caches popular Netflix content to reduce overall strain across broadband networks. Netflix lets major broadband ISPs [embed a CDN server on the ISP network](https://openconnect.netflix.com/Open-Connect-Overview.pdf) for free; the shorter transit time then helps improve video delivery, of benefit to broadband providers and Netflix alike.

It took all of three screws for PoisonWaffle3 to get inside the mysterious red unit, at which point users discovered a “fairly standard” Supermicro board, a single Xeon E5 2650L v2 processor, 64GB of DDR3 memory, and a 10 gigabit ethernet card. They also found 36 7.2TB 7200RPM drives and six 500GB Micron solid state drives, for a grand total of 262 terabytes of storage.

“They’re designed to have a huge pipeline from disk to NIC and not do much else,” Temkin, who was a key player in getting the Netflix CDN up and running, said. “The CPU is just enough to support that mission. It has a custom NIC but it’s actually nothing crazy.”

After replacing some noisy fans and one of the failed drives, PoisonWaffle3 said the device might get a second chance at life as a home network attached storage (NAS) device, though he [says he’s open to other ideas](https://www.reddit.com/r/homelab/comments/ydollm/comment/ittgzsq/).

Netflix’s CDN saw significant attention during the net neutrality wars, when major ISPs like Verizon and Comcast were accused of [intentionally slowing down Netflix streams](https://arstechnica.com/information-technology/2017/07/verizon-wireless-apparently-throttles-streaming-video-to-10mbps/) in a bid to force Netflix to [pay significantly more money](https://www.vice.com/en/article/xywyyn/netflix-makes-a-deal-with-verizon-plugging-itself-directly-into-the-isp) for more direct peering arrangements.

While Netflix’s net neutrality advocacy [waned as the streaming giant grew powerful](https://www.techdirt.com/2018/07/18/netflix-ceo-proclaims-death-net-neutrality-is-no-big-deal/), telecoms around the world continue to try and get Netflix to pay them significantly more money for no coherent reason, often by claiming the streaming giant gets a “[free ride](https://www.google.com/search?q=Netflix+%22free+ride%22+broadband&rlz=1C1CHBF_enUS909US909&sxsrf=ALiCzsYBGNHaQ9sslgDjSxrj1evtOmXrbg%3A1666818550904&ei=9qFZY-bnNpGN0PEP-4-56AY&ved=0ahUKEwjmuob95v76AhWRBjQIHftHDm0Q4dUDCBA&uact=5&oq=Netflix+%22free+ride%22+broadband&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAEyCAghEBYQHhAdOgoIABBHENYEELADOgUIABCABDoGCAAQFhAeOgUIABCGAzoFCCEQqwJKBAhNGAFKBAhBGABKBAhGGABQzQdYtyJglSNoAXABeACAAWCIAYAGkgECMTCYAQCgAQHIAQjAAQE&sclient=gws-wiz-serp)” on the Internet and should be paying them even more money for broadband infrastructure.

In South Korea, telecoms have gone so far as to [sue Netflix over](https://www.vice.com/en/article/wxdexb/isps-want-more-money-because-so-many-people-are-streaming-squid-game) *[Squid Game](https://www.vice.com/en/article/wxdexb/isps-want-more-money-because-so-many-people-are-streaming-squid-game)*, claiming the TV series was so popular it caused network strain they should be paid extra for—despite already being paid for bandwidth by consumers, the government, and Netflix.

The US and EU are [both considering](https://www.techdirt.com/2021/06/08/cnet-amplifies-fccs-carrs-attempt-to-force-big-tech-to-pay-big-telecom-no-reason/) new policies, backed by the telecom industry, that would effectively impose a new tax on technology companies simply for the privilege of transmitting data over big telecom’s networks. These “sender pays” proposals routinely rely on false claims that companies like Netflix “[don’t pay their fair share](https://www.theguardian.com/business/2022/sep/26/european-telecoms-chiefs-call-on-tech-firms-to-share-internet-network-costs)” of Internet infrastructure costs.

In a piece in the *[Financial Times](https://www.ft.com/content/22d376ec-cb4a-455d-882a-ff15edc1205f)* last week, Netflix executives recently tried to steer EU policymakers away from such a plan, stating the company has spent billions of dollars on Internet transit, infrastructure, cloud storage, and bandwidth, and provides its Open Connect CDN infrastructure to ISPs completely free of charge.

“We have 18,000 servers containing our content in 6,000 locations across 175 countries,” Netflix COO [Greg Peters](https://www.ft.com/stream/f8949c24-78bc-474b-aea2-a2517d323547) said. “So when consumers press play, the film or TV show is streamed from around the corner — reducing traffic and costs for operators around the world, while also ensuring the highest quality, no-lag experience for our members.”

[Several](https://www.vice.com/en/article/bjanw5/wireless-carriers-throttle-video-for-no-good-reason-researchers-find) different [studies](https://www.vice.com/en/article/438ngj/us-wireless-video-streaming-sucks-study-says) have highlighted how the U.S. consumer streaming video experience is significantly worse in the U.S. than in many developed countries, particularly on wireless connections. The fault generally belongs to telecom giants that underinvest in network capacity despite [billions in government subsidies](https://www.vice.com/en/article/ywkn4b/study-throwing-taxpayer-money-at-giant-isps-hasnt-fixed-americas-broadband-problem), or impose [strange throttling and other restrictions](https://www.vice.com/en/article/438ngj/us-wireless-video-streaming-sucks-study-says) that generate additional revenue, but can degrade video streaming quality further.
