import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Info } from "lucide-react"

// Festival type definition
type Festival = {
  name: string
  date: string
  hinduDate: string
  description: string
  significance: string
  major: boolean
}

// Festival data by year
const festivals2024: Festival[] = [
  {
    name: "Makar Sankranti",
    date: "January 15, 2024",
    hinduDate: "Paush Shukla Paksha",
    description: "Marks the transition of the Sun into Capricorn and the beginning of longer days.",
    significance: "Celebrates the harvest season and is considered auspicious for spiritual practices.",
    major: true,
  },
  {
    name: "Republic Day",
    date: "January 26, 2024",
    hinduDate: "Magh Krishna Paksha",
    description: "Celebrates the day when the Constitution of India came into effect.",
    significance: "National holiday celebrating India's democratic values.",
    major: false,
  },
  {
    name: "Vasant Panchami",
    date: "February 14, 2024",
    hinduDate: "Magh Shukla Panchami",
    description: "Festival dedicated to Saraswati, the goddess of knowledge, music, and arts.",
    significance: "Marks the beginning of spring season and preparation for Holi.",
    major: true,
  },
  {
    name: "Maha Shivaratri",
    date: "March 8, 2024",
    hinduDate: "Phalguna Krishna Chaturdashi",
    description: "The great night of Shiva, celebrated with night-long prayers and fasting.",
    significance: "One of the most important festivals for devotees of Lord Shiva.",
    major: true,
  },
  {
    name: "Holi",
    date: "March 25, 2024",
    hinduDate: "Phalguna Purnima",
    description: "Festival of colors celebrating the victory of good over evil.",
    significance: "Marks the end of winter and beginning of spring, symbolizing new beginnings.",
    major: true,
  },
  {
    name: "Ugadi/Gudi Padwa",
    date: "April 9, 2024",
    hinduDate: "Chaitra Shukla Pratipada",
    description: "New Year's Day for people from Andhra Pradesh, Telangana, Karnataka, and Maharashtra.",
    significance: "Marks the beginning of the Hindu lunar calendar.",
    major: true,
  },
  {
    name: "Ram Navami",
    date: "April 17, 2024",
    hinduDate: "Chaitra Shukla Navami",
    description: "Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.",
    significance: "Devotees observe fasting and engage in continuous recitation of the Ramayana.",
    major: true,
  },
  {
    name: "Hanuman Jayanti",
    date: "April 23, 2024",
    hinduDate: "Chaitra Purnima",
    description: "Celebrates the birth of Lord Hanuman.",
    significance: "Devotees worship Hanuman for strength, devotion, and protection.",
    major: true,
  },
  {
    name: "Akshaya Tritiya",
    date: "May 10, 2024",
    hinduDate: "Vaishakha Shukla Tritiya",
    description: "Considered one of the most auspicious days in the Hindu calendar.",
    significance: "Believed to bring good fortune and success to new ventures.",
    major: true,
  },
  {
    name: "Buddha Purnima",
    date: "May 23, 2024",
    hinduDate: "Vaishakha Purnima",
    description: "Celebrates the birth, enlightenment, and death of Gautama Buddha.",
    significance: "Important day for Buddhists worldwide.",
    major: false,
  },
  {
    name: "Ganga Dussehra",
    date: "June 17, 2024",
    hinduDate: "Jyeshtha Shukla Dashami",
    description: "Celebrates the descent of the Ganges River to Earth.",
    significance: "Devotees take a holy dip in the Ganges to cleanse their sins.",
    major: false,
  },
  {
    name: "Guru Purnima",
    date: "July 21, 2024",
    hinduDate: "Ashadha Purnima",
    description: "Day to honor spiritual and academic teachers.",
    significance: "Marks the birth anniversary of Sage Vyasa, who compiled the Vedas.",
    major: true,
  },
  {
    name: "Hariyali Teej",
    date: "August 7, 2024",
    hinduDate: "Shravana Shukla Tritiya",
    description: "Festival celebrated by women for marital bliss.",
    significance: "Women pray to Goddess Parvati for a happy married life.",
    major: false,
  },
  {
    name: "Raksha Bandhan",
    date: "August 19, 2024",
    hinduDate: "Shravana Purnima",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters tie a rakhi on their brothers' wrists, and brothers promise to protect them.",
    major: true,
  },
  {
    name: "Krishna Janmashtami",
    date: "August 26, 2024",
    hinduDate: "Bhadrapada Krishna Ashtami",
    description: "Celebrates the birth of Lord Krishna.",
    significance: "One of the most widely celebrated festivals in Hinduism.",
    major: true,
  },
  {
    name: "Ganesh Chaturthi",
    date: "September 7, 2024",
    hinduDate: "Bhadrapada Shukla Chaturthi",
    description: "Celebrates the birth of Lord Ganesha.",
    significance: "10-day festival ending with the immersion of Ganesha idols.",
    major: true,
  },
  {
    name: "Onam",
    date: "September 15, 2024",
    hinduDate: "Bhadrapada Shukla Dwadashi",
    description: "Harvest festival celebrated in Kerala.",
    significance: "Commemorates King Mahabali and Vamana avatar of Vishnu.",
    major: false,
  },
  {
    name: "Navratri Begins",
    date: "October 3, 2024",
    hinduDate: "Ashwin Shukla Pratipada",
    description: "Nine-night festival worshipping the divine feminine.",
    significance: "Devotees worship different forms of Goddess Durga.",
    major: true,
  },
  {
    name: "Dussehra/Vijayadashami",
    date: "October 12, 2024",
    hinduDate: "Ashwin Shukla Dashami",
    description: "Celebrates the victory of Lord Rama over Ravana.",
    significance: "Symbolizes the triumph of good over evil.",
    major: true,
  },
  {
    name: "Karwa Chauth",
    date: "October 20, 2024",
    hinduDate: "Kartik Krishna Chaturthi",
    description: "Fast observed by married women for the well-being of their husbands.",
    significance: "Women break their fast after sighting the moon.",
    major: false,
  },
  {
    name: "Dhanteras",
    date: "October 29, 2024",
    hinduDate: "Kartik Krishna Trayodashi",
    description: "First day of Diwali celebrations.",
    significance: "Considered auspicious for purchasing gold, silver, and new utensils.",
    major: true,
  },
  {
    name: "Diwali",
    date: "November 1, 2024",
    hinduDate: "Kartik Amavasya",
    description: "Festival of lights celebrating the return of Lord Rama to Ayodhya.",
    significance: "Symbolizes the victory of light over darkness and knowledge over ignorance.",
    major: true,
  },
  {
    name: "Bhai Dooj",
    date: "November 3, 2024",
    hinduDate: "Kartik Shukla Dwitiya",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters pray for their brothers' long life and prosperity.",
    major: false,
  },
  {
    name: "Tulsi Vivah",
    date: "November 13, 2024",
    hinduDate: "Kartik Shukla Ekadashi",
    description: "Ceremonial marriage of Tulsi plant with Lord Vishnu.",
    significance: "Marks the beginning of the Hindu wedding season.",
    major: false,
  },
  {
    name: "Gita Jayanti",
    date: "December 11, 2024",
    hinduDate: "Margashirsha Shukla Ekadashi",
    description: "Celebrates the day when Lord Krishna imparted the knowledge of Bhagavad Gita to Arjuna.",
    significance: "Devotees read and recite the Bhagavad Gita.",
    major: false,
  },
  {
    name: "Christmas",
    date: "December 25, 2024",
    hinduDate: "Pausha Krishna Paksha",
    description: "Celebrates the birth of Jesus Christ.",
    significance: "Important festival for Christians worldwide.",
    major: false,
  },
]

