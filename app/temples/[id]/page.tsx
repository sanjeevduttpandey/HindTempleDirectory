"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Calendar, Users, Heart, Share2, Navigation, Mail, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Complete mandir data with all mandirs
const templeData = {
  1: {
    id: 1,
    name: "Shri Sanatan Dharm Mandir",
    city: "Auckland",
    address: "98 Balmoral Road, Mount Eden, Auckland 1024",
    phone: "+64 9 630 5540",
    email: "info@aucklandmandir.org.nz",
    website: "https://www.aucklandmandir.org.nz",
    rating: 4.8,
    reviews: 120,
    images: [
      "/images/shri-sanatan-dharm-mandir-auckland.jpg",
      "/images/shri-sanatan-dharm-mandir-auckland.jpg",
      "/images/shri-sanatan-dharm-mandir-auckland.jpg",
    ],
    description:
      "One of the largest and most prominent Sanatan Mandir in New Zealand, Shri Sanatan Dharm Mandir has been serving the Auckland Sanatan community since 1992. The Mandir is dedicated to multiple deities and hosts regular religious ceremonies, cultural events, and community gatherings.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Multi-deity",
    established: 1992,
    featured: true,
    services: [
      "Daily Aarti",
      "Weekly Bhajan",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Thread Ceremonies",
      "Sanskrit Classes",
      "Cultural Programs",
      "Community Kitchen",
      "Religious Counseling",
    ],
    facilities: [
      "Parking Available",
      "Wheelchair Accessible",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Bookstore",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Diwali Celebration",
        date: "2024-11-12",
        time: "6:00 PM",
      },
      {
        title: "Weekly Bhajan",
        date: "2024-11-15",
        time: "7:00 PM",
      },
      {
        title: "Sanskrit Class",
        date: "2024-11-18",
        time: "10:00 AM",
      },
    ],
    history:
      "Established in 1992 by the Auckland Sanatan community, this Mandir has grown to become a central hub for Sanatan religious and cultural activities in New Zealand. The Mandir was built with donations from the community and continues to serve as a place of worship, learning, and cultural preservation.",
  },
  2: {
    id: 2,
    name: "Kurinchi Kumaran Mandir",
    city: "Wellington",
    address: "3 Batchelor Street, Newlands, Wellington 6037",
    phone: "+64 4 477 4346",
    email: "secretary@kktemplewellington.org",
    website: "https://www.kktemplewellington.org.nz/",
    rating: 4.7,
    reviews: 95,
    images: [
      "/images/kurinchi-kumaran-temple.jpg",
      "/images/kurinchi-kumaran-temple.jpg",
      "/images/kurinchi-kumaran-temple.jpg",
    ],
    description:
      "Kurinchi Kumaran Mandir is dedicated to Lord Murugan/Kumaran, serving the Wellington Sanatan community with devotion and cultural programs. The Mandir is known for its peaceful atmosphere and regular spiritual activities.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    featured: true,
    services: [
      "Daily Murugan Aarti",
      "Kavadi Ceremonies",
      "Thaipusam Celebrations",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Cultural Programs",
      "Youth Programs",
      "Community Kitchen",
      "Religious Counseling",
      "Spiritual Discourses",
      "Tamil Classes",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
      "Children's Play Area",
    ],
    upcomingEvents: [
      {
        title: "Thaipusam Celebration",
        date: "2024-11-20",
        time: "6:00 PM",
      },
      {
        title: "Weekly Murugan Bhajan",
        date: "2024-11-17",
        time: "7:00 PM",
      },
      {
        title: "Tamil Cultural Program",
        date: "2024-11-19",
        time: "10:00 AM",
      },
    ],
    history:
      "Established in 1995, Kurinchi Kumaran Mandir Wellington has been a spiritual haven for Murugan devotees in the capital city. The Mandir was founded by dedicated devotees who wanted to create a space for Tamil Sanatan worship and cultural preservation in Wellington.",
  },
  3: {
    id: 3,
    name: "Wellington Indian Association",
    city: "Wellington",
    address: "Level 2, 126 Vivian Street, Te Aro, Wellington 6011",
    phone: "+64 4 385 2276",
    email: "info@wia.org.nz",
    website: "https://www.wia.org.nz/",
    rating: 4.5,
    reviews: 78,
    images: [
      "/images/wellington-indian-association.jpg",
      "/images/wellington-indian-association.jpg",
      "/images/wellington-indian-association.jpg",
    ],
    description:
      "Wellington's premier Indian cultural organization, promoting Indian heritage, culture, and community activities. Established in 1950, WIA has been the cornerstone of Indian cultural preservation in Wellington.",
    timings: "Office Hours: 9:00 AM - 5:00 PM, Events: Variable",
    deity: "Cultural Center",
    established: 1950,
    featured: true,
    services: [
      "Cultural Events",
      "Festival Celebrations",
      "Dance Classes",
      "Music Classes",
      "Language Classes",
      "Community Support",
      "Youth Programs",
      "Senior Activities",
      "Cultural Workshops",
      "Heritage Preservation",
      "Community Networking",
      "Educational Programs",
    ],
    facilities: [
      "Event Hall",
      "Meeting Rooms",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Parking Available",
      "Air Conditioning",
      "Stage Area",
      "Storage Facilities",
      "Office Space",
      "Library Corner",
    ],
    upcomingEvents: [
      {
        title: "Diwali Cultural Night",
        date: "2024-11-16",
        time: "6:30 PM",
      },
      {
        title: "Bollywood Dance Workshop",
        date: "2024-11-23",
        time: "2:00 PM",
      },
      {
        title: "Hindi Language Class",
        date: "2024-11-25",
        time: "10:00 AM",
      },
    ],
    history:
      "Founded in 1950, the Wellington Indian Association is one of New Zealand's oldest Indian cultural organizations. It was established by early Indian immigrants to preserve and promote Indian culture, traditions, and community bonds in Wellington.",
  },
  4: {
    id: 4,
    name: "Shri Vishwa Vinayak Mandir",
    city: "Wellington",
    address: "23 Hanson Street, Newtown, Wellington 6021",
    phone: "+64 4 389 4397",
    email: "info@svwt.org.nz",
    website: "https://www.svwt.org.nz/",
    rating: 4.6,
    reviews: 112,
    images: [
      "/images/vishwa-vinayak-temple.jpg",
      "/images/vishwa-vinayak-temple.jpg",
      "/images/vishwa-vinayak-temple.jpg",
    ],
    description:
      "Shri Vishwa Vinayak Mandir is a peaceful sanctuary dedicated to Lord Ganesha, hosting regular pujas and cultural events in Wellington. The Mandir serves as a spiritual center for Ganesha devotees and the broader Sanatan community.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Ganesha",
    established: 1998,
    featured: false,
    services: [
      "Daily Ganesha Aarti",
      "Weekly Bhajan",
      "Ganesh Chaturthi Celebrations",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Housewarming Pujas",
      "Cultural Programs",
      "Youth Activities",
      "Community Kitchen",
      "Religious Counseling",
      "Spiritual Discourses",
    ],
    facilities: [
      "Parking Available",
      "Wheelchair Accessible",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
      "Meeting Rooms",
    ],
    upcomingEvents: [
      {
        title: "Ganesh Chaturthi Celebration",
        date: "2024-11-21",
        time: "6:00 PM",
      },
      {
        title: "Weekly Ganesha Bhajan",
        date: "2024-11-18",
        time: "7:00 PM",
      },
      {
        title: "Community Feast",
        date: "2024-11-24",
        time: "12:00 PM",
      },
    ],
    history:
      "Established in 1998, Shri Vishwa Vinayak Mandir was founded by devotees of Lord Ganesha who wanted to create a dedicated space for Ganesha worship in Wellington. The Mandir has grown to become an important spiritual center for the Sanatan community.",
  },
  5: {
    id: 5,
    name: "Sri Venkateswara Swamy Temple",
    city: "Wellington",
     address: "25 Waiu Street, Wainuiomata, Lower Hutt 5014",
    phone: "+64 4 389 0644",
    email: "info@svwt.org.nz",
    rating: 4.8,
    reviews: 134,
    images: ["/images/svt.avif", "/images/svt.avif", "/images/svt.avif"],
    description:
      "International Society for Krishna Consciousness Mandir promoting Krishna consciousness through spiritual practices and community service.",
    timings: "Mon - Fri | 07:00 PM to 08:30 PM And Sat - Sun | 09:30 AM - 11:30 AM & 07:00 PM to 08:30 PM",
    website: "https://www.svwt.org.nz/",
    deity: "Krishna",
    established: 1975,
    featured: true,
    services: [
      "Daily Mangal Aarti",
      "Kirtan and Bhajan",
      "Bhagavad Gita Classes",
      "Sunday Love Feast",
      "Festival Celebrations",
      "Spiritual Counseling",
      "Youth Programs",
      "Children's Classes",
      "Cooking Classes",
      "Book Distribution",
      "Meditation Sessions",
      "Cultural Programs",
    ],
    facilities: [
      "Mandir Hall",
      "Prasadam Hall",
      "Kitchen Facilities",
      "Bookstore",
      "Library",
      "Parking Available",
      "Audio/Visual Equipment",
      "Guest Accommodation",
      "Garden Area",
      "Meeting Rooms",
    ],
    upcomingEvents: [
      {
        title: "Sunday Love Feast",
        date: "2024-11-17",
        time: "5:00 PM",
      },
      {
        title: "Gita Jayanti Celebration",
        date: "2024-11-22",
        time: "6:00 PM",
      },
      {
        title: "Daily Kirtan",
        date: "2024-11-19",
        time: "7:00 PM",
      },
    ],
    history:
      "Sri Venkateswara Swamy Temple was established in 1975 as part of the global movement founded by A.C. Bhaktivedanta Swami Prabhupada. The Mandir has been spreading Krishna consciousness in Wellington for nearly five decades, serving both the Indian community and local New Zealanders interested in Vedic culture and spirituality.",
  },
  6: {
    id: 6,
    name: "BAPS Shri Swaminarayan Mandir",
    city: "Wellington",
    address: "15 Raroa Road, Kelburn, Wellington 6012",
    phone: "+64 4 475 8811",
    email: "wellington@baps.org",
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Wellington.aspx",
    rating: 4.9,
    reviews: 156,
    images: ["/images/baps-christchurch.jpg", "/images/baps-christchurch.jpg", "/images/baps-christchurch.jpg"],
    description:
      "BAPS Shri Swaminarayan Mandir is a magnificent Mandir serving the Wellington community with traditional Swaminarayan worship, cultural programs, and spiritual guidance. The Mandir follows the BAPS tradition and offers comprehensive spiritual and cultural activities.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2008,
    featured: true,
    services: [
      "Daily Swaminarayan Aarti",
      "Weekly Sabha",
      "Festival Celebrations",
      "Youth Programs (BAPS Youth)",
      "Children's Activities",
      "Cultural Programs",
      "Spiritual Discourses",
      "Community Service",
      "Educational Classes",
      "Wedding Ceremonies",
      "Religious Counseling",
      "Meditation Sessions",
    ],
    facilities: [
      "Prayer Hall",
      "Assembly Hall",
      "Kitchen Facilities",
      "Library",
      "Parking Available",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
      "Meeting Rooms",
      "Children's Area",
    ],
    upcomingEvents: [
      {
        title: "Weekly Sabha",
        date: "2024-11-17",
        time: "6:00 PM",
      },
      {
        title: "Diwali Celebration",
        date: "2024-11-12",
        time: "6:30 PM",
      },
      {
        title: "Youth Program",
        date: "2024-11-19",
        time: "7:00 PM",
      },
    ],
    history:
      "BAPS Shri Swaminarayan Mandir Wellington was established in 2008 as part of the global BAPS organization. The Mandir serves the Swaminarayan community in Wellington and promotes the teachings of Bhagwan Swaminarayan through spiritual activities, cultural programs, and community service.",
  },
  7: {
    id: 7,
    name: "Sanatan Mandir Society of Canterbury",
    city: "Christchurch",
    address: "20 Ombersley Terrace, Opawa, Christchurch 8023",
    phone: "+64 3 332 1952",
    email: "info@hindutemple.org.nz",
    website: "https://www.hindutemple.org.nz/",
    rating: 4.8,
    reviews: 92,
    images: [
      "/images/hindu-temple-society-canterbury.jpg",
      "/images/hindu-temple-society-canterbury.jpg",
      "/images/hindu-temple-society-canterbury.jpg",
    ],
    description:
      "The main Sanatan Mandir in Christchurch, serving the Canterbury region with traditional worship and cultural programs. This Mandir has been a cornerstone of the Sanatan community in the South Island.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Multi-deity",
    established: 2010,
    featured: true,
    services: [
      "Daily Aarti",
      "Weekly Bhajan",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Cultural Programs",
      "Youth Activities",
      "Community Kitchen",
      "Religious Counseling",
      "Spiritual Discourses",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
      "Meeting Rooms",
    ],
    upcomingEvents: [
      {
        title: "Diwali Celebration",
        date: "2024-11-14",
        time: "6:00 PM",
      },
      {
        title: "Weekly Bhajan",
        date: "2024-11-16",
        time: "7:00 PM",
      },
      {
        title: "Community Feast",
        date: "2024-11-20",
        time: "12:00 PM",
      },
    ],
    history:
      "Established in 2010, the Sanatan Mandir Society of Canterbury has served as the main Sanatan Mandir for the Christchurch and Canterbury region. The Mandir was built with community support and continues to be a vital center for Sanatan worship and cultural activities in the South Island.",
  },
  8: {
    id: 8,
    name: "Hamilton Shiva Mandir",
    city: "Hamilton",
    address: "12 Temple View Road, Hillcrest, Hamilton 3216",
    phone: "+64 7 855 4200",
    email: "info@hamiltonshivatemple.org.nz",
    website: "https://www.hamiltonshivatemple.org.nz/",
    rating: 4.7,
    reviews: 89,
    images: [
      "/images/hamilton-shiva-temple.jpg",
      "/images/hamilton-shiva-temple.jpg",
      "/images/hamilton-shiva-temple.jpg",
    ],
    description:
      "Hamilton Shiva Mandir is dedicated to Lord Shiva and serves the Waikato region with traditional worship and cultural programs. The Mandir is known for its peaceful atmosphere and strong community involvement.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Shiva",
    established: 2005,
    featured: false,
    services: [
      "Daily Shiva Aarti",
      "Monday Special Worship",
      "Maha Shivaratri Celebrations",
      "Rudra Abhishek",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Cultural Programs",
      "Youth Activities",
      "Community Kitchen",
      "Religious Counseling",
      "Spiritual Discourses",
    ],
    facilities: [
      "Parking Available",
      "Wheelchair Accessible",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
      "Meeting Rooms",
      "Children's Area",
    ],
    upcomingEvents: [
      {
        title: "Maha Shivaratri",
        date: "2024-11-18",
        time: "6:00 PM",
      },
      {
        title: "Monday Shiva Worship",
        date: "2024-11-18",
        time: "7:00 PM",
      },
      {
        title: "Community Feast",
        date: "2024-11-21",
        time: "12:00 PM",
      },
    ],
    history:
      "Hamilton Shiva Mandir was established in 2005 to serve the Sanatan community in the Waikato region. The Mandir is dedicated to Lord Shiva and has grown to become an important spiritual center for devotees in Hamilton and surrounding areas.",
  },
  10: {
    id: 10,
    name: "Dunedin Sanatan Mandir",
    city: "Dunedin",
    address: "156 Great King Street, North Dunedin, Dunedin 9016",
    phone: "+64 3 474 0800",
    email: "info@dunedinhindutemple.org.nz",
    website: "https://www.dunedinhindutemple.org.nz/",
    rating: 4.6,
    reviews: 67,
    images: [
      "/images/dunedin-hindu-temple.jpg",
      "/images/dunedin-hindu-temple.jpg",
      "/images/dunedin-hindu-temple.jpg",
    ],
    description:
      "Dunedin Sanatan Mandir is the southernmost Sanatan Mandir in New Zealand, serving the Otago region with traditional worship and cultural programs. The Mandir is dedicated to Goddess Durga and provides a spiritual home for the Sanatan community in the South Island.",
    timings: "7:00 AM - 7:00 PM",
    deity: "Durga",
    established: 2008,
    featured: false,
    services: [
      "Daily Durga Aarti",
      "Navratri Celebrations",
      "Durga Puja",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Naming Ceremonies",
      "Cultural Programs",
      "Youth Activities",
      "Community Kitchen",
      "Religious Counseling",
      "Spiritual Discourses",
      "Educational Programs",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Audio/Visual Equipment",
      "Heating System",
      "Shoe Storage",
      "Restrooms",
      "Meeting Rooms",
      "Children's Area",
    ],
    upcomingEvents: [
      {
        title: "Navratri Festival",
        date: "2024-11-19",
        time: "6:00 PM",
      },
      {
        title: "Durga Puja",
        date: "2024-11-22",
        time: "7:00 PM",
      },
      {
        title: "Community Gathering",
        date: "2024-11-25",
        time: "12:00 PM",
      },
    ],
    history:
      "Dunedin Sanatan Mandir was established in 2008 and holds the distinction of being the southernmost Sanatan Mandir in New Zealand. The Mandir serves the Sanatan community in Dunedin and the broader Otago region, providing traditional worship and cultural activities.",
  },
  13: {
    id: 13,
    name: "Bharatiya Mandir",
    city: "Auckland",
    address: "252-254 Balmoral Road, Sandringham, Auckland 1024",
    phone: "+64 9 846 2677",
    email: "info@bharatiyamandir.org.nz",
    website: "https://www.bharatiyamandir.org.nz/",
    rating: 4.7,
    reviews: 105,
    images: [
      "/images/bharatiya-mandir-auckland.jpg",
      "/images/bharatiya-mandir-auckland.jpg",
      "/images/bharatiya-mandir-auckland.jpg",
    ],
    description:
      "One of Auckland's oldest Sanatan Mandir, serving the community with traditional worship and cultural programs since 1987. The Mandir is known for its authentic religious practices and strong community involvement.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Multi-deity",
    established: 1987,
    featured: true,
    services: [
      "Traditional Pujas",
      "Cultural Events",
      "Language Classes",
      "Youth Programs",
      "Community Services",
      "Festival Celebrations",
      "Wedding Ceremonies",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Library",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Meeting Rooms",
    ],
    upcomingEvents: [
      {
        title: "Diwali Celebration",
        date: "2024-11-13",
        time: "6:00 PM",
      },
      {
        title: "Cultural Program",
        date: "2024-11-18",
        time: "7:00 PM",
      },
    ],
    history:
      "Established in 1987, Bharatiya Mandir is one of Auckland's oldest Sanatan Mandir. It has been serving the community for over three decades, maintaining traditional Sanatan practices while adapting to the needs of the New Zealand Sanatan community.",
  },
  14: {
    id: 14,
    name: "Thiru Subramaniyar Aalayam",
    city: "Auckland",
    address: "69 Tidal Road, Mangere, Auckland 2022",
    phone: "+64 9 275 4500",
    email: "info@thirusubramaniyar.org.nz",
    website: "https://www.thirusubramaniyar.org.nz/",
    rating: 4.8,
    reviews: 98,
    images: [
      "/images/thiru-subramaniyar-aalayam.jpg",
      "/images/thiru-subramaniyar-aalayam.jpg",
      "/images/thiru-subramaniyar-aalayam.jpg",
    ],
    description:
      "A beautiful Mandir dedicated to Lord Murugan, serving the Tamil Sanatan community in Auckland with traditional South Indian worship and cultural programs.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    featured: false,
    services: [
      "Thaipusam Celebrations",
      "Tamil Cultural Programs",
      "Kavadi Ceremonies",
      "South Indian Rituals",
      "Language Classes",
      "Youth Programs",
      "Community Kitchen",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Thaipusam Festival",
        date: "2024-11-25",
        time: "6:00 AM",
      },
      {
        title: "Tamil Cultural Night",
        date: "2024-11-20",
        time: "7:00 PM",
      },
    ],
    history:
      "Established in 1995, Thiru Subramaniyar Aalayam has been serving the Tamil Sanatan community in Auckland. The Mandir is dedicated to Lord Murugan and follows traditional South Indian Mandir practices.",
  },
  15: {
    id: 15,
    name: "Auckland Sri Ganesh Mandir",
    city: "Auckland",
    address: "4 Dent Place, Papakura, Auckland",
    phone: "+64 9 298 4450",
    email: "info@aucklandsriganeshtemple.com",
    website: "https://www.aucklandsriganeshtemple.com/",
    rating: 4.9,
    reviews: 112,
    images: [
      "/images/auckland-sri-ganesh-temple.jpg",
      "/images/auckland-sri-ganesh-temple.jpg",
      "/images/auckland-sri-ganesh-temple.jpg",
    ],
    description:
      "Established in 2002, this Mandir is dedicated to Lord Ganesha and has been developing with the grace of Lord Ganesha. The Mandir serves the South Auckland community with devotion and cultural programs.",
    timings: "10:00 AM - 1:00 PM, 6:00 PM - 9:00 PM (Morning Arti at 11:30 AM, Evening Arti at 7:30 PM)",
    deity: "Ganesha",
    established: 2002,
    featured: true,
    services: [
      "Ganesh Chaturthi",
      "Daily Ganesha Aarti",
      "Cultural Programs",
      "Spiritual Discourses",
      "Community Events",
      "Wedding Ceremonies",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Ganesh Chaturthi",
        date: "2024-11-22",
        time: "6:00 PM",
      },
      {
        title: "Monthly Bhajan",
        date: "2024-11-19",
        time: "7:00 PM",
      },
    ],
    history:
      "Auckland Sri Ganesh Mandir was established in 2002 and has been growing with the blessings of Lord Ganesha. The Mandir serves the South Auckland Sanatan community and is known for its peaceful atmosphere and regular spiritual activities.",
  },
  16: {
    id: 16,
    name: "NZ Thirumurugan Mandir",
    city: "Auckland",
    address: "21 Killarney Street, Takanini, Auckland 2112",
    phone: "+64 9 296 2000",
    email: "info@nzthirumurugan.org.nz",
    website: "https://www.nzthirumurugan.org.nz/",
    rating: 4.7,
    reviews: 87,
    images: [
      "/images/nz-thirumurugan-temple.jpg",
      "/images/nz-thirumurugan-temple.jpg",
      "/images/nz-thirumurugan-temple.jpg",
    ],
    description:
      "A Mandir dedicated to Lord Murugan, offering traditional Tamil worship services and cultural programs for the Auckland Tamil community.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 2004,
    featured: false,
    services: [
      "Murugan Worship",
      "Tamil Cultural Events",
      "Youth Programs",
      "Community Services",
      "Festival Celebrations",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Murugan Festival",
        date: "2024-11-21",
        time: "6:00 PM",
      },
    ],
    history:
      "NZ Thirumurugan Mandir was established in 2004 to serve the Tamil Sanatan community in Auckland. The Mandir is dedicated to Lord Murugan and provides traditional Tamil worship and cultural activities.",
  },
  17: {
    id: 17,
    name: "ISSO - International Swaminarayan Satsang Organisation",
    city: "Auckland",
    address: "117 Ormiston Road, Flat Bush, Auckland 2016",
    phone: "+64 9 274 6354",
    email: "info@isso.org.nz",
    website: "https://isso.org.nz/",
    rating: 4.8,
    reviews: 95,
    images: [
      "/images/isso-auckland-temple.jpg",
      "/images/isso-auckland-temple.jpg",
      "/images/isso-auckland-temple.jpg",
    ],
    description:
      "A Swaminarayan Mandir serving the Auckland community with spiritual guidance and cultural activities following the ISSO tradition.",
    timings: "6:30 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2005,
    featured: false,
    services: [
      "Swaminarayan Worship",
      "Cultural Programs",
      "Youth Activities",
      "Spiritual Discourses",
      "Community Events",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Swaminarayan Jayanti",
        date: "2024-11-23",
        time: "6:00 PM",
      },
    ],
    history:
      "ISSO Auckland was established in 2005 as part of the International Swaminarayan Satsang Organisation. The Mandir serves the Swaminarayan community in Auckland with traditional worship and cultural programs.",
  },
  18: {
    id: 18,
    name: "BAPS Shri Swaminarayan Mandir, Avondale",
    city: "Auckland",
    address: "21 Fairlands Avenue, Avondale, Auckland 1026",
    phone: "+64 9 828 2277",
    email: "auckland@baps.org",
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Auckland.aspx",
    rating: 4.9,
    reviews: 124,
    images: [
      "/images/baps-auckland-avondale.jpg",
      "/images/baps-auckland-avondale.jpg",
      "/images/baps-auckland-avondale.jpg",
    ],
    description:
      "A magnificent Swaminarayan Mandir in Avondale serving the Auckland community with traditional worship and cultural programs following the BAPS tradition.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2007,
    featured: true,
    services: [
      "Swaminarayan Worship",
      "Youth Programs",
      "Cultural Activities",
      "Spiritual Discourses",
      "Community Service",
      "Educational Programs",
    ],
    facilities: [
      "Prayer Hall",
      "Assembly Hall",
      "Kitchen Facilities",
      "Library",
      "Parking Available",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
      "Garden Area",
    ],
    upcomingEvents: [
      {
        title: "Weekly Sabha",
        date: "2024-11-17",
        time: "6:00 PM",
      },
      {
        title: "Diwali Celebration",
        date: "2024-11-12",
        time: "6:30 PM",
      },
    ],
    history:
      "BAPS Shri Swaminarayan Mandir Avondale was established in 2007 as part of the global BAPS organization. The Mandir serves the Swaminarayan community in Auckland and promotes traditional Sanatan values and culture.",
  },
  19: {
    id: 19,
    name: "Shirdi Sai Baba Mandir",
    city: "Auckland",
    address: "12 Princes Street, Onehunga, Auckland 1061",
    phone: "+64 9 636 5400",
    email: "info@saibabatemple.org.nz",
    website: "https://www.saibabatemple.org.nz/",
    rating: 4.7,
    reviews: 89,
    images: [
      "/images/shirdi-sai-baba-temple-auckland.jpg",
      "/images/shirdi-sai-baba-temple-auckland.jpg",
      "/images/shirdi-sai-baba-temple-auckland.jpg",
    ],
    description:
      "A Mandir dedicated to Shirdi Sai Baba, offering spiritual guidance and community service to devotees in Auckland.",
    timings: "7:00 AM - 8:00 PM",
    deity: "Sai Baba",
    established: 2003,
    featured: false,
    services: [
      "Sai Bhajans",
      "Thursday Special Worship",
      "Community Service",
      "Spiritual Discourses",
      "Charitable Activities",
      "Cultural Programs",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Sai Baba Jayanti",
        date: "2024-11-24",
        time: "6:00 PM",
      },
    ],
    history:
      "Shirdi Sai Baba Mandir Auckland was established in 2003 by devotees of Shirdi Sai Baba. The Mandir serves the Sai devotee community in Auckland with regular worship and community service activities.",
  },
  20: {
    id: 20,
    name: "Sanatan Dharam Hanuman Mandir",
    city: "Auckland",
    address: "159 Stoddard Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 629 4354",
    email: "info@hanumanmandir.org.nz",
    website: "https://www.hanumanmandir.org.nz/",
    rating: 4.6,
    reviews: 76,
    images: [
      "/images/sanatan-dharam-hanuman-mandir.jpg",
      "/images/sanatan-dharam-hanuman-mandir.jpg",
      "/images/sanatan-dharam-hanuman-mandir.jpg",
    ],
    description:
      "A Mandir dedicated to Lord Hanuman, offering traditional worship and spiritual activities for the Auckland Sanatan community.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Hanuman",
    established: 2000,
    featured: false,
    services: [
      "Hanuman Chalisa",
      "Tuesday Special Worship",
      "Sundarkand Path",
      "Cultural Programs",
      "Community Services",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Hanuman Jayanti",
        date: "2024-11-26",
        time: "6:00 PM",
      },
    ],
    history:
      "Sanatan Dharam Hanuman Mandir was established in 2000 and is dedicated to Lord Hanuman. The Mandir serves the Auckland Sanatan community with traditional Hanuman worship and spiritual activities.",
  },
  21: {
    id: 21,
    name: "Shri Ram Mandir",
    city: "Auckland",
    address: "11 Brick Street, Henderson, Auckland 0612",
    phone: "+64 9 836 6291",
    email: "info@rammandir.org.nz",
    website: "https://www.rammandir.org.nz/",
    rating: 4.7,
    reviews: 82,
    images: [
      "/images/shri-ram-mandir-henderson.jpg",
      "/images/shri-ram-mandir-henderson.jpg",
      "/images/shri-ram-mandir-henderson.jpg",
    ],
    description:
      "A Mandir dedicated to Lord Ram, serving the West Auckland community with traditional worship and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Rama",
    established: 2001,
    featured: false,
    services: [
      "Ram Navami Celebrations",
      "Ramcharitmanas Path",
      "Cultural Programs",
      "Spiritual Discourses",
      "Community Events",
      "Religious Education",
    ],
    facilities: [
      "Parking Available",
      "Community Hall",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Ram Navami",
        date: "2024-11-27",
        time: "6:00 PM",
      },
    ],
    history:
      "Shri Ram Mandir Henderson was established in 2001 to serve the West Auckland Sanatan community. The Mandir is dedicated to Lord Ram and provides traditional worship and cultural activities.",
  },
  22: {
    id: 22,
    name: "AIAI - Aotearoa Indian Association Incorporated",
    city: "Auckland",
    address: "57 Oakdale Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 620 9509",
    email: "info@aiai.org.nz",
    website: "https://aiai.org.nz/",
    rating: 4.5,
    reviews: 68,
    images: [
      "/images/aiai-cultural-center.jpg",
      "/images/aiai-cultural-center.jpg",
      "/images/aiai-cultural-center.jpg",
    ],
    description:
      "A cultural center promoting Indian heritage and community activities in Auckland, serving as a hub for cultural preservation and community engagement.",
    timings: "9:00 AM - 6:00 PM",
    deity: "Cultural Center",
    established: 1995,
    featured: false,
    services: [
      "Cultural Events",
      "Community Support",
      "Educational Programs",
      "Festival Celebrations",
      "Youth Activities",
      "Language Classes",
    ],
    facilities: [
      "Event Hall",
      "Meeting Rooms",
      "Kitchen Facilities",
      "Audio/Visual Equipment",
      "Parking Available",
      "Air Conditioning",
      "Office Space",
    ],
    upcomingEvents: [
      {
        title: "Cultural Festival",
        date: "2024-11-28",
        time: "6:00 PM",
      },
    ],
    history:
      "AIAI was established in 1995 to promote Indian culture and heritage in Auckland. The organization serves as a cultural center and community hub for the Indian community in New Zealand.",
  },
  23: {
    id: 23,
    name: "BAPS Shri Swaminarayan Mandir",
    city: "Christchurch",
    address: "19 Grahams Road, Papanui, Christchurch 8053",
    phone: "+64 3 352 5000",
    email: "christchurch@baps.org",
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Christchurch.aspx",
    rating: 4.9,
    reviews: 78,
    images: ["/images/baps-christchurch.jpg", "/images/baps-christchurch.jpg", "/images/baps-christchurch.jpg"],
    description:
      "A beautiful Swaminarayan Mandir serving the Christchurch community with traditional worship and spiritual guidance following the BAPS tradition.",
    timings: "7:00 AM - 8:00 PM (Daily Arti at 7:00 AM & 7:00 PM)",
    deity: "Swaminarayan",
    established: 2012,
    featured: true,
    services: [
      "Swaminarayan Worship",
      "Youth Programs",
      "Cultural Activities",
      "Spiritual Discourses",
      "Community Service",
      "Educational Programs",
    ],
    facilities: [
      "Prayer Hall",
      "Assembly Hall",
      "Kitchen Facilities",
      "Library",
      "Parking Available",
      "Audio/Visual Equipment",
      "Air Conditioning",
      "Shoe Storage",
      "Restrooms",
    ],
    upcomingEvents: [
      {
        title: "Weekly Sabha",
        date: "2024-11-17",
        time: "6:00 PM",
      },
    ],
    history:
      "BAPS Shri Swaminarayan Mandir Christchurch was established in 2012 as part of the global BAPS organization. The Mandir serves the Swaminarayan community in Christchurch and the Canterbury region.",
  },
  25: {
    id: 25,
    name: "ISKCON Christchurch",
    city: "Christchurch",
    address: "83 Bealey Avenue, Christchurch Central, Christchurch 8013",
    phone: "+64 3 366 7699",
    email: "christchurch@iskcon.org.nz",
    website: "https://harekrishnachristchurch.co.nz/",
    rating: 4.8,
    reviews: 72,
    images: ["/images/iskcon-christchurch.jpg", "/images/iskcon-christchurch.jpg", "/images/iskcon-christchurch.jpg"],
    description:
      "International Society for Krishna Consciousness Mandir promoting Krishna consciousness through spiritual practices and community service in Christchurch.",
    timings: "5:00 AM - 8:30 PM",
    deity: "Krishna",
    established: 1980,
    featured: true,
    services: [
      "Krishna Bhajan",
      "Bhagavad Gita Classes",
      "Prasadam Distribution",
      "Spiritual Festivals",
      "Youth Programs",
      "Community Service",
    ],
    facilities: [
      "Mandir Hall",
      "Prasadam Hall",
      "Kitchen Facilities",
      "Bookstore",
      "Library",
      "Parking Available",
      "Audio/Visual Equipment",
      "Garden Area",
    ],
    upcomingEvents: [
      {
        title: "Sunday Love Feast",
        date: "2024-11-17",
        time: "5:00 PM",
      },
    ],
    history:
      "ISKCON Christchurch was established in 1980 as part of the global ISKCON movement. The Mandir has been serving the Christchurch community for over four decades, promoting Krishna consciousness and Vedic culture.",
  },
}

