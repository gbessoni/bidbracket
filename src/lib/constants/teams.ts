import { Region } from "@/types";

export interface TeamSeed {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  region: Region;
  espnId: number;
  isFirstFour: boolean;
  record: string;
}

export function getTeamLogoUrl(espnId: number): string {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png`;
}

export const NCAA_TEAMS: TeamSeed[] = [
  // ===== EAST REGION =====
  { id: "duke", name: "Duke Blue Devils", shortName: "Duke", seed: 1, region: "East", espnId: 150, isFirstFour: false, record: "32-2" },
  { id: "uconn", name: "UConn Huskies", shortName: "UConn", seed: 2, region: "East", espnId: 41, isFirstFour: false, record: "29-5" },
  { id: "michigan-state", name: "Michigan State Spartans", shortName: "Michigan St.", seed: 3, region: "East", espnId: 127, isFirstFour: false, record: "25-7" },
  { id: "kansas", name: "Kansas Jayhawks", shortName: "Kansas", seed: 4, region: "East", espnId: 2305, isFirstFour: false, record: "23-10" },
  { id: "st-johns", name: "St. John's Red Storm", shortName: "St. John's", seed: 5, region: "East", espnId: 2599, isFirstFour: false, record: "28-6" },
  { id: "louisville", name: "Louisville Cardinals", shortName: "Louisville", seed: 6, region: "East", espnId: 97, isFirstFour: false, record: "23-10" },
  { id: "ucla", name: "UCLA Bruins", shortName: "UCLA", seed: 7, region: "East", espnId: 26, isFirstFour: false, record: "23-11" },
  { id: "ohio-state", name: "Ohio State Buckeyes", shortName: "Ohio State", seed: 8, region: "East", espnId: 194, isFirstFour: false, record: "21-12" },
  { id: "tcu", name: "TCU Horned Frogs", shortName: "TCU", seed: 9, region: "East", espnId: 2628, isFirstFour: false, record: "22-11" },
  { id: "ucf", name: "UCF Knights", shortName: "UCF", seed: 10, region: "East", espnId: 2116, isFirstFour: false, record: "21-11" },
  { id: "south-florida", name: "South Florida Bulls", shortName: "South Florida", seed: 11, region: "East", espnId: 58, isFirstFour: false, record: "25-8" },
  { id: "northern-iowa", name: "Northern Iowa Panthers", shortName: "Northern Iowa", seed: 12, region: "East", espnId: 2460, isFirstFour: false, record: "23-12" },
  { id: "cal-baptist", name: "California Baptist Lancers", shortName: "Cal Baptist", seed: 13, region: "East", espnId: 2856, isFirstFour: false, record: "25-8" },
  { id: "north-dakota-state", name: "North Dakota State Bison", shortName: "N. Dakota St.", seed: 14, region: "East", espnId: 2449, isFirstFour: false, record: "27-7" },
  { id: "furman", name: "Furman Paladins", shortName: "Furman", seed: 15, region: "East", espnId: 231, isFirstFour: false, record: "22-12" },
  { id: "siena", name: "Siena Saints", shortName: "Siena", seed: 16, region: "East", espnId: 2561, isFirstFour: false, record: "23-11" },

  // ===== WEST REGION =====
  { id: "arizona", name: "Arizona Wildcats", shortName: "Arizona", seed: 1, region: "West", espnId: 12, isFirstFour: false, record: "32-2" },
  { id: "purdue", name: "Purdue Boilermakers", shortName: "Purdue", seed: 2, region: "West", espnId: 2509, isFirstFour: false, record: "27-8" },
  { id: "gonzaga", name: "Gonzaga Bulldogs", shortName: "Gonzaga", seed: 3, region: "West", espnId: 2250, isFirstFour: false, record: "30-3" },
  { id: "arkansas", name: "Arkansas Razorbacks", shortName: "Arkansas", seed: 4, region: "West", espnId: 8, isFirstFour: false, record: "26-8" },
  { id: "wisconsin", name: "Wisconsin Badgers", shortName: "Wisconsin", seed: 5, region: "West", espnId: 275, isFirstFour: false, record: "24-10" },
  { id: "byu", name: "BYU Cougars", shortName: "BYU", seed: 6, region: "West", espnId: 252, isFirstFour: false, record: "23-11" },
  { id: "miami-fl", name: "Miami Hurricanes", shortName: "Miami (FL)", seed: 7, region: "West", espnId: 2390, isFirstFour: false, record: "25-8" },
  { id: "villanova", name: "Villanova Wildcats", shortName: "Villanova", seed: 8, region: "West", espnId: 222, isFirstFour: false, record: "24-8" },
  { id: "utah-state", name: "Utah State Aggies", shortName: "Utah State", seed: 9, region: "West", espnId: 328, isFirstFour: false, record: "28-6" },
  { id: "missouri", name: "Missouri Tigers", shortName: "Missouri", seed: 10, region: "West", espnId: 142, isFirstFour: false, record: "20-12" },
  { id: "texas", name: "Texas Longhorns", shortName: "Texas", seed: 11, region: "West", espnId: 251, isFirstFour: true, record: "18-14" },
  { id: "nc-state", name: "NC State Wolfpack", shortName: "NC State", seed: 11, region: "West", espnId: 152, isFirstFour: true, record: "20-13" },
  { id: "high-point", name: "High Point Panthers", shortName: "High Point", seed: 12, region: "West", espnId: 2272, isFirstFour: false, record: "30-4" },
  { id: "hawaii", name: "Hawai'i Rainbow Warriors", shortName: "Hawai'i", seed: 13, region: "West", espnId: 62, isFirstFour: false, record: "24-8" },
  { id: "kennesaw-state", name: "Kennesaw State Owls", shortName: "Kennesaw St.", seed: 14, region: "West", espnId: 338, isFirstFour: false, record: "21-13" },
  { id: "queens", name: "Queens Royals", shortName: "Queens", seed: 15, region: "West", espnId: 2511, isFirstFour: false, record: "21-13" },
  { id: "liu", name: "LIU Sharks", shortName: "LIU", seed: 16, region: "West", espnId: 112358, isFirstFour: false, record: "24-10" },

  // ===== SOUTH REGION =====
  { id: "florida", name: "Florida Gators", shortName: "Florida", seed: 1, region: "South", espnId: 57, isFirstFour: false, record: "26-7" },
  { id: "houston", name: "Houston Cougars", shortName: "Houston", seed: 2, region: "South", espnId: 248, isFirstFour: false, record: "28-6" },
  { id: "illinois", name: "Illinois Fighting Illini", shortName: "Illinois", seed: 3, region: "South", espnId: 356, isFirstFour: false, record: "24-8" },
  { id: "nebraska", name: "Nebraska Cornhuskers", shortName: "Nebraska", seed: 4, region: "South", espnId: 158, isFirstFour: false, record: "26-6" },
  { id: "vanderbilt", name: "Vanderbilt Commodores", shortName: "Vanderbilt", seed: 5, region: "South", espnId: 238, isFirstFour: false, record: "26-8" },
  { id: "north-carolina", name: "North Carolina Tar Heels", shortName: "UNC", seed: 6, region: "South", espnId: 153, isFirstFour: false, record: "24-8" },
  { id: "st-marys", name: "Saint Mary's Gaels", shortName: "St. Mary's", seed: 7, region: "South", espnId: 2608, isFirstFour: false, record: "27-5" },
  { id: "clemson", name: "Clemson Tigers", shortName: "Clemson", seed: 8, region: "South", espnId: 228, isFirstFour: false, record: "24-10" },
  { id: "iowa", name: "Iowa Hawkeyes", shortName: "Iowa", seed: 9, region: "South", espnId: 2294, isFirstFour: false, record: "21-12" },
  { id: "texas-am", name: "Texas A&M Aggies", shortName: "Texas A&M", seed: 10, region: "South", espnId: 245, isFirstFour: false, record: "21-11" },
  { id: "vcu", name: "VCU Rams", shortName: "VCU", seed: 11, region: "South", espnId: 2670, isFirstFour: false, record: "27-7" },
  { id: "mcneese", name: "McNeese Cowboys", shortName: "McNeese", seed: 12, region: "South", espnId: 2377, isFirstFour: false, record: "28-5" },
  { id: "troy", name: "Troy Trojans", shortName: "Troy", seed: 13, region: "South", espnId: 2653, isFirstFour: false, record: "22-11" },
  { id: "penn", name: "Penn Quakers", shortName: "Penn", seed: 14, region: "South", espnId: 219, isFirstFour: false, record: "18-11" },
  { id: "idaho", name: "Idaho Vandals", shortName: "Idaho", seed: 15, region: "South", espnId: 70, isFirstFour: false, record: "21-14" },
  { id: "prairie-view-am", name: "Prairie View A&M Panthers", shortName: "Prairie View", seed: 16, region: "South", espnId: 2504, isFirstFour: true, record: "18-17" },
  { id: "lehigh", name: "Lehigh Mountain Hawks", shortName: "Lehigh", seed: 16, region: "South", espnId: 2329, isFirstFour: true, record: "18-16" },

  // ===== MIDWEST REGION =====
  { id: "michigan", name: "Michigan Wolverines", shortName: "Michigan", seed: 1, region: "Midwest", espnId: 130, isFirstFour: false, record: "31-3" },
  { id: "iowa-state", name: "Iowa State Cyclones", shortName: "Iowa State", seed: 2, region: "Midwest", espnId: 66, isFirstFour: false, record: "27-7" },
  { id: "virginia", name: "Virginia Cavaliers", shortName: "Virginia", seed: 3, region: "Midwest", espnId: 258, isFirstFour: false, record: "29-5" },
  { id: "alabama", name: "Alabama Crimson Tide", shortName: "Alabama", seed: 4, region: "Midwest", espnId: 333, isFirstFour: false, record: "23-9" },
  { id: "texas-tech", name: "Texas Tech Red Raiders", shortName: "Texas Tech", seed: 5, region: "Midwest", espnId: 2641, isFirstFour: false, record: "22-10" },
  { id: "tennessee", name: "Tennessee Volunteers", shortName: "Tennessee", seed: 6, region: "Midwest", espnId: 2633, isFirstFour: false, record: "22-11" },
  { id: "kentucky", name: "Kentucky Wildcats", shortName: "Kentucky", seed: 7, region: "Midwest", espnId: 96, isFirstFour: false, record: "21-13" },
  { id: "georgia", name: "Georgia Bulldogs", shortName: "Georgia", seed: 8, region: "Midwest", espnId: 61, isFirstFour: false, record: "22-10" },
  { id: "st-louis", name: "Saint Louis Billikens", shortName: "Saint Louis", seed: 9, region: "Midwest", espnId: 139, isFirstFour: false, record: "28-5" },
  { id: "santa-clara", name: "Santa Clara Broncos", shortName: "Santa Clara", seed: 10, region: "Midwest", espnId: 2541, isFirstFour: false, record: "26-8" },
  { id: "smu", name: "SMU Mustangs", shortName: "SMU", seed: 11, region: "Midwest", espnId: 2567, isFirstFour: true, record: "20-13" },
  { id: "miami-oh", name: "Miami (OH) RedHawks", shortName: "Miami (OH)", seed: 11, region: "Midwest", espnId: 193, isFirstFour: true, record: "31-1" },
  { id: "akron", name: "Akron Zips", shortName: "Akron", seed: 12, region: "Midwest", espnId: 2006, isFirstFour: false, record: "29-5" },
  { id: "hofstra", name: "Hofstra Pride", shortName: "Hofstra", seed: 13, region: "Midwest", espnId: 2275, isFirstFour: false, record: "24-10" },
  { id: "wright-state", name: "Wright State Raiders", shortName: "Wright State", seed: 14, region: "Midwest", espnId: 2750, isFirstFour: false, record: "23-11" },
  { id: "tennessee-state", name: "Tennessee State Tigers", shortName: "Tennessee St.", seed: 15, region: "Midwest", espnId: 2634, isFirstFour: false, record: "23-9" },
  { id: "umbc", name: "UMBC Retrievers", shortName: "UMBC", seed: 16, region: "Midwest", espnId: 2378, isFirstFour: true, record: "24-8" },
  { id: "howard", name: "Howard Bison", shortName: "Howard", seed: 16, region: "Midwest", espnId: 47, isFirstFour: true, record: "23-10" },
];