const festivals2025: Festival[] = [
  {
    name: "Makar Sankranti",
    date: "January 14, 2025",
    hinduDate: "Paush Shukla Paksha",
    description: "Marks the transition of the Sun into Capricorn and the beginning of longer days.",
    significance: "Celebrates the harvest season and is considered auspicious for spiritual practices.",
    major: true,
  },
  {
    name: "Republic Day",
    date: "January 26, 2025",
    hinduDate: "Magh Krishna Paksha",
    description: "Celebrates the day when the Constitution of India came into effect.",
    significance: "National holiday celebrating India's democratic values.",
    major: false,
  },
  {
    name: "Vasant Panchami",
    date: "February 3, 2025",
    hinduDate: "Magh Shukla Panchami",
    description: "Festival dedicated to Saraswati, the goddess of knowledge, music, and arts.",
    significance: "Marks the beginning of spring season and preparation for Holi.",
    major: true,
  },
  {
    name: "Maha Shivaratri",
    date: "February 26, 2025",
    hinduDate: "Phalguna Krishna Chaturdashi",
    description: "The great night of Shiva, celebrated with night-long prayers and fasting.",
    significance: "One of the most important festivals for devotees of Lord Shiva.",
    major: true,
  },
  {
    name: "Holi",
    date: "March 14, 2025",
    hinduDate: "Phalguna Purnima",
    description: "Festival of colors celebrating the victory of good over evil.",
    significance: "Marks the end of winter and beginning of spring, symbolizing new beginnings.",
    major: true,
  },
  {
    name: "Ugadi/Gudi Padwa",
    date: "March 29, 2025",
    hinduDate: "Chaitra Shukla Pratipada",
    description: "New Year's Day for people from Andhra Pradesh, Telangana, Karnataka, and Maharashtra.",
    significance: "Marks the beginning of the Hindu lunar calendar.",
    major: true,
  },
  {
    name: "Ram Navami",
    date: "April 6, 2025",
    hinduDate: "Chaitra Shukla Navami",
    description: "Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.",
    significance: "Devotees observe fasting and engage in continuous recitation of the Ramayana.",
    major: true,
  },
  {
    name: "Hanuman Jayanti",
    date: "April 12, 2025",
    hinduDate: "Chaitra Purnima",
    description: "Celebrates the birth of Lord Hanuman.",
    significance: "Devotees worship Hanuman for strength, devotion, and protection.",
    major: true,
  },
  {
    name: "Akshaya Tritiya",
    date: "April 30, 2025",
    hinduDate: "Vaishakha Shukla Tritiya",
    description: "Considered one of the most auspicious days in the Hindu calendar.",
    significance: "Believed to bring good fortune and success to new ventures.",
    major: true,
  },
  {
    name: "Buddha Purnima",
    date: "May 12, 2025",
    hinduDate: "Vaishakha Purnima",
    description: "Celebrates the birth, enlightenment, and death of Gautama Buddha.",
    significance: "Important day for Buddhists worldwide.",
    major: false,
  },
  {
    name: "Ganga Dussehra",
    date: "June 7, 2025",
    hinduDate: "Jyeshtha Shukla Dashami",
    description: "Celebrates the descent of the Ganges River to Earth.",
    significance: "Devotees take a holy dip in the Ganges to cleanse their sins.",
    major: false,
  },
  {
    name: "Guru Purnima",
    date: "July 11, 2025",
    hinduDate: "Ashadha Purnima",
    description: "Day to honor spiritual and academic teachers.",
    significance: "Marks the birth anniversary of Sage Vyasa, who compiled the Vedas.",
    major: true,
  },
  {
    name: "Raksha Bandhan",
    date: "August 9, 2025",
    hinduDate: "Shravana Purnima",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters tie a rakhi on their brothers' wrists, and brothers promise to protect them.",
    major: true,
  },
  {
    name: "Krishna Janmashtami",
    date: "August 16, 2025",
    hinduDate: "Bhadrapada Krishna Ashtami",
    description: "Celebrates the birth of Lord Krishna.",
    significance: "One of the most widely celebrated festivals in Hinduism.",
    major: true,
  },
  {
    name: "Ganesh Chaturthi",
    date: "August 28, 2025",
    hinduDate: "Bhadrapada Shukla Chaturthi",
    description: "Celebrates the birth of Lord Ganesha.",
    significance: "10-day festival ending with the immersion of Ganesha idols.",
    major: true,
  },
  {
    name: "Navratri Begins",
    date: "September 23, 2025",
    hinduDate: "Ashwin Shukla Pratipada",
    description: "Nine-night festival worshipping the divine feminine.",
    significance: "Devotees worship different forms of Goddess Durga.",
    major: true,
  },
  {
    name: "Dussehra/Vijayadashami",
    date: "October 2, 2025",
    hinduDate: "Ashwin Shukla Dashami",
    description: "Celebrates the victory of Lord Rama over Ravana.",
    significance: "Symbolizes the triumph of good over evil.",
    major: true,
  },
  {
    name: "Karwa Chauth",
    date: "October 10, 2025",
    hinduDate: "Kartik Krishna Chaturthi",
    description: "Fast observed by married women for the well-being of their husbands.",
    significance: "Women break their fast after sighting the moon.",
    major: false,
  },
  {
    name: "Dhanteras",
    date: "October 19, 2025",
    hinduDate: "Kartik Krishna Trayodashi",
    description: "First day of Diwali celebrations.",
    significance: "Considered auspicious for purchasing gold, silver, and new utensils.",
    major: true,
  },
  {
    name: "Diwali",
    date: "October 21, 2025",
    hinduDate: "Kartik Amavasya",
    description: "Festival of lights celebrating the return of Lord Rama to Ayodhya.",
    significance: "Symbolizes the victory of light over darkness and knowledge over ignorance.",
    major: true,
  },
  {
    name: "Bhai Dooj",
    date: "October 23, 2025",
    hinduDate: "Kartik Shukla Dwitiya",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters pray for their brothers' long life and prosperity.",
    major: false,
  },
  {
    name: "Tulsi Vivah",
    date: "November 3, 2025",
    hinduDate: "Kartik Shukla Ekadashi",
    description: "Ceremonial marriage of Tulsi plant with Lord Vishnu.",
    significance: "Marks the beginning of the Hindu wedding season.",
    major: false,
  },
  {
    name: "Gita Jayanti",
    date: "December 1, 2025",
    hinduDate: "Margashirsha Shukla Ekadashi",
    description: "Celebrates the day when Lord Krishna imparted the knowledge of Bhagavad Gita to Arjuna.",
    significance: "Devotees read and recite the Bhagavad Gita.",
    major: false,
  },
  {
    name: "Christmas",
    date: "December 25, 2025",
    hinduDate: "Pausha Krishna Paksha",
    description: "Celebrates the birth of Jesus Christ.",
    significance: "Important festival for Christians worldwide.",
    major: false,
  },
]