export default function TempleDetailPage() {
  const params = useParams()
  const templeId = Number.parseInt(params.id as string)
  const temple = templeData[templeId as keyof typeof templeData]

  if (!temple) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mandir Not Found</h2>
            <p className="text-gray-600 mb-6">The Mandir you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/temples">Browse All Mandirs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/temples" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Mandir Details</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src={temple.images[0] || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
                {temple.featured && <Badge className="absolute top-4 left-4 bg-orange-600">Featured Mandir</Badge>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {temple.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${temple.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mandir Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{temple.name}</h1>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{temple.rating}</span>
                    <span className="text-gray-500 ml-1">({temple.reviews} reviews)</span>
                  </div>
                  <Badge variant="secondary">{temple.deity}</Badge>
                  <span className="text-sm text-gray-500">Est. {temple.established}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{temple.description}</p>
              </div>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">{temple.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">{temple.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">{temple.timings}</span>
                  </div>
                  {temple.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm">{temple.email}</span>
                    </div>
                  )}
                  {temple.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400 mr-3" />
                      <a
                        href={temple.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href={`https://maps.google.com/?q=${encodeURIComponent(temple.address)}`} target="_blank">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`tel:${temple.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Mandir
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                  <CardDescription>Religious and cultural services available at this Mandir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {temple.services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Facilities & Amenities</CardTitle>
                  <CardDescription>Available facilities and accessibility features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {temple.facilities.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* History */}
              <Card>
                <CardHeader>
                  <CardTitle>History & Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{temple.history}</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {temple.upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString("en-NZ", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {event.time}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/events">View All Events</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    Join Mandir Community
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Event Space
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    Make Donation
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address</Label>
                    <p className="text-sm text-gray-600">{temple.address}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    <p className="text-sm text-gray-600">{temple.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Hours</Label>
                    <p className="text-sm text-gray-600">{temple.timings}</p>
                  </div>
                  {temple.email && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      <p className="text-sm text-gray-600">{temple.email}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}