const festivals2026: Festival[] = [
  {
    name: "Makar Sankranti",
    date: "January 14, 2026",
    hinduDate: "Paush Shukla Paksha",
    description: "Marks the transition of the Sun into Capricorn and the beginning of longer days.",
    significance: "Celebrates the harvest season and is considered auspicious for spiritual practices.",
    major: true,
  },
  {
    name: "Republic Day",
    date: "January 26, 2026",
    hinduDate: "Magh Krishna Paksha",
    description: "Celebrates the day when the Constitution of India came into effect.",
    significance: "National holiday celebrating India's democratic values.",
    major: false,
  },
  {
    name: "Vasant Panchami",
    date: "January 23, 2026",
    hinduDate: "Magh Shukla Panchami",
    description: "Festival dedicated to Saraswati, the goddess of knowledge, music, and arts.",
    significance: "Marks the beginning of spring season and preparation for Holi.",
    major: true,
  },
  {
    name: "Maha Shivaratri",
    date: "February 15, 2026",
    hinduDate: "Phalguna Krishna Chaturdashi",
    description: "The great night of Shiva, celebrated with night-long prayers and fasting.",
    significance: "One of the most important festivals for devotees of Lord Shiva.",
    major: true,
  },
  {
    name: "Holi",
    date: "March 3, 2026",
    hinduDate: "Phalguna Purnima",
    description: "Festival of colors celebrating the victory of good over evil.",
    significance: "Marks the end of winter and beginning of spring, symbolizing new beginnings.",
    major: true,
  },
  {
    name: "Ugadi/Gudi Padwa",
    date: "March 18, 2026",
    hinduDate: "Chaitra Shukla Pratipada",
    description: "New Year's Day for people from Andhra Pradesh, Telangana, Karnataka, and Maharashtra.",
    significance: "Marks the beginning of the Hindu lunar calendar.",
    major: true,
  },
  {
    name: "Ram Navami",
    date: "March 26, 2026",
    hinduDate: "Chaitra Shukla Navami",
    description: "Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.",
    significance: "Devotees observe fasting and engage in continuous recitation of the Ramayana.",
    major: true,
  },
  {
    name: "Hanuman Jayanti",
    date: "April 1, 2026",
    hinduDate: "Chaitra Purnima",
    description: "Celebrates the birth of Lord Hanuman.",
    significance: "Devotees worship Hanuman for strength, devotion, and protection.",
    major: true,
  },
  {
    name: "Akshaya Tritiya",
    date: "April 19, 2026",
    hinduDate: "Vaishakha Shukla Tritiya",
    description: "Considered one of the most auspicious days in the Hindu calendar.",
    significance: "Believed to bring good fortune and success to new ventures.",
    major: true,
  },
  {
    name: "Buddha Purnima",
    date: "May 1, 2026",
    hinduDate: "Vaishakha Purnima",
    description: "Celebrates the birth, enlightenment, and death of Gautama Buddha.",
    significance: "Important day for Buddhists worldwide.",
    major: false,
  },
  {
    name: "Guru Purnima",
    date: "July 1, 2026",
    hinduDate: "Ashadha Purnima",
    description: "Day to honor spiritual and academic teachers.",
    significance: "Marks the birth anniversary of Sage Vyasa, who compiled the Vedas.",
    major: true,
  },
  {
    name: "Raksha Bandhan",
    date: "July 29, 2026",
    hinduDate: "Shravana Purnima",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters tie a rakhi on their brothers' wrists, and brothers promise to protect them.",
    major: true,
  },
  {
    name: "Krishna Janmashtami",
    date: "August 5, 2026",
    hinduDate: "Bhadrapada Krishna Ashtami",
    description: "Celebrates the birth of Lord Krishna.",
    significance: "One of the most widely celebrated festivals in Hinduism.",
    major: true,
  },
  {
    name: "Ganesh Chaturthi",
    date: "August 17, 2026",
    hinduDate: "Bhadrapada Shukla Chaturthi",
    description: "Celebrates the birth of Lord Ganesha.",
    significance: "10-day festival ending with the immersion of Ganesha idols.",
    major: true,
  },
  {
    name: "Navratri Begins",
    date: "September 12, 2026",
    hinduDate: "Ashwin Shukla Pratipada",
    description: "Nine-night festival worshipping the divine feminine.",
    significance: "Devotees worship different forms of Goddess Durga.",
    major: true,
  },
  {
    name: "Dussehra/Vijayadashami",
    date: "September 21, 2026",
    hinduDate: "Ashwin Shukla Dashami",
    description: "Celebrates the victory of Lord Rama over Ravana.",
    significance: "Symbolizes the triumph of good over evil.",
    major: true,
  },
  {
    name: "Karwa Chauth",
    date: "September 29, 2026",
    hinduDate: "Kartik Krishna Chaturthi",
    description: "Fast observed by married women for the well-being of their husbands.",
    significance: "Women break their fast after sighting the moon.",
    major: false,
  },
  {
    name: "Dhanteras",
    date: "October 8, 2026",
    hinduDate: "Kartik Krishna Trayodashi",
    description: "First day of Diwali celebrations.",
    significance: "Considered auspicious for purchasing gold, silver, and new utensils.",
    major: true,
  },
  {
    name: "Diwali",
    date: "October 10, 2026",
    hinduDate: "Kartik Amavasya",
    description: "Festival of lights celebrating the return of Lord Rama to Ayodhya.",
    significance: "Symbolizes the victory of light over darkness and knowledge over ignorance.",
    major: true,
  },
  {
    name: "Bhai Dooj",
    date: "October 12, 2026",
    hinduDate: "Kartik Shukla Dwitiya",
    description: "Celebrates the bond between brothers and sisters.",
    significance: "Sisters pray for their brothers' long life and prosperity.",
    major: false,
  },
  {
    name: "Tulsi Vivah",
    date: "October 23, 2026",
    hinduDate: "Kartik Shukla Ekadashi",
    description: "Ceremonial marriage of Tulsi plant with Lord Vishnu.",
    significance: "Marks the beginning of the Hindu wedding season.",
    major: false,
  },
  {
    name: "Gita Jayanti",
    date: "November 20, 2026",
    hinduDate: "Margashirsha Shukla Ekadashi",
    description: "Celebrates the day when Lord Krishna imparted the knowledge of Bhagavad Gita to Arjuna.",
    significance: "Devotees read and recite the Bhagavad Gita.",
    major: false,
  },
  {
    name: "Christmas",
    date: "December 25, 2026",
    hinduDate: "Pausha Krishna Paksha",
    description: "Celebrates the birth of Jesus Christ.",
    significance: "Important festival for Christians worldwide.",
    major: false,
  },
]

// Group festivals by month for each year
const groupFestivalsByMonth = (festivals: Festival[]) => {
  const months: Record<string, Festival[]> = {}

  festivals.forEach((festival) => {
    const month = festival.date.split(" ")[0]
    if (!months[month]) {
      months[month] = []
    }
    months[month].push(festival)
  })

  return months
}

const months2024 = groupFestivalsByMonth(festivals2024)
const months2025 = groupFestivalsByMonth(festivals2025)
const months2026 = groupFestivalsByMonth(festivals2026)

export default function FestivalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-800 text-center mb-8">Hindu Festivals Calendar</h1>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Explore the rich tapestry of Hindu festivals and celebrations across New Zealand for the years 2024-2026.
        </p>

        <Tabs defaultValue="2024" className="mb-12">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="2024">2024</TabsTrigger>
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
          </TabsList>

          {/* 2024 Festivals */}
          <TabsContent value="2024">
            <div className="space-y-8">
              {Object.entries(months2024).map(([month, festivals]) => (
                <Card key={month} className="border-orange-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-orange-100">
                    <CardTitle className="text-2xl text-orange-800 flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      {month} 2024
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {festivals.map((festival, index) => (
                        <div key={index} className="p-6 hover:bg-orange-50 transition-colors">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                              {festival.name}
                              {festival.major && (
                                <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                                  Major Festival
                                </Badge>
                              )}
                            </h3>
                            <div className="text-gray-600 font-medium">{festival.date}</div>
                          </div>
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">Hindu Date:</span> {festival.hinduDate}
                          </p>
                          <p className="text-gray-700 mb-3">{festival.description}</p>
                          <div className="flex items-start text-gray-600">
                            <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            <p>{festival.significance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 2025 Festivals */}
          <TabsContent value="2025">
            <div className="space-y-8">
              {Object.entries(months2025).map(([month, festivals]) => (
                <Card key={month} className="border-orange-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-orange-100">
                    <CardTitle className="text-2xl text-orange-800 flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      {month} 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {festivals.map((festival, index) => (
                        <div key={index} className="p-6 hover:bg-orange-50 transition-colors">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                              {festival.name}
                              {festival.major && (
                                <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                                  Major Festival
                                </Badge>
                              )}
                            </h3>
                            <div className="text-gray-600 font-medium">{festival.date}</div>
                          </div>
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">Hindu Date:</span> {festival.hinduDate}
                          </p>
                          <p className="text-gray-700 mb-3">{festival.description}</p>
                          <div className="flex items-start text-gray-600">
                            <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            <p>{festival.significance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 2026 Festivals */}
          <TabsContent value="2026">
            <div className="space-y-8">
              {Object.entries(months2026).map(([month, festivals]) => (
                <Card key={month} className="border-orange-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-orange-100">
                    <CardTitle className="text-2xl text-orange-800 flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      {month} 2026
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {festivals.map((festival, index) => (
                        <div key={index} className="p-6 hover:bg-orange-50 transition-colors">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                              {festival.name}
                              {festival.major && (
                                <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                                  Major Festival
                                </Badge>
                              )}
                            </h3>
                            <div className="text-gray-600 font-medium">{festival.date}</div>
                          </div>
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">Hindu Date:</span> {festival.hinduDate}
                          </p>
                          <p className="text-gray-700 mb-3">{festival.description}</p>
                          <div className="flex items-start text-gray-600">
                            <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            <p>{festival.significance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Understanding Hindu Festivals</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Hindu festivals are celebrated based on the Hindu lunar calendar, which is why their dates on the
              Gregorian calendar change each year. These festivals are deeply rooted in mythology, spirituality, and
              cultural traditions.
            </p>
            <p className="mb-4">
              Major festivals like Diwali, Holi, and Navratri are celebrated with great enthusiasm across New Zealand's
              Hindu community. They often involve special prayers, rituals, community gatherings, cultural performances,
              and traditional foods.
            </p>
            <p>
              The festival dates provided are based on the New Zealand time zone and may vary slightly from those
              observed in India or other countries. Local temple announcements should be consulted for precise timings
              of rituals and celebrations.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Note: Festival dates are approximate and may vary based on local customs and astronomical calculations.
            Please check with your local temple for exact dates and celebration details.
          </p>
        </div>
      </div>
    </div>
  )
}